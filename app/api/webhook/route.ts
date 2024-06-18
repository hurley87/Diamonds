import { NextRequest } from 'next/server';
import { createHmac } from 'crypto';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('X-CC-Webhook-Signature');
  console.log('Webhook signature:', sig);

  if (!sig) {
    throw new Error('Coinbase signature missing from request headers');
  }

  const webhookSecret = process.env.COINBASE_WEBHOOK_SECRET;
  console.log('Webhook secret:', webhookSecret);

  if (!webhookSecret) {
    throw new Error(
      'Make sure you set COINBASE_WEBHOOK_SECRET in your .env file'
    );
  }

  const hmac = createHmac('sha512', webhookSecret);
  hmac.update(body);

  const generatedSignature = hmac.digest('hex');

  console.log('Generated signature:', generatedSignature);

  const isValid = generatedSignature === sig;
  console.log('Is signature valid:', isValid);
  //   if (!isValid) {
  //     throw new Error('Invalid webhook signature');
  //   }

  const hookData = JSON.parse(body);
  console.log('Webhook data:', hookData);

  const metadata = hookData.event.data.metadata;
  console.log('Metadata:', metadata);

  //   use metadata to mint NFT

  // your code continues here ...
  return new Response('ok');
}
