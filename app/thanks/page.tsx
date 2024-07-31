'use client';
import Link from 'next/link';
import { Button } from '@/components/button';
import { usePrivy } from '@privy-io/react-auth';
import { serif } from '../fonts';

export default function ThanksPage() {
  const { user } = usePrivy();
  const address = user?.wallet?.address as `0x${string}`;

  return (
    <div className="w-fit max-w-screen-2xl mx-auto flex flex-col md:flex-row p-6 md:p-24 gap-12 md:gap-24">
      <div className="flex flex-col h-full justify-start">
        <h1
          className={`text-5xl leading-[120%] w-full max-w-[420px] ${serif.className}`}
        >
          Awesome.
          <br />
          You just purchased the diamond!
        </h1>
      </div>
      <div className="flex flex-col gap-14">
        <p className="text-xl leading-[40px] max-w-xl opacity-80">
          Thank you for your purchase. Coinbase will take five to fifteen
          minutes to confirm your payment. Please check your email, including
          your spam folder, for the confirmation email. If you do not receive
          your confirmation email or diamond within thirty minutes, please
          contact us via{' '}
          <Link className="underline" href="mailto: support@4collection.com">
            email
          </Link>
          . Click the button below to check if your diamond has arrived. Your
          individual GIA certificate will be updated with the metadata within
          the next 24-48 hours.
        </p>
        <Link href={` /profile/${address}`}>
          <Button text="Check out your diamond" />
        </Link>
      </div>
    </div>
  );
}
