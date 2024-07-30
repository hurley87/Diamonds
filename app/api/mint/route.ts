import { NextRequest } from 'next/server';
import { createHmac } from 'crypto';
import { mintNft, getIrys } from '@/utils/mint';

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

  const code = hookData.event.data.code;
  console.log('Code:', code);

  const eventType = hookData.event.type;
  console.log('Event type:', eventType);

  if (eventType === 'charge:confirmed') {
    console.log('Charge confirmed');

    const NFTmetadata = {
      name: '4Collection',
      symbol: '4Collection',
      image:
        'https://gateway.irys.xyz/OdMV7ECHWxhBhW0T8cDMguEf5O1C8w-mXXsrVbXPe9Q',
      description: 'Diamonds. Onchain. Forever.',
      attributes: [
        {
          trait_type: 'Color Grade',
          value: metadata.colorGrade,
        },
        {
          trait_type: 'Carat Weight',
          value: metadata.caratWeight,
        },
        {
          trait_type: 'Shape & Cutting Style',
          value: 'Round Brilliant',
        },
        {
          trait_type: 'Cut Grade',
          value: 'Excellent',
        },
        {
          trait_type: 'Polish',
          value: 'Excellent',
        },
        {
          trait_type: 'Symmetry',
          value: 'Excellent',
        },
        {
          trait_type: 'Fluorescence',
          value: 'None',
        },
        {
          trait_type: 'Code',
          value: code,
        },
      ],
    };

    const irys = await getIrys();

    try {
      const receipt = await irys.upload(JSON.stringify(NFTmetadata));
      console.log(`Data uploaded ==> https://gateway.irys.xyz/${receipt.id}`);

      const uri = `https://gateway.irys.xyz/mutable/${receipt.id}`;

      console.log('Minting NFT with URI:', uri);
      console.log('Mint address: ', metadata.id);

      const transaction = await mintNft(metadata.id, uri);

      console.log('transaction', transaction);

      return new Response('ok');
    } catch (e) {
      console.log('Error uploading data ', e);
      return new Response('error');
    }
  }
  return new Response('ok');
}
