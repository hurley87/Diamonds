import { createWalletClient, http, createPublicClient, Hex } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { baseSepolia } from 'viem/chains';
import contractAbi from './DiamondCollection.json';
const contractAddress = process.env.CONTRACT_ADDRESS as `0x`;
import Irys from '@irys/sdk';

const account = privateKeyToAccount(`0x${process.env.PRIVATE_KEY}` as Hex);

export const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http('https://sepolia.base.org'),
});

const walletClient = createWalletClient({
  account,
  chain: baseSepolia,
  transport: http('https://sepolia.base.org'),
});

export async function mintNft(toAddress: string, uri: string) {
  try {
    const { request }: any = await publicClient.simulateContract({
      account,
      address: contractAddress,
      abi: contractAbi.abi,
      functionName: 'safeMint',
      args: [toAddress, uri],
    });
    const transaction = await walletClient.writeContract(request);
    return transaction;
  } catch (e) {
    console.error(e);
    return 'Already minted';
  }
}

export async function balanceOf(address: string) {
  try {
    const balanceData = await publicClient.readContract({
      address: contractAddress,
      abi: contractAbi.abi,
      functionName: 'balanceOf',
      args: [address],
    });
    const balance: number = Number(balanceData);
    return balance;
  } catch (error) {
    return error;
  }
}

export const getIrys = async () => {
  const network = 'devnet';
  const providerUrl = 'https://sepolia.base.org';
  const token = 'base-eth';

  const irys = new Irys({
    network,
    token,
    key: process.env.PRIVATE_KEY,
    config: { providerUrl },
  });

  return irys;
};
