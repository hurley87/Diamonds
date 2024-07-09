'use client';
import { useEffect, useState } from 'react';
import { Token } from './token';
import { balanceOf, getTokensOfOwner } from '@/utils/view-tokens';

export const Tokens = ({ address }: { address: `0x${string}` }) => {
  const [balance, setBalance] = useState(0);
  const [tokenIds, setTokenIds] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const balance = (await balanceOf(address)) as number;
      const tokenIds = (await getTokensOfOwner(address)) as number[];

      setBalance(balance);
      setTokenIds(tokenIds);
    };
    if (address) {
      fetchData();
    }
  }, [address]);

  if (!address) {
    return null;
  }

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
};
