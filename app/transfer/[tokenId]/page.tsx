import { Transfer } from '@/components/transfer';

interface TransferPageProps {
  params: { tokenId: number };
}

export default async function TransferPage({ params }: TransferPageProps) {
  const tokenId = params.tokenId;

  return (
    <div className="max-w-screen-2xl mx-auto p-6">
      <Transfer tokenId={tokenId} />
    </div>
  );
}
