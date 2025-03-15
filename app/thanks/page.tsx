'use client';
import Link from 'next/link';
import { Button } from '@/components/button';
import { usePrivy } from '@privy-io/react-auth';
import { serif } from '../fonts';

export default function ThanksPage() {
  const { user } = usePrivy();
  const address = user?.wallet?.address as `0x${string}`;

  return (
    <div className="flex flex-col gap-12 py-12 max-w-screen-xl mx-auto">
      <img src="/steps4.png" alt="Diamond" className="w-full h-auto" />
      <div className="flex flex-col md:flex-row p-6 md:p-24 gap-12 md:gap-24">
        <div className="flex flex-col h-full justify-start">
          <h1
            className={`text-6xl leading-[120%] w-full max-w-[520px] ${serif.className} uppercase`}
          >
            Awesome.
            <br />
            YOU JUST PURCHASED THE DIAMOND!
          </h1>
        </div>
        <div className="flex flex-col gap-14">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl uppercase text-[#7A8385]">WHAT NOW?</h2>
            <p className="text-xl leading-[40px] max-w-xl opacity-80">
              The digital asset already assigned to your wallet. Consectetur
              adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis
              tellus. Sed dignissim, metus nec fringilla accumsan.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl uppercase text-[#7A8385]">WHAT’S NEXT?</h2>
            <p className="text-xl leading-[40px] max-w-xl opacity-80">
              Qorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
              turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
              nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
              tellus elit sed risus. Maecenas eget condimentum velit, sit amet
              feugiat lectus.
            </p>
          </div>
          <Link href={`/profile/${address}`}>
            <Button text="Check out your diamond" />
          </Link>
        </div>
      </div>
    </div>
  );
}
