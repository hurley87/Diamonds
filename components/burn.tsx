'use client';
import { usePrivy, useWallets } from '@privy-io/react-auth';
import { useEffect, useState } from 'react';
import {
  createPublicClient,
  createWalletClient,
  custom,
  formatEther,
  http,
} from 'viem';
import contractAbi from '@/utils/DiamondCollection.json';
import { useToast } from './ui/use-toast';
import { ToastAction } from './ui/toast';
import Link from 'next/link';
import { chain } from '@/constants/chain';
import { getDiamond, getUri } from '@/utils/view-tokens';
import { Token } from './token';
import { Button } from './ui/button';
import { Label } from '@radix-ui/react-label';
import { Input } from './ui/input';
import { Layout } from './layout';
import { Separator } from '@/components/ui/separator';
import { serif } from '@/app/fonts';

export const Burn = ({ tokenId }: { tokenId: number }) => {
  const { user } = usePrivy();
  const userEmail = user?.email?.address;
  const [isBurning, setIsBurning] = useState(false);
  const { wallets } = useWallets();
  const wallet = wallets.find((wallet) => wallet.walletClientType === 'privy');
  const address = wallet?.address as `0x${string}`;
  const { toast } = useToast();
  const [diamond, setDiamond] = useState<any>({});
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [street, setStreet] = useState('');
  const [unitNumber, setUnitNumber] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState(userEmail);
  const [isPreview, setIsPreview] = useState(false);
  const [isBurned, setIsBurned] = useState(false);

  useEffect(() => {
    const fetchDiamond = async () => {
      const uri = (await getUri(tokenId)) as string;
      const diamond = await getDiamond(uri);
      setDiamond(diamond);
    };
    if (tokenId) fetchDiamond();
  }, [tokenId]);

  const publicClient = createPublicClient({
    chain,
    transport: http(process.env.NEXT_PUBLIC_RPC_URL!),
  });

  const handleBurn = async () => {
    setIsBurning(true);

    try {
      const balance = await publicClient.getBalance({
        address,
      });

      if (
        firstName === '' ||
        lastName === '' ||
        street === '' ||
        city === '' ||
        postalCode === '' ||
        country === '' ||
        phone === '' ||
        email === ''
      ) {
        toast({
          title: 'Invalid input',
          description: 'Please fill out all fields',
          variant: 'destructive',
        });
        setIsBurning(false);
        return;
      }

      const ethAmount = formatEther(balance);

      if (parseFloat(ethAmount) < 0.0001) {
        await fetch('/api/deposit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ address }),
        });
      }

      const ethereumProvider = (await wallet?.getEthereumProvider()) as any;
      const walletClient = await createWalletClient({
        account: address,
        chain,
        transport: custom(ethereumProvider),
      });

      const { request }: any = await publicClient.simulateContract({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
        abi: contractAbi.abi,
        functionName: 'burn',
        args: [tokenId],
        account: address,
      });

      const hash = await walletClient.writeContract(request);

      const receipt = await publicClient.waitForTransactionReceipt({
        hash,
      });

      await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          firstName,
          lastName,
          street,
          unitNumber,
          city,
          postalCode,
          country,
          phone,
          diamond,
          tokenId,
        }),
      });

      toast({
        title: 'Burn successful!',
        description: 'View your transaction',
        action: (
          <Link
            target="_blank"
            href={`${process.env.NEXT_PUBLIC_EXPLOER_URL}/tx/${receipt?.transactionHash}`}
          >
            <ToastAction altText="Try again">View</ToastAction>
          </Link>
        ),
      });

      setIsBurned(true);
      setIsBurning(false);
    } catch (e) {
      toast({
        title: 'Burn failed',
        description: 'Please try again',
        variant: 'destructive',
      });
      setIsBurning(false);
    }
  };

  const handlePreview = async () => {
    if (
      firstName === '' ||
      lastName === '' ||
      street === '' ||
      city === '' ||
      postalCode === '' ||
      country === '' ||
      phone === '' ||
      email === ''
    ) {
      toast({
        title: 'Invalid input',
        description: 'Please fill out all fields',
        variant: 'destructive',
      });
      setIsBurning(false);
      return;
    }

    setIsPreview(true);
  };

  if (isBurned) {
    return (
      <Layout>
        <div className="flex flex-col gap-12 p-24">
          <h1
            className={`${serif.className} text-5xl mx-auto text-center leading-[64px]`}
          >
            Thank you for redeeming the diamond.
            <br />
            You're all set!
          </h1>
          <div className="flex gap-12 justify-center">
            <div className="flex flex-col gap-12 max-w-lg">
              <div className="flex flex-col gap-4 text-lg text-[#D5D5D5]">
                <div>Your diamond is now being prepared for shipment.</div>
                <div>
                  We will send you an email shortly with the shipment details,
                  including a tracking number and expected delivery date.
                </div>
                <div>
                  Get ready to receive your exquisite diamond, and thank you for
                  trusting us with your investment.
                </div>
                <Link className="w-full" href="/">
                  <Button className="bg-white rounded-sm px-4 text-black disabled:opacity-50 mt-6">
                    Back to homepage
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (isPreview) {
    return (
      <Layout>
        <div className="flex gap-2 p-6 pt-12 pr-0">
          <div
            onClick={() => setIsPreview(false)}
            className="w-fit cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </div>
          <div className="flex flex-col gap-12 w-full">
            <h1 className="text-2xl leading-6">
              Burn NFT and redeem the diamond
            </h1>
            <p className="text-lg max-w-[600px] text-[#D5D5D5]">
              Ready to burning your NFT? Confirming to redeem your physical
              diamond. Once you redeem the diamond, it will be delivered to your
              provided address.
            </p>
            <div className="w-full max-w-xl flex flex-col gap-4">
              <div className="flex flex-col gap-8">
                <div className="text-2xl">Your delivery address</div>
                <div className="flex justify-between gap-10">
                  <div className="flex flex-col gap-6 w-full">
                    <div>
                      <div className="flex flex-col text-sm text-[#D5D5D5]">
                        Receiver:
                      </div>
                      <div className="flex flex-col">
                        {firstName} {lastName}
                      </div>
                    </div>
                    <div>
                      <div className="flex flex-col text-sm text-[#D5D5D5]">
                        Delivery address:
                      </div>
                      <div className="flex flex-col">
                        {street}, {city}, {country}, {postalCode}
                      </div>
                    </div>
                  </div>
                  <Separator orientation="vertical" />
                  <div className="flex flex-col gap-6 w-full">
                    <div>
                      <div className="flex flex-col text-sm text-[#D5D5D5]">
                        Phone:
                      </div>
                      <div className="flex flex-col">{phone}</div>
                    </div>
                    <div>
                      <div className="flex flex-col text-sm text-[#D5D5D5]">
                        Email:
                      </div>
                      <div className="flex flex-col">{email}</div>
                    </div>
                  </div>
                </div>
              </div>
              <Button
                disabled={isBurning}
                className="bg-white rounded-sm px-4 text-black disabled:opacity-50 mt-6"
                onClick={handleBurn}
              >
                {isBurning ? 'Burning ...' : 'Burn NFT to redeem diamond'}
              </Button>
              <p className="text-xs text-[#ACACAC]">
                *I know that I am about to destroy my NFT and that the physical
                copy will be sent to the provided address
              </p>
            </div>
          </div>
          <div className="max-w-xl w-full p-24">
            <Token tokenId={tokenId} />
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex gap-2 p-6 pt-12 pr-0">
        <Link href={`/profile/${address}`}>
          <div className="w-fit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </div>
        </Link>
        <div className="flex flex-col gap-12 w-full">
          <h1 className="text-2xl leading-6">Delivery</h1>
          <p className="text-lg max-w-[600px] text-[#D5D5D5]">
            Please fill out the form below with your shipping details to ensure
            your diamond reaches you safely.
          </p>
          <div className="w-full max-w-lg flex flex-col gap-4">
            <div className="flex justify-between gap-6">
              <div className="grid w-full items-center gap-1.5">
                <Label className="text-[#B2B2B2]">First Name</Label>
                <Input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label className="text-[#B2B2B2]">Last Name</Label>
                <Input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label className="text-[#B2B2B2]">Street and house number</Label>
              <Input
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label className="text-[#B2B2B2]">
                Apartment number (optional)
              </Label>
              <Input
                value={unitNumber}
                onChange={(e) => setUnitNumber(e.target.value)}
              />
            </div>
            <div className="flex justify-between gap-6">
              <div className="grid w-full items-center gap-1.5">
                <Label className="text-[#B2B2B2]">Postal Code</Label>
                <Input
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label className="text-[#B2B2B2]">City</Label>
                <Input value={city} onChange={(e) => setCity(e.target.value)} />
              </div>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label className="text-[#B2B2B2]">Country</Label>
              <Input
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label className="text-[#B2B2B2]">Phone number</Label>
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label className="text-[#B2B2B2]">Email</Label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <Button
              className="bg-white rounded-sm px-4 text-black disabled:opacity-50 mt-6"
              onClick={handlePreview}
            >
              Continue
            </Button>
          </div>
        </div>

        <div className="max-w-xl w-full p-24">
          <Token tokenId={tokenId} />
        </div>
      </div>
    </Layout>
  );
};
