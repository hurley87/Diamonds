import { Tokens } from '@/components/tokens';
import { Email } from './email';

interface UpdatePageProps {
  params: { address: string };
}

export default async function UpdatePage({ params }: UpdatePageProps) {
  const address = params.address as `0x${string}`;

  const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address?.slice(0, 6)}...${address?.slice(-4)}`;
  };

  return (
    <div className="p-6 flex flex-col gap-9 font-serif max-w-screen-xl w-full mx-auto py-24">
      <div className="flex items-center gap-4">
        <img
          src={`https://zora.co/api/avatar/${address}?size=36`}
          alt="Profile"
          width={60}
          height={60}
          className="rounded-full"
        />
        <div className="flex flex-col gap-1">
          <Email address={address} />
          <div className="text-lg text-[#758585]">{formatAddress(address)}</div>
        </div>
      </div>
      <div className="border-b border-[#B3B3B3]">
        <h2 className="border-b-4 w-fit border-black pb-2 text-[#B3B3B3]">
          Your Diamonds
        </h2>
      </div>
      <Tokens address={address} />
    </div>
  );
}
