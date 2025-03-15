import { Burn } from '@/components/burn';
import { Layout } from '@/components/layout';

interface BurnPageProps {
  params: Promise<{ tokenId: string }>;
}

const BurnPage = async ({ params }: BurnPageProps): Promise<JSX.Element> => {
  const { tokenId } = await params;
  const parsedTokenId = parseInt(tokenId, 10);

  if (isNaN(parsedTokenId)) {
    throw new Error('Invalid token ID');
  }

  return (
    <Layout>
      <Burn tokenId={parsedTokenId} />
    </Layout>
  );
};

export default BurnPage;
