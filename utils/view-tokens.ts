import { createPublicClient, createWalletClient, http } from 'viem';
import { baseSepolia } from 'viem/chains';
import contractAbi from './DiamondCollection.json';
const contractAddress = '0x1f0826412A9D076700Da54153B833Cc8A33A73CC';

export const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http('https://base-sepolia.blockpi.network/v1/rpc/public	'),
});

const walletClient = createWalletClient({
  chain: baseSepolia,
  transport: http('https://base-sepolia.blockpi.network/v1/rpc/public	'),
});

export async function balanceOf(address: string) {
  console.log('Address: ', address);
  console.log('Contract Address: ', contractAddress);
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
  const json = await content.json();
  console.log('json', json);
  const diamond = {
    image: json.image,
    colorGrade: json.attributes.find(
      (attr: any) => attr.trait_type === 'Color Grade'
    )?.value,
    caratWeight: json.attributes.find(
      (attr: any) => attr.trait_type === 'Carat Weight'
    )?.value,
    code: uri.split('/')[4],
    giaNumber: json.attributes.find(
      (attr: any) => attr.trait_type === 'GIA Number'
    )?.value,
    giaDate: json.attributes.find((attr: any) => attr.trait_type === 'GIA Date')
      ?.value,
    measurements: json.attributes.find(
      (attr: any) => attr.trait_type === 'Measurements'
    )?.value,
    certificate: json.attributes.find(
      (attr: any) => attr.trait_type === 'Certificate'
    )?.value,
    clarityGrade: json.attributes.find(
      (attr: any) => attr.trait_type === 'Clarity Grade'
    )?.value,
  };
  console.log('diamond', diamond);
  return diamond;
}
