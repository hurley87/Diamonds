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
import { Button } from './button';
import { Input } from './ui/input';
import { Layout } from './layout';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';

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
  const [privacyPolicyAccepted, setPrivacyPolicyAccepted] = useState(false);
  const [dataConsentAccepted, setDataConsentAccepted] = useState(false);

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

  const isFormValid = () => {
    return (
      firstName !== '' &&
      lastName !== '' &&
      street !== '' &&
      city !== '' &&
      postalCode !== '' &&
      country !== '' &&
      phone !== '' &&
      email !== '' &&
      privacyPolicyAccepted &&
      dataConsentAccepted
    );
  };

  const handlePreview = async () => {
    if (!isFormValid()) {
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
      } else if (!privacyPolicyAccepted || !dataConsentAccepted) {
        toast({
          title: 'Terms not accepted',
          description:
            'Please accept both the privacy policy and data consent to continue',
          variant: 'destructive',
        });
      }
      return;
    }

    setIsPreview(true);
  };

  if (isBurned) {
    return (
      <Layout>
        <div className="flex flex-col lg:flex-row gap-0 p-6 pt-24 pb-48 pr-0 max-w-5xl mx-auto">
          <h1
            className={`font-haboro text-5xl text-left leading-[64px] uppercase w-full`}
          >
            {`thank you for redeeming the diamond.`}
            <br />
            {`You're all set!`}
          </h1>
          <div className="flex gap-12 justify-center w-full">
            <div className="flex flex-col gap-12 max-w-lg">
              <div className="flex flex-col gap-8 text-xl text-[#7A8385]">
                <div>Your diamond is now being prepared for shipment.</div>
                <div>
                  We will send you an email shortly with the shipment details,
                  including a tracking number and expected delivery date.
                </div>
                <div>
                  Get ready to recieve your exquisite diamond, and thank you for
                  trusting us with your investment.
                </div>
                <Link className="w-full" href="/">
                  <Button
                    text="Back to homepage"
                    className="mt-6 border-transparent"
                  />
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
        <div className="flex flex-col lg:flex-row gap-24 p-6 py-24 pr-0 max-w-5xl mx-auto">
          <div className="flex flex-col gap-10 w-2/3">
            <h1
              className="text-2xl leading-6 flex items-center gap-4 cursor-pointer"
              onClick={() => setIsPreview(false)}
            >
              <img src="/leftCaret.svg" alt="burn" /> Burn NFT and redeem the
              diamond
            </h1>
            <p className="text-[#7A8385]">
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
                      <div className="flex flex-col text-sm text-[#7A8385]">
                        Receiver
                      </div>
                      <div className="flex flex-col">
                        {firstName} {lastName}
                      </div>
                    </div>
                    <div>
                      <div className="flex flex-col text-sm text-[#7A8385]">
                        Delivery address
                      </div>
                      <div className="flex flex-col">
                        {street}, {city}, {country}, {postalCode}
                      </div>
                    </div>
                  </div>
                  <Separator orientation="vertical" />
                  <div className="flex flex-col gap-6 w-full">
                    <div>
                      <div className="flex flex-col text-sm text-[#7A8385]">
                        Phone
                      </div>
                      <div className="flex flex-col">{phone}</div>
                    </div>
                    <div>
                      <div className="flex flex-col text-sm text-[#7A8385]">
                        Email
                      </div>
                      <div className="flex flex-col">{email}</div>
                    </div>
                  </div>
                </div>
              </div>
              <Button
                text={isBurning ? 'Burning ...' : 'Burn NFT'}
                disabled={isBurning}
                className="w-full mt-6"
                onClick={handleBurn}
              />
              <p className="text-sm text-[#7A8385]">
                *I know that I am about to destroy my NFT and that the physical
                copy will be sent to the provided address
              </p>
            </div>
          </div>
          <div className="max-w-xl w-1/3">
            <Token tokenId={tokenId} />
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row gap-0 p-6 py-24 lg:pr-0 max-w-5xl mx-auto">
        <div className="flex flex-col gap-12 w-full lg:w-2/3">
          <h1 className="text-2xl leading-6 flex items-center gap-4">
            <Link href={`/profile/${address}`}>
              <img src="/leftCaret.svg" alt="arrow-left" />
            </Link>
            Delivery
          </h1>
          <p className="max-w-[400px] text-[#7A8385]">
            Please fill out the form below with your shipping details to ensure
            your diamond reaches you safely.
          </p>
          <div className="w-full max-w-lg flex flex-col gap-3">
            <div className="flex justify-between gap-3">
              <div className="grid w-full items-center gap-1.5">
                <Input
                  value={firstName}
                  className="text-[#373B3C] rounded-xl bg-white"
                  placeholder="First Name"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Input
                  value={lastName}
                  className="text-[#373B3C] rounded-xl bg-white"
                  placeholder="Last Name"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Input
                value={street}
                className="text-[#373B3C] rounded-xl bg-white"
                placeholder="Street and house number"
                onChange={(e) => setStreet(e.target.value)}
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Input
                value={unitNumber}
                className="text-[#373B3C] rounded-xl bg-white"
                placeholder="Apartment number (optional)"
                onChange={(e) => setUnitNumber(e.target.value)}
              />
            </div>
            <div className="flex justify-between gap-3">
              <div className="grid w-full items-center gap-1.5">
                <Input
                  value={postalCode}
                  className="text-[#373B3C] rounded-xl bg-white"
                  placeholder="Postal Code"
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Input
                  value={city}
                  className="text-[#373B3C] rounded-xl bg-white"
                  placeholder="City"
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Input
                value={country}
                className="text-[#373B3C] rounded-xl bg-white"
                placeholder="Country"
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Input
                value={phone}
                className="text-[#373B3C] rounded-xl bg-white"
                placeholder="Phone number"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Input
                value={email}
                className="text-[#373B3C] rounded-xl bg-white"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-6 mt-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="privacy-policy"
                  checked={privacyPolicyAccepted}
                  onCheckedChange={(checked: boolean) =>
                    setPrivacyPolicyAccepted(checked)
                  }
                />
                <label
                  htmlFor="privacy-policy"
                  className="text-sm text-[#373B3C] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I have acknowledged the privacy policy.
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="data-consent"
                  checked={dataConsentAccepted}
                  onCheckedChange={(checked: boolean) =>
                    setDataConsentAccepted(checked)
                  }
                />
                <label
                  htmlFor="data-consent"
                  className="text-sm text-[#373B3C] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I consent to the storage of my information for contact
                  purposes and to facilitate any follow-up inquiries.
                </label>
              </div>
              <p className="text-sm text-[#373B3C]">
                Note: You can revoke this consent at any time with effect for
                the future by sending an email to info@4collection.com.
              </p>
            </div>
            <Button
              className="w-full mt-6"
              onClick={handlePreview}
              text="Continue"
            />
          </div>
        </div>

        <div className="max-w-xl w-full lg:w-1/3 mt-12 lg:mt-0">
          <Token tokenId={tokenId} />
        </div>
      </div>
    </Layout>
  );
};
