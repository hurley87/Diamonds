'use client';
import Link from 'next/link';
import { Button } from '@/components/button';
import { usePrivy } from '@privy-io/react-auth';

export default function ThanksPage() {
  const { user, login } = usePrivy();
  const address = user?.wallet?.address as `0x${string}`;

  return (
    <div className="flex flex-col gap-6 sm:gap-8 md:gap-12 py-6 sm:py-8 md:py-12 max-w-screen-xl mx-auto px-4 sm:px-6">
      <img src="/steps4.png" alt="Diamond" className="w-full h-auto" />
      <div className="flex flex-col md:flex-row p-4 sm:p-6 md:p-12 lg:p-24 gap-6 sm:gap-8 md:gap-12 lg:gap-24">
        <div className="flex flex-col h-full justify-start">
          <h1
            className={`text-4xl sm:text-5xl md:text-6xl leading-[120%] w-full max-w-[520px] font-haboro uppercase`}
          >
            Awesome.
            <br />
            YOU JUST PURCHASED THE DIAMOND!
          </h1>
        </div>
        <div className="flex flex-col gap-8 sm:gap-10 md:gap-14">
          <div className="flex flex-col gap-3 sm:gap-4">
            <h2 className="text-xl sm:text-2xl uppercase text-[#7A8385] font-haboro">
              WHAT NOW?
            </h2>
            <p className="text-lg sm:text-xl leading-[1.6] sm:leading-[40px] max-w-xl opacity-80">
              The digital asset already assigned to your wallet. Consectetur
              adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis
              tellus. Sed dignissim, metus nec fringilla accumsan.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:gap-4">
            <h2 className="text-xl sm:text-2xl uppercase text-[#7A8385] font-haboro">
              WHAT&apos;S NEXT?
            </h2>
            <p className="text-lg sm:text-xl leading-[1.6] sm:leading-[40px] max-w-xl opacity-80">
              Qorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
              turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
              nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
              tellus elit sed risus. Maecenas eget condimentum velit, sit amet
              feugiat lectus.
            </p>
          </div>
          {address ? (
            <Link href={`/profile/${address}`} className="w-full sm:w-auto">
              <Button
                text="Check out your diamond"
                className="w-full sm:w-auto"
              />
            </Link>
          ) : (
            <Button
              onClick={login}
              text="Connect your wallet"
              className="w-full sm:w-auto"
            />
          )}
        </div>
      </div>
    </div>
  );
}
