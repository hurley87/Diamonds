import { deposit } from '@/utils/mint';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest): Promise<Response> {
  const { address } = await req.json();

  const hash = await deposit(address);

  return NextResponse.json({ hash });
}

export const dynamic = 'force-dynamic';
