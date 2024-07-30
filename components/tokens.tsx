'use client';
import { useEffect, useState } from 'react';
import { Token } from './token';
import { getTokensOfOwner } from '@/utils/view-tokens';

export const Tokens = ({ address }: { address: `0x${string}` }) => {
  const [tokenIds, setTokenIds] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const tokenIds = (await getTokensOfOwner(address)) as number[];
      setTokenIds(tokenIds);
    };

    if (address) fetchData();
  }, [address]);

  if (!address) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 gap-4 p-6">
      {tokenIds.map((tokenId) => (
        <Token key={tokenId} tokenId={tokenId} showActions={true} />
      ))}
    </div>
  );
};
