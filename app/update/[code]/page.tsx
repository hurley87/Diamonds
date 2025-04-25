import { Update } from '@/components/update';
import { getUri } from '@/utils/view-tokens';
import { notFound } from 'next/navigation';

interface UpdatePageProps {
  params: Promise<{ code: string }>;
}

export default async function UpdatePage({
  params,
}: UpdatePageProps): Promise<JSX.Element> {
  const { code } = await params;

  if (!code) {
    notFound();
  }

  const uri = await getUri(Number(code));

  console.log(uri);

  return (
    <main className="py-12 md:py-24 w-full">
      <Update uri={uri as string} />
    </main>
  );
}
