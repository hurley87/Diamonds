'use client';
import { useWallets } from '@privy-io/react-auth';
import { useState } from 'react';
import {
  createPublicClient,
  createWalletClient,
  custom,
  formatEther,
  http,
} from 'viem';
import { baseSepolia } from 'viem/chains';
import contractAbi from '@/utils/DiamondCollection.json';
import { useRouter } from 'next/navigation';
import { useToast } from './ui/use-toast';
import { ToastAction } from './ui/toast';
import Link from 'next/link';

export const Transfer = ({ tokenId }: { tokenId: number }) => {
  const [isTransferring, setIsTransferring] = useState(false);
  const [address, setAddress] = useState('');
  const { wallets } = useWallets();
  const wallet = wallets.find((wallet) => wallet.walletClientType === 'privy');
  const account = wallet?.address as `0x${string}`;
  const router = useRouter();
  const { toast } = useToast();

  const publicClient = createPublicClient({
    chain: baseSepolia,
    transport: http('https://base-sepolia-rpc.publicnode.com'),
  });

  const handleTransfer = async () => {
    setIsTransferring(true);

    try {
      const balance = await publicClient.getBalance({
        address: account,
      });

      console.log('Balance', balance);

      const ethAmount = formatEther(balance);

      console.log('ETH Amount', ethAmount);

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
        chain: baseSepolia,
        transport: custom(ethereumProvider),
      });

      const { request }: any = await publicClient.simulateContract({
        address: '0x1f0826412A9D076700Da54153B833Cc8A33A73CC',
        abi: contractAbi.abi,
        functionName: 'safeTransferFrom',
        args: [account, address, tokenId],
        account,
      });

      const hash = await walletClient.writeContract(request);

      const receipt = await publicClient.waitForTransactionReceipt({
        hash,
      });

      console.log('Burn receipt', receipt);

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

      router.push('/');
      setIsTransferring(false);
    } catch (e) {
      console.log('Error burning token ', e);
      setIsTransferring(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <label>Wallet Address</label>
        <input
          className="bg-white rounded-sm px-4 text-black"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div>
        <button
          disabled={isTransferring}
          className="bg-white rounded-sm px-4 text-black disabled:opacity-50"
          onClick={handleTransfer}
        >
          {isTransferring ? 'Burning ...' : 'Burn'}
        </button>
      </div>
    </div>
  );
};
