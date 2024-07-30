'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getAccessToken } from '@privy-io/react-auth';

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
      const attributes = data.attributes || [];
      const giaNumber = attributes.find(
        (attr: any) => attr.trait_type === 'GIA Number'
      );
      const giaDate = attributes.find(
        (attr: any) => attr.trait_type === 'GIA Date'
      );
      const measurements = attributes.find(
        (attr: any) => attr.trait_type === 'Measurements'
      );
      const certificate = attributes.find(
        (attr: any) => attr.trait_type === 'Certificate'
      );
      const clarityGrade = attributes.find(
        (attr: any) => attr.trait_type === 'Clarity Grade'
      );
      setGiaNumber(giaNumber?.value || '');
      setGiaDate(giaDate?.value || '');
      setMeasurements(measurements?.value || '');
      setCertificate(certificate?.value || '');
      setClarityGrade(clarityGrade?.value || 'IF');
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
      {
        trait_type: 'Color Grade',
        value: diamond.attributes.find(
          (attr: any) => attr.trait_type === 'Color Grade'
        ).value,
      },
      {
        trait_type: 'Carat Weight',
        value: diamond.attributes.find(
          (attr: any) => attr.trait_type === 'Carat Weight'
        ).value,
      },
      {
        trait_type: 'Shape & Cutting Style',
        value: diamond.attributes.find(
          (attr: any) => attr.trait_type === 'Shape & Cutting Style'
        ).value,
      },
      {
        trait_type: 'Cut Grade',
        value: diamond.attributes.find(
          (attr: any) => attr.trait_type === 'Cut Grade'
        ).value,
      },
      {
        trait_type: 'Polish',
        value: diamond.attributes.find(
          (attr: any) => attr.trait_type === 'Polish'
        ).value,
      },
      {
        trait_type: 'Symmetry',
        value: diamond.attributes.find(
          (attr: any) => attr.trait_type === 'Symmetry'
        ).value,
      },
      {
        trait_type: 'Fluorescence',
        value: diamond.attributes.find(
          (attr: any) => attr.trait_type === 'Fluorescence'
        ).value,
      },
      {
        trait_type: 'Code',
        value: diamond.attributes.find(
          (attr: any) => attr.trait_type === 'Code'
        ).value,
      },
      { trait_type: 'GIA Number', value: giaNumber },
      { trait_type: 'GIA Date', value: giaDate },
      { trait_type: 'Measurements', value: measurements },
      { trait_type: 'Certificate', value: certificate },
      { trait_type: 'Clarity Grade', value: clarityGrade },
    ];

    const metadata = {
      ...diamond,
      attributes: newAttributes,
    };

    const body = JSON.stringify({
      code,
      metadata,
    });

    const authToken = await getAccessToken();

    try {
      await fetch('/api/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body,
      });

      router.push('/');
    } catch {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 justify-center max-w-lg mx-auto">
      <div>
        <p>GIA Number</p>
        <input
          value={giaNumber}
          onChange={(e) => setGiaNumber(e.target.value)}
          className="text-white"
        />
      </div>
      <div>
        <p>GIA Date</p>
        <input
          value={giaDate}
          onChange={(e) => setGiaDate(e.target.value)}
          className="text-white"
        />
      </div>
      <div>
        <p>Measurements</p>
        <input
          value={measurements}
          onChange={(e) => setMeasurements(e.target.value)}
          className="text-white"
        />
      </div>
      <div>
        <p>Certificate</p>
        <input
          value={certificate}
          onChange={(e) => setCertificate(e.target.value)}
          className="text-white w-full"
        />
      </div>
      <div>
        <p>Clarity Grade</p>
        <select
          value={clarityGrade}
          onChange={(e) => setClarityGrade(e.target.value)}
          className="text-white"
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
