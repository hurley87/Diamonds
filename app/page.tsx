import { Button } from '@/components/button';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center p-4 sm:p-8 md:p-12 gap-12 md:gap-24 py-12 md:py-24">
      <div className="w-full pt-44">
        <h1
          className={`font-haboro text-4xl sm:text-5xl md:text-6xl lg:text-[104px] max-w-3xl mx-auto text-center uppercase leading-tight md:leading-[1.3em] text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]`}
        >
          Choose your diamond
        </h1>
        <div className="flex flex-col max-w-5xl mx-auto lg:flex-row gap-8 md:gap-16 lg:gap-12 justify-between w-full p-2 lg:py-40">
          <div
            style={{
              background: `
              linear-gradient(to bottom, rgba(1, 72, 76, 0) 47%, rgba(1, 72, 76, .2) 94%) 18%, 
              rgba(166, 175, 177, 0.3)
            `,
            }}
            className="flex flex-col w-full rounded-2xl gap-4 md:gap-6 p-4 md:p-6"
          >
            <div className="p-4 md:p-6">
              <img className="h-auto w-full" src="/diamond.png" alt="diamond" />
            </div>
            <div className="flex justify-between text-center">
              <div className="flex flex-col w-full">
                <p className="text-xs sm:text-sm opacity-60 uppercase text-[#0C0E0E] font-redhat">
                  Karat
                </p>
                <p className="text-sm sm:text-base text-black font-bold">
                  1,01
                </p>
              </div>
              <div className="flex flex-col w-full">
                <p className="text-xs sm:text-sm opacity-60 uppercase text-[#0C0E0E]">
                  Clarity
                </p>
                <p className="text-sm sm:text-base text-black font-bold">IF</p>
              </div>
              <div className="flex flex-col w-full">
                <p className="text-xs sm:text-sm opacity-60 uppercase text-[#0C0E0E]">
                  Color
                </p>
                <p className="text-sm sm:text-base text-black font-bold">D</p>
              </div>
            </div>
            <div className="flex justify-between text-center">
              <div className="flex flex-col w-full">
                <p className="text-xs sm:text-sm opacity-60 uppercase text-[#0C0E0E]">
                  Cut
                </p>
                <p className="text-sm sm:text-base text-black font-bold">
                  exzellent
                </p>
              </div>
              <div className="flex flex-col w-full">
                <p className="text-xs sm:text-sm opacity-60 uppercase text-[#0C0E0E]">
                  Symmetry
                </p>
                <p className="text-sm sm:text-base text-black font-bold">
                  exzellent
                </p>
              </div>
              <div className="flex flex-col w-full">
                <p className="text-xs sm:text-sm opacity-60 uppercase text-[#0C0E0E]">
                  Polish
                </p>
                <p className="text-sm sm:text-base text-black font-bold">
                  exzellent
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4 md:gap-6 pt-4 md:pt-6">
              <div className="flex gap-3 md:gap-5 justify-center">
                <div className="h-6 w-6 md:h-7 md:w-7 rounded-full flex items-center justify-center text-xs md:text-sm text-[#DFE5E5] bg-[#373B3C]">
                  D
                </div>
                <div className="h-6 w-6 md:h-7 md:w-7 rounded-full flex items-center justify-center text-xs md:text-sm text-[#DFE5E5] bg-[#7A8385]">
                  E
                </div>
                <div className="h-6 w-6 md:h-7 md:w-7 rounded-full flex items-center justify-center text-xs md:text-sm text-[#DFE5E5] bg-[#7A8385]">
                  F
                </div>
              </div>
              <Link href="/buy" className="w-fit mx-auto">
                <Button text="Buy Now" />
              </Link>
            </div>
          </div>
          <div
            style={{
              background: `
              linear-gradient(to bottom, rgba(93, 83, 0, 0) 47%, rgba(93, 83, 0, .2) 94%) 18%
            `,
            }}
            className="flex flex-col w-full rounded-2xl gap-6 p-6"
          >
            <div className="p-6">
              <img className="h-auto w-full" src="/diamond.png" alt="diamond" />
            </div>
            <div className="flex justify-between text-center">
              <div className="flex flex-col w-full">
                <p className="text-sm opacity-60 uppercase text-[#0C0E0E]">
                  Karat
                </p>
                <p className="text-black font-bold">1,01</p>
              </div>
              <div className="flex flex-col w-full">
                <p className="text-sm opacity-60 uppercase text-[#0C0E0E]">
                  Clarity
                </p>
                <p className="text-black font-bold">IF</p>
              </div>
              <div className="flex flex-col w-full">
                <p className="text-sm opacity-60 uppercase text-[#0C0E0E]">
                  Color
                </p>
                <p className="text-black font-bold">D</p>
              </div>
            </div>
            <div className="flex justify-between text-center">
              <div className="flex flex-col w-full">
                <p className="text-sm opacity-60 uppercase text-[#0C0E0E]">
                  Cut
                </p>
                <p className="text-black font-bold">exzellent</p>
              </div>
              <div className="flex flex-col w-full">
                <p className="text-sm opacity-60 uppercase text-[#0C0E0E]">
                  Symmetry
                </p>
                <p className="text-black font-bold">exzellent</p>
              </div>
              <div className="flex flex-col w-full">
                <p className="text-sm opacity-60 uppercase text-[#0C0E0E]">
                  Polish
                </p>
                <p className="text-black font-bold">exzellent</p>
              </div>
            </div>
            <div className="flex flex-col gap-6 pt-6">
              <div className="flex gap-5 justify-center">
                <div className="h-7 w-7 rounded-full  flex items-center justify-center text-sm text-[#DFE5E5] bg-[#373B3C]">
                  D
                </div>
                <div className="h-7 w-7 rounded-full  flex items-center justify-center text-sm text-[#DFE5E5] bg-[#7A8385]">
                  E
                </div>
                <div className="h-7 w-7 rounded-full  flex items-center justify-center text-sm text-[#DFE5E5] bg-[#7A8385]">
                  F
                </div>
              </div>
              <Link href="/buy" className="w-fit mx-auto">
                <Button text="Buy Now" />
              </Link>
            </div>
          </div>
          <div
            style={{
              background: `
              linear-gradient(to bottom, rgba(91, 20, 26, 0) 47%, rgba(91, 20, 26, .2) 94%) 18%
            `,
            }}
            className="flex flex-col w-full rounded-2xl gap-6 p-6"
          >
            <div className="p-6">
              <img className="h-auto w-full" src="/diamond.png" alt="diamond" />
            </div>
            <div className="flex justify-between text-center">
              <div className="flex flex-col w-full">
                <p className="text-sm opacity-60 uppercase text-[#0C0E0E]">
                  Karat
                </p>
                <p className="text-black font-bold">1,01</p>
              </div>
              <div className="flex flex-col w-full">
                <p className="text-sm opacity-60 uppercase text-[#0C0E0E]">
                  Clarity
                </p>
                <p className="text-black font-bold">IF</p>
              </div>
              <div className="flex flex-col w-full">
                <p className="text-sm opacity-60 uppercase text-[#0C0E0E]">
                  Color
                </p>
                <p className="text-black font-bold">D</p>
              </div>
            </div>
            <div className="flex justify-between text-center">
              <div className="flex flex-col w-full">
                <p className="text-sm opacity-60 uppercase text-[#0C0E0E]">
                  Cut
                </p>
                <p className="text-black font-bold">exzellent</p>
              </div>
              <div className="flex flex-col w-full">
                <p className="text-sm opacity-60 uppercase text-[#0C0E0E]">
                  Symmetry
                </p>
                <p className="text-black font-bold">exzellent</p>
              </div>
              <div className="flex flex-col w-full">
                <p className="text-sm opacity-60 uppercase text-[#0C0E0E]">
                  Polish
                </p>
                <p className="text-black font-bold">exzellent</p>
              </div>
            </div>
            <div className="flex flex-col gap-6 pt-6">
              <div className="flex gap-5 justify-center">
                <div className="h-7 w-7 rounded-full  flex items-center justify-center text-sm text-[#DFE5E5] bg-[#373B3C]">
                  D
                </div>
                <div className="h-7 w-7 rounded-full  flex items-center justify-center text-sm text-[#DFE5E5] bg-[#7A8385]">
                  E
                </div>
                <div className="h-7 w-7 rounded-full  flex items-center justify-center text-sm text-[#DFE5E5] bg-[#7A8385]">
                  F
                </div>
              </div>
              <Link href="/buy" className="w-fit mx-auto pb-6">
                <Button text="Buy Now" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6 md:gap-10 max-w-5xl mx-auto py-20 md:py-40">
        <img
          className="h-auto w-[250px] sm:w-[300px] md:w-[350px] mx-auto"
          src="/coinbase.png"
          alt="diamond"
        />
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-center leading-relaxed md:leading-[44px]">
          Our trusted partner, Coinbase Commerce, expertly handles all aspects
          of our transactions. From Know Your Costumer (KYC) procedures to
          secure payments and final distribution, our collaboration with the
          renowned global cryptocurrency leader, Counbase, Inc., ensures
          seamless and reliable service.
        </h2>
      </div>
    </main>
  );
}
