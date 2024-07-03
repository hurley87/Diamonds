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
  chain: baseSepolia,
  transport: http('https://sepolia.base.org'),
});

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

    // send 0.0001 base-eth to toAddress from wallet
    const hash = await walletClient.sendTransaction({
      account,
      to: toAddress,
      value: BigInt(100000000000000),
    });

    console.log('Transaction hash: ', hash);

    return transaction;
  } catch (e) {
    console.error(e);
    return 'Already minted';
  }
}
