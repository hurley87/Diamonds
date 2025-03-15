'use client';
import { useWallets } from '@privy-io/react-auth';
import { useState } from 'react';
import {
  createPublicClient,
  createWalletClient,
  custom,
  formatEther,
  http,
  isAddress,
} from 'viem';
import { chain } from '@/constants/chain';
import contractAbi from '@/utils/DiamondCollection.json';
import { useToast } from './ui/use-toast';
import { ToastAction } from './ui/toast';
import Link from 'next/link';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

export const Transfer = ({
  tokenId,
  setDiamond,
}: {
  tokenId: number;
  setDiamond: (diamond: any) => void;
}) => {
  const [isTransferring, setIsTransferring] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [showTransfer, setShowTransfer] = useState(false);
  const [address, setAddress] = useState('');
  const { wallets } = useWallets();
  const wallet = wallets.find((wallet) => wallet.walletClientType === 'privy');
  const account = wallet?.address as `0x${string}`;
  const { toast } = useToast();

  const publicClient = createPublicClient({
    chain,
    transport: http(process.env.NEXT_PUBLIC_RPC_URL!),
  });

  const handleTransfer = async () => {
    setIsTransferring(true);

    const isValid = isAddress(address);
    if (!isValid) {
      setIsTransferring(false);
      toast({
        title: 'Invalid address',
        description: 'Please enter a valid address',
        variant: 'destructive',
      });
      return;
    }

    try {
      const balance = await publicClient.getBalance({
        address: account,
      });

      const ethAmount = formatEther(balance);

      console.log('ethAmount', ethAmount);

      if (parseFloat(ethAmount) < 0.0001) {
        await fetch('/api/deposit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ address: account }),
        });
      }

      const ethereumProvider = (await wallet?.getEthereumProvider()) as any;
      const walletClient = await createWalletClient({
        account,
        chain,
        transport: custom(ethereumProvider),
      });

      const { request }: any = await publicClient.simulateContract({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
        abi: contractAbi.abi,
        functionName: 'safeTransferFrom',
        args: [account, address, tokenId],
        account,
      });

      const hash = await walletClient.writeContract(request);

      const receipt = await publicClient.waitForTransactionReceipt({
        hash,
      });

      toast({
        title: 'Transfer successful!',
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

      setIsTransferring(false);
      setShowTransfer(false);
      setDiamond(null);
    } catch (e) {
      console.log('e', e);
      toast({
        title: 'Transfer failed',
        description: 'Email us at XXX@gmail.com',
        variant: 'destructive',
      });
      setIsTransferring(false);
    }
  };

  const handleApprove = async () => {
    setIsApproving(true);

    try {
      const ethereumProvider = (await wallet?.getEthereumProvider()) as any;
      const walletClient = await createWalletClient({
        account,
        chain,
        transport: custom(ethereumProvider),
      });

      const address = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;

      const { request }: any = await publicClient.simulateContract({
        address,
        abi: contractAbi.abi,
        functionName: 'approve',
        args: [address, tokenId],
        account,
      });

      const hash = await walletClient.writeContract(request);

      await publicClient.waitForTransactionReceipt({
        hash,
      });

      setShowTransfer(true);
      setIsApproved(true);
      setIsApproving(false);
    } catch (e) {
      console.log('e', e);
      toast({
        title: 'Approval failed',
        description: 'Email us at XXX@gmail.com',
        variant: 'destructive',
      });
      setIsApproving(false);
    }
  };

  return (
    <Dialog open={showTransfer} onOpenChange={setShowTransfer}>
      <DialogTrigger>
        <div className="text-center">Transfer diamond</div>
      </DialogTrigger>
      <DialogContent
        style={{
          background: 'rgba(55, 59, 60, 0.65)',
          border: 'none',
          borderRadius: '16px',
          padding: '30px',
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-white text-center">
            Transfer Token
          </DialogTitle>
          <DialogDescription>
            <div className="w-full flex flex-col gap-6 z-50 pt-6">
              <div className="flex flex-col gap-6">
                <div className="grid w-full items-center gap-1.5">
                  <Label className="text-white">Wallet Address</Label>
                  <Input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="rounded-xl px-4 text-white disabled:opacity-50"
                    placeholder="0xe347bF0d8878a1Ad65335ca84ee6A6B6c04d3eA0"
                  />
                </div>
                {isApproved ? (
                  <Button
                    disabled={isTransferring}
                    className="bg-white rounded-full px-4 text-black disabled:opacity-50"
                    onClick={handleTransfer}
                    text={isTransferring ? 'Transferring ...' : 'Transfer'}
                  />
                ) : (
                  <Button
                    disabled={isApproving}
                    className="bg-white rounded-full px-4 text-black disabled:opacity-50"
                    onClick={handleApprove}
                    text={isApproving ? 'Approving ...' : 'Approve'}
                  />
                )}
              </div>
              <img
                src="/transferLogo.png"
                alt="arrow-right"
                className="w-[164px] h-auto mx-auto mt-6"
              />
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
