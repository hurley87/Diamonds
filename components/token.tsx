import { getDiamond, getUri } from '@/utils/mint';
import Link from 'next/link';
import { Burn } from './burn';

export const Token = async ({ tokenId }: { tokenId: number }) => {
  const uri = (await getUri(tokenId)) as string;

  if (!uri) {
    return null;
  }

  const diamond = await getDiamond(uri);
  const image = diamond.image;
  const colorGrade = diamond.attributes.find(
    (attr: any) => attr.trait_type === 'Color Grade'
  );
  const caratWeight = diamond.attributes.find(
    (attr: any) => attr.trait_type === 'Carat Weight'
  );
  const code = uri.split('/')[4];
  const giaNumber = diamond.attributes.find(
    (attr: any) => attr.trait_type === 'GIA Number'
  );
  const giaDate = diamond.attributes.find(
    (attr: any) => attr.trait_type === 'GIA Date'
  );
  const measurements = diamond.attributes.find(
    (attr: any) => attr.trait_type === 'Measurements'
  );
  const certificate = diamond.attributes.find(
    (attr: any) => attr.trait_type === 'Certificate'
  );
  const clarityGrade = diamond.attributes.find(
    (attr: any) => attr.trait_type === 'Clarity Grade'
  );

  return (
    <div className="flex flex-col justify-center">
      <h1>Diamond #{tokenId}</h1>
      <p>
        <img
          className="h-20 w-20 rounded-lg mx-auto"
          src={image}
          alt="diamond"
        />
      </p>
      <p>Color Grade: {colorGrade.value}</p>
      <p>Carat Weight: {caratWeight.value}</p>
      <p>{uri}</p>
      {giaNumber && (
        <div>
          <p>GIA Number: {giaNumber.value}</p>
          <p>GIA Date: {giaDate.value}</p>
          <p>Measurements: {measurements.value}</p>
          <p>Certificate: {certificate.value}</p>
          <p>Clarity Grade: {clarityGrade.value}</p>
        </div>
      )}
      <Link href={`/update/${code}`}>
        <button>Update</button>
      </Link>
      <Burn tokenId={tokenId} />
    </div>
  );
};
