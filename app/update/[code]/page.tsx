import { Update } from '@/components/update';
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

  return <Update code={code} />;
}
