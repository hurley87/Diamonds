import { NextRequest } from 'next/server';
import { getIrys } from '@/utils/mint';
import { PrivyClient } from '@privy-io/server-auth';

const privy = new PrivyClient(
  process.env.NEXT_PUBLIC_PRIVY_APP_ID!,
  process.env.PRIVY_APP_SECRET!
);

export async function POST(req: NextRequest) {
  const { code, metadata } = await req.json();

  try {
    const authToken = (req.headers.get('Authorization') || '').replace(
      'Bearer ',
      ''
    );
    const verifiedReq = await privy.verifyAuthToken(authToken);
    const adminUserId = process.env.ADMIN_ID!;
    const isAuthorized = verifiedReq.userId === adminUserId;
    if (!isAuthorized) {
      console.log('Unauthorized request');
      return new Response('unauthorized');
    }

    const irys = await getIrys();
    const tags = [{ name: 'Root-TX', value: code }];

    const receipt = await irys.upload(JSON.stringify(metadata), { tags });
    console.log(`Data uploaded ==> https://gateway.irys.xyz/${receipt.id}`);

    return new Response('ok');
  } catch (e) {
    console.log('Error uploading data ', e);
    return new Response('error');
  }
}
