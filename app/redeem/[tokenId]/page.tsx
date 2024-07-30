import { Burn } from '@/components/burn';
import { Layout } from '@/components/layout';

interface BurnPageProps {
  params: { tokenId: number };
}

export default async function BurnPage({ params }: BurnPageProps) {
  const tokenId = params.tokenId;

  return (
    <Layout>
      <Burn tokenId={tokenId} />
    </Layout>
  );
}
