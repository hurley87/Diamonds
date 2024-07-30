import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest): Promise<Response> {
  const { id, email, address, colorGrade, caratWeight } = await req.json();

  const url = 'https://api.commerce.coinbase.com/charges';

  const requestBody = {
    local_price: {
      amount: '1',
      currency: 'USD',
    },
    pricing_type: 'fixed_price',

    name: 'Diamond',
    description: 'Cool description',
    redirect_url: 'https://www.4collection.xyz/thanks',

    metadata: {
      id,
      email,
      address,
      colorGrade,
      caratWeight,
    },
  };

  const payload = {
    method: 'POST',
    mode: 'cors' as RequestMode,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CC-Api-Key': process.env.COMMERCE_API_KEY as string,
    },
    body: JSON.stringify(requestBody),
  };
  const response = await fetch(url, payload);
  const { data } = await response.json();

  return NextResponse.json(data);
}

export const dynamic = 'force-dynamic';
