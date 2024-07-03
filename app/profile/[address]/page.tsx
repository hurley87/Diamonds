import { Tokens } from '@/components/tokens';

interface EditorPageProps {
  params: { address: string };
}

export default async function Editor({ params }: EditorPageProps) {
  const address = params.address as `0x${string}`;

  return <Tokens address={address} />;
}
