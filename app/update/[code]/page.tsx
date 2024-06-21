import { Update } from '@/components/update';

interface UpdatePageProps {
  params: { code: string };
}

export default async function UpdatePage({ params }: UpdatePageProps) {
  const code = params.code as string;

  return <Update code={code} />;
}
