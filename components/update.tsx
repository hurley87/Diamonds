'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const Update = ({ code }: { code: string }) => {
  const uri = `https://gateway.irys.xyz/mutable/${code}`;
  const [diamond, setDiamond] = useState<any>({});
  const [isUpdating, setIsUpdating] = useState(false);
  const [giaNumber, setGiaNumber] = useState('');
  const [giaDate, setGiaDate] = useState('');
  const [measurements, setMeasurements] = useState('');
  const [certificate, setCertificate] = useState('');
  const [clarityGrade, setClarityGrade] = useState('IF');
  const router = useRouter();

  useEffect(() => {
    const fetchDiamond = async () => {
      const response = await fetch(uri);
      const data = await response.json();
      setDiamond(data);
    };

    fetchDiamond();
  }, [uri]);

  const handleUpdate = async () => {
    setIsUpdating(true);

    if (
      giaNumber === '' ||
      giaDate === '' ||
      measurements === '' ||
      certificate === '' ||
      clarityGrade === ''
    ) {
      return;
    }

    const newAttributes = [
      { trait_type: 'GIA Number', value: giaNumber },
      { trait_type: 'GIA Date', value: giaDate },
      { trait_type: 'Measurements', value: measurements },
      { trait_type: 'Certificate', value: certificate },
      { trait_type: 'Clarity Grade', value: clarityGrade },
    ];

    const metadata = {
      ...diamond,
      attributes: [...diamond.attributes, ...newAttributes],
    };

    const body = JSON.stringify({
      code,
      metadata,
    });

    try {
      await fetch('/api/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      });

      router.push('/');
    } catch {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 justify-center max-w-sm mx-auto">
      <div>
        <p>GIA Number</p>
        <input
          value={giaNumber}
          onChange={(e) => setGiaNumber(e.target.value)}
          className="text-black"
        />
      </div>
      <div>
        <p>GIA Date</p>
        <input
          value={giaDate}
          onChange={(e) => setGiaDate(e.target.value)}
          className="text-black"
        />
      </div>
      <div>
        <p>Measurements</p>
        <input
          value={measurements}
          onChange={(e) => setMeasurements(e.target.value)}
          className="text-black"
        />
      </div>
      <div>
        <p>Certificate</p>
        <input
          value={certificate}
          onChange={(e) => setCertificate(e.target.value)}
          className="text-black"
        />
      </div>
      <div>
        <p>Clarity Grade</p>
        <select
          value={clarityGrade}
          onChange={(e) => setClarityGrade(e.target.value)}
          className="text-black"
        >
          <option value="IF">IF</option>
          <option value="VVS1">VVS1</option>
          <option value="VVS2">VVS2</option>
          <option value="VS1">VS1</option>
          <option value="VS2">VS2</option>
          <option value="SI1">SI1</option>
          <option value="SI2">SI2</option>
          <option value="I1">I1</option>
        </select>
      </div>
      <div>
        <button
          disabled={isUpdating}
          className="bg-white rounded-sm text-black px-2 disabled:opacity-50"
          onClick={handleUpdate}
        >
          {isUpdating ? 'Updating...' : 'Update'}
        </button>
      </div>
    </div>
  );
};
