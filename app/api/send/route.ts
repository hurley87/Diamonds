import { Resend } from 'resend';
import { EmailTemplate } from '@/components/email-template';
import { NextRequest } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { email, address, diamond } = await req.json();

  try {
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [email],
      subject: 'Your Diamond Delivery',
      text: address,
      bcc: ['davidhurley87@gmail.com'],
      cc: ['dhurls99@gmail.com'],
      reply_to: 'davidhurley87@gmail.com',
      react: EmailTemplate({ address, diamond }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
