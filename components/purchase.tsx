'use client';
import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const Purchase = () => {
  const { user, login } = usePrivy();
  const id = user?.wallet?.address as `0x${string}`;
  const email = user?.email?.address;
  const [colorGrade, setColorGrade] = useState('D');
  const [caratWeight, setCaratWeight] = useState('1');
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [address, setAddress] = useState('123 Satoshi Lane');
  const router = useRouter();

  const handleSubmit = async () => {
    setIsPurchasing(true);

    if (colorGrade === '' || caratWeight === '') {
      return;
    }

    const body = JSON.stringify({
      id,
      email,
      colorGrade,
      caratWeight,
    });

    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      });
      const data = await response.json();

      router.push(data.hosted_url);
    } catch {
      setIsPurchasing(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div>
        <p>Address</p>
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="text-black"
        />
      </div>
      <div>
        <p>Color Grade</p>
        <select
          value={colorGrade}
          onChange={(e) => setColorGrade(e.target.value)}
          className="text-black"
        >
          <option value="D">D</option>
          <option value="E">E</option>
          <option value="F">F</option>
        </select>
      </div>
      <div>
        <p>Carat Weight</p>
        <select
          value={caratWeight}
          onChange={(e) => setCaratWeight(e.target.value)}
          className="text-black"
        >
          <option value="1">1</option>
          <option value="3">3</option>
          <option value="5">5</option>
        </select>
      </div>
      <div>
        {user ? (
          <button
            disabled={isPurchasing}
            className="bg-white rounded-sm text-black px-2 disabled:opacity-50"
            onClick={handleSubmit}
          >
            {isPurchasing ? 'Purchasing...' : 'Purchase'}
          </button>
        ) : (
          <button
            className="bg-white rounded-sm text-black px-2 disabled:opacity-50"
            onClick={login}
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};
