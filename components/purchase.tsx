'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAccount, useConnect } from 'wagmi';

export const Purchase = () => {
  const account = useAccount();
  const { connectors, connect } = useConnect();
  const [colorGrade, setColorGrade] = useState('D');
  const [caratWeight, setCaratWeight] = useState('1');
  const [isPurchasing, setIsPurchasing] = useState(false);
  const router = useRouter();
  const address = account.address;

  const handleSubmit = async () => {
    setIsPurchasing(true);

    if (colorGrade === '' || caratWeight === '') {
      return;
    }

    const body = JSON.stringify({
      id: account.address,
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
        {address ? (
          <button
            disabled={isPurchasing}
            className="bg-white rounded-sm text-black px-2 disabled:opacity-50"
            onClick={handleSubmit}
          >
            {isPurchasing ? 'Purchasing...' : 'Purchase'}
          </button>
        ) : (
          <>
            {connectors.map((connector) => (
              <button
                id={connector.id}
                key={connector.uid}
                onClick={() => connect({ connector })}
                type="button"
                className="bg-white rounded-sm px-4 text-black"
              >
                Connect
              </button>
            ))}
          </>
        )}
      </div>
    </div>
  );
};
