'use client';
import Link from 'next/link';
import { Burn } from './burn';
import { getDiamond, getUri } from '@/utils/view-tokens';
import { useEffect, useState } from 'react';

export const Token = ({ tokenId }: { tokenId: number }) => {
  const [diamond, setDiamond] = useState<any>({});
  const [uri, setUri] = useState('');

  useEffect(() => {
    const fetchDiamond = async () => {
      const uri = (await getUri(tokenId)) as string;
      setUri(uri);
      const diamond = await getDiamond(uri);
      setDiamond(diamond);
    };
    if (tokenId) fetchDiamond();
  }, [tokenId]);

  if (!diamond) return null;

  console.log(diamond);
  return (
    <div className="flex flex-col justify-center">
      <h1>Diamond #{tokenId}</h1>
      <p>
        <img
          className="h-20 w-20 rounded-lg mx-auto"
          src={diamond.image}
          alt="diamond"
        />
      </p>
      <p>Color Grade: {diamond.colorGrade}</p>
      <p>Carat Weight: {diamond.caratWeight}</p>
      <p>{uri}</p>
      {diamond.giaNumber && (
        <div>
          <p>GIA Number: {diamond.giaNumber}</p>
          <p>GIA Date: {diamond.giaDate}</p>
          <p>Measurements: {diamond.measurements}</p>
          <p>Certificate: {diamond.certificate}</p>
          <p>Clarity Grade: {diamond.clarityGrade}</p>
        </div>
      )}
      <Link href={`/update/${diamond.code}`}>
        <button>Update</button>
      </Link>
      <Burn tokenId={tokenId} diamond={diamond} />
    </div>
  );
};
