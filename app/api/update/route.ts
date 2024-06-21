import { NextRequest } from 'next/server';
import { getIrys } from '@/utils/mint';

export async function POST(req: NextRequest) {
  const { code, metadata } = await req.json();

  const irys = await getIrys();

  const tags = [{ name: 'Root-TX', value: code }];

  try {
    const receipt = await irys.upload(JSON.stringify(metadata), { tags });
    console.log(`Data uploaded ==> https://gateway.irys.xyz/${receipt.id}`);

    return new Response('ok');
  } catch (e) {
    console.log('Error uploading data ', e);
    return new Response('error');
  }
}
