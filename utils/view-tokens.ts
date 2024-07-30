import { createPublicClient, http } from 'viem';
import contractAbi from './DiamondCollection.json';
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x`;
import { chain } from '@/constants/chain';

export const publicClient = createPublicClient({
  chain,
  transport: http(process.env.NEXT_PUBLIC_RPC_URL!),
});

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
  } catch {
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
  const content = await fetch(uri, { cache: 'no-store' });
  const json = await content.json();

  console.log('json', json);

  const getAttribute = (traitType: string) =>
    json.attributes.find((attr: any) => attr.trait_type === traitType)?.value;

  return {
    image: json.image,
    colorGrade: getAttribute('Color Grade'),
    caratWeight: getAttribute('Carat Weight'),
    code: uri.split('/')[4],
    giaNumber: getAttribute('GIA Number'),
    giaDate: getAttribute('GIA Date'),
    measurements: getAttribute('Measurements'),
    certificate: getAttribute('Certificate'),
    clarityGrade: getAttribute('Clarity Grade'),
  };
}
