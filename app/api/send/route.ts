import { Resend } from 'resend';
import { EmailTemplate } from '@/components/email-template';
import { NextRequest } from 'next/server';


export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const {
    email,
    firstName,
    lastName,
    street,
    unitNumber,
    city,
    postalCode,
    country,
    phone,
    diamond,
    tokenId,
  } = await req.json();

  try {
    const { data, error } = await resend.emails.send({
      from: 'Support <help@4collection.xyz>',
      to: [email],
      subject: 'Your Diamond Delivery',
      text: firstName,
      bcc: ['davidhurley87@gmail.com'],
      cc: ['dhurls99@gmail.com'],
      reply_to: 'davidhurley87@gmail.com',
      react: EmailTemplate({
        firstName,
        lastName,
        street,
        unitNumber,
        city,
        postalCode,
        country,
        phone,
        diamond,
        tokenId,
      }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
