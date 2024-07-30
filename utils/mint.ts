import { createWalletClient, http, createPublicClient, Hex } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import contractAbi from './DiamondCollection.json';
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x`;
import Irys from '@irys/sdk';
import { chain } from '@/constants/chain';

const account = privateKeyToAccount(`0x${process.env.PRIVATE_KEY}` as Hex);
const network = process.env.IRYS_NETWORK;
const providerUrl = process.env.NEXT_PUBLIC_RPC_URL;

export const publicClient = createPublicClient({
  chain,
  transport: http(providerUrl),
});

const walletClient = createWalletClient({
  chain,
  transport: http(providerUrl),
});

export const getIrys = async () => {
  const token = 'base-eth';

  const irys = new Irys({
    network,
    token,
    key: process.env.PRIVATE_KEY,
    config: { providerUrl },
  });

  return irys;
};

export async function mintNft(toAddress: `0x${string}`, uri: string) {
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
  } catch {
    return 'Already minted';
  }
}

export async function deposit(address: `0x${string}`) {
  const hash = await walletClient.sendTransaction({
    account,
    to: address,
    value: BigInt(100000000000000),
  });

  return hash;
}
