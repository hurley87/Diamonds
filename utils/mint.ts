import { createWalletClient, http, createPublicClient, Hex } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { baseSepolia } from 'viem/chains';
import contractAbi from './FourCollect.json';
const contractAddress = process.env.CONTRACT_ADDRESS as `0x`;

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
      args: [address as `0x`, 0],
    });
    const balance: number = Number(balanceData);
    return balance;
  } catch (error) {
    return error;
  }
}
