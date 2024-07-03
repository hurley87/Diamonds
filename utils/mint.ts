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

export async function tokenOfOwnerByIndex(address: string, index: number) {
  try {
    const tokenIdData = await publicClient.readContract({
      address: contractAddress,
      abi: contractAbi.abi,
      functionName: 'tokenOfOwnerByIndex',
      args: [address, index],
    });
    const tokenId: number = Number(tokenIdData);
    return tokenId;
  } catch (error) {
    return error;
  }
}

export async function getTokensOfOwner(address: string) {
  try {
    const balance = (await balanceOf(address)) as number;
    const tokenIds = [];

    for (let i = 0; i < balance; i++) {
      const tokenId = await tokenOfOwnerByIndex(address, i);
      tokenIds.push(tokenId);
    }

    return tokenIds;
  } catch (error) {
    console.error('Error fetching tokens: ', error);
    return [];
  }
}

export async function getUri(tokenId: number) {
  try {
    const uriData = await publicClient.readContract({
      address: contractAddress,
      abi: contractAbi.abi,
      functionName: 'tokenURI',
      args: [tokenId],
    });
    return uriData;
  } catch (error) {
    return error;
  }
}

export async function getDiamond(uri: string) {
  const content = await fetch(uri, {
    cache: 'no-store',
  });
  const diamond = await content.json();
  return diamond;
}
