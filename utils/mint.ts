import { createWalletClient, http, createPublicClient, Hex } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import contractAbi from './DiamondCollection.json';
import Irys from '@irys/sdk';
import { chain } from '@/constants/chain';

const providerUrl = process.env.NEXT_PUBLIC_RPC_URL;
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x`;

function getAccount() {
  const privateKey = process.env.PRIVATE_KEY;
  if (!privateKey) throw new Error('Missing PRIVATE_KEY env variable');
  return privateKeyToAccount(`0x${privateKey}` as Hex);
}

export const publicClient = createPublicClient({
  chain,
  transport: http(providerUrl),
});

const walletClient = createWalletClient({
  chain,
  transport: http(providerUrl),
});

export const getIrys = async () => {
  const network = process.env.IRYS_NETWORK;
  const privateKey = process.env.PRIVATE_KEY;

  if (!network || !privateKey) {
    throw new Error('Missing IRYS_NETWORK or PRIVATE_KEY env variable');
  }

  const token = 'base-eth';

  const irys = new Irys({
    network,
    token,
    key: privateKey,
    config: { providerUrl },
  });

  return irys;
};

export async function mintNft(toAddress: `0x${string}`, uri: string) {
  const account = getAccount();

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
  } catch (error) {
    console.error('mintNft error: ', error);
    return 'Already minted';
  }
}

export async function deposit(address: `0x${string}`) {
  const account = getAccount();

  const hash = await walletClient.sendTransaction({
    account,
    to: address,
    value: BigInt(100000000000000),
  });

  return hash;
}
