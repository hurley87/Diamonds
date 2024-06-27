'use client';

import { burnNft } from '@/utils/mint';
import { useState } from 'react';

export const Burn = ({ tokenId }: { tokenId: number }) => {
  const [isBurning, setIsBurning] = useState(false);
  const [address, setAddress] = useState('');

  const handleBurn = async () => {
    setIsBurning(true);
    console.log('Burn', tokenId);
    const tx = await burnNft(tokenId);
    console.log('Burn', tx);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <label>Address</label>
        <input
          className="bg-white rounded-sm px-4 text-black"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <button
        disabled={isBurning}
        className="bg-white rounded-sm px-4 text-black disabled:opacity-50"
        onClick={handleBurn}
      >
        Login
      </button>
    </div>
  );
};
