import { Token } from '@/components/token';
import { balanceOf, getTokensOfOwner } from '@/utils/mint';

interface EditorPageProps {
  params: { address: string };
}

export default async function Editor({ params }: EditorPageProps) {
  const address = params.address as `0x${string}`;
  const balance = (await balanceOf(address)) as number;
  const tokenIds = (await getTokensOfOwner(address)) as number[];

  return (
    <div className="text-center">
      <p>
        you own {balance} {balance === 1 ? 'NFT' : 'NFTs'}
      </p>
      <div>
        {tokenIds.map((tokenId) => (
          <Token key={tokenId} tokenId={tokenId} />
        ))}
      </div>
    </div>
  );
}
