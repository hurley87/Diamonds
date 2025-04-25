'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getAccessToken, usePrivy } from '@privy-io/react-auth';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const Update = ({ uri }: { uri: string }) => {
  const { user } = usePrivy();
  const address = user?.wallet?.address as `0x${string}`;
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
      console.log(attributes);
      const giaNumber = attributes?.find(
        (attr: any) => attr.trait_type === 'GIA Number'
      );
      const giaDate = attributes?.find(
        (attr: any) => attr.trait_type === 'GIA Date'
      );
      const measurements = attributes?.find(
        (attr: any) => attr.trait_type === 'Measurements'
      );
      const certificate = attributes?.find(
        (attr: any) => attr.trait_type === 'Certificate'
      );
      const clarityGrade = attributes?.find(
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

    console.log(metadata);

    const code = uri.split('/')[4];

    const body = JSON.stringify({
      code,
      metadata,
    });

    console.log(body);

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

      router.push(`/profile/${address}`);
    } catch {
      setIsUpdating(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-card rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-foreground">
        Update Diamond
      </h1>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="giaNumber">GIA Number</Label>
          <Input
            id="giaNumber"
            value={giaNumber}
            onChange={(e) => setGiaNumber(e.target.value)}
            placeholder="Enter GIA Number"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="giaDate">GIA Date</Label>
          <Input
            id="giaDate"
            type="date"
            value={giaDate}
            onChange={(e) => setGiaDate(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="measurements">Measurements</Label>
          <Input
            id="measurements"
            value={measurements}
            onChange={(e) => setMeasurements(e.target.value)}
            placeholder="e.g. 6.5 x 6.5 x 4.0 mm"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="certificate">Certificate</Label>
          <Input
            id="certificate"
            value={certificate}
            onChange={(e) => setCertificate(e.target.value)}
            placeholder="Certificate link or number"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="clarityGrade">Clarity Grade</Label>
          <select
            id="clarityGrade"
            value={clarityGrade}
            onChange={(e) => setClarityGrade(e.target.value)}
            className="flex h-10 w-full border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
        <Button onClick={handleUpdate} disabled={isUpdating} className="mt-4">
          {isUpdating ? 'Updating...' : 'Update'}
        </Button>
      </div>
    </div>
  );
};
