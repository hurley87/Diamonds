'use client';
import { useWallets } from '@privy-io/react-auth';
import { useState } from 'react';
import { createPublicClient, createWalletClient, custom, http } from 'viem';
import { baseSepolia } from 'viem/chains';
import contractAbi from '@/utils/DiamondCollection.json';
import { useRouter } from 'next/navigation';

export const Burn = ({ tokenId }: { tokenId: number }) => {
  const [isBurning, setIsBurning] = useState(false);
  const [address, setAddress] = useState('');
  const { wallets } = useWallets();
  const wallet = wallets.find((wallet) => wallet.walletClientType === 'privy');
  const account = wallet?.address as `0x${string}`;
  const router = useRouter();

  const publicClient = createPublicClient({
    chain: baseSepolia,
    transport: http('https://base-sepolia-rpc.publicnode.com'),
  });

  const handleBurn = async () => {
    setIsBurning(true);

    try {
      const reponse = await fetch('/api/deposit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address: account }),
      });
      const { hash } = await reponse.json();

      if (hash) {
        const ethereumProvider = (await wallet?.getEthereumProvider()) as any;
        const walletClient = await createWalletClient({
          account,
          chain: baseSepolia,
          transport: custom(ethereumProvider),
        });

        const { request }: any = await publicClient.simulateContract({
          address: '0x1f0826412A9D076700Da54153B833Cc8A33A73CC',
          abi: contractAbi.abi,
          functionName: 'burn',
          args: [tokenId],
          account,
        });

        const hash = await walletClient.writeContract(request);

        const receipt = await publicClient.waitForTransactionReceipt({ hash });

        router.push('/');
        setIsBurning(false);
      } else {
        setIsBurning(false);
      }
    } catch (e) {
      console.log('Error burning token ', e);
      setIsBurning(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <label>Address</label>
        <input
          className="bg-white rounded-sm px-4 text-black"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div>
        <button
          disabled={isBurning}
          className="bg-white rounded-sm px-4 text-black disabled:opacity-50"
          onClick={handleBurn}
        >
          {isBurning ? 'Burning ...' : 'Burn'}
        </button>
      </div>
    </div>
  );
};
