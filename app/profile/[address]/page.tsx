import { Tokens } from '@/components/tokens';
import { Email } from './email';

interface UpdatePageProps {
  params: { address: string };
}

export default async function UpdatePage({ params }: UpdatePageProps) {
  const address = params.address as `0x${string}`;

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="p-6 flex flex-col gap-9 font-serif max-w-3xl w-full mx-auto">
      <div className="flex items-center gap-4">
        <img
          src={`https://zora.co/api/avatar/${address}?size=36`}
          alt="Profile"
          width={104}
          height={104}
          className="rounded-full"
        />
        <div className="flex flex-col gap-2">
          <Email address={address} />
          <div className="text-sm">{formatAddress(address)}</div>
        </div>
      </div>
      <div className="border-b border-[#B3B3B3]">
        <h2 className="border-b-2 w-fit border-white pb-2">Your Diamonds</h2>
      </div>
      <Tokens address={address} />
    </div>
  );
}
