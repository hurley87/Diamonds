import { balanceOf } from '@/utils/mint';

interface EditorPageProps {
  params: { address: string };
}

export default async function Editor({ params }: EditorPageProps) {
  const address = params.address as `0x${string}`;
  const balance = (await balanceOf(address)) as number;
  console.log(balance);
  return (
    <div>
      {address}: {balance}
    </div>
  );
}
