import Link from 'next/link';
import { Button } from './button';

interface DiamondCardProps {
  gradient: string;
  karat: string;
  clarity: string;
  color: string;
  cut: string;
  symmetry: string;
  polish: string;
}

export function DiamondCard({
  gradient,
  karat,
  clarity,
  color,
  cut,
  symmetry,
  polish,
}: DiamondCardProps) {
  return (
    <div
      style={{
        background: gradient,
      }}
      className="flex flex-col w-full rounded-2xl gap-4 md:gap-6 p-8 md:p-6 pb-10"
    >
      <div className="p-4 md:p-8">
        <img className="h-auto w-full" src="/diamond.png" alt="diamond" />
      </div>
      <div className="flex justify-between text-center">
        <div className="flex flex-col w-full">
          <p className="text-xs sm:text-sm opacity-60 uppercase text-[#0C0E0E] font-redhat">
            Karat
          </p>
          <p className="text-sm sm:text-base text-black font-bold">{karat}</p>
        </div>
        <div className="flex flex-col w-full">
          <p className="text-xs sm:text-sm opacity-60 uppercase text-[#0C0E0E]">
            Clarity
          </p>
          <p className="text-sm sm:text-base text-black font-bold">{clarity}</p>
        </div>
        <div className="flex flex-col w-full">
          <p className="text-xs sm:text-sm opacity-60 uppercase text-[#0C0E0E]">
            Color
          </p>
          <p className="text-sm sm:text-base text-black font-bold">{color}</p>
        </div>
      </div>
      <div className="flex justify-between text-center">
        <div className="flex flex-col w-full">
          <p className="text-xs sm:text-sm opacity-60 uppercase text-[#0C0E0E]">
            Cut
          </p>
          <p className="text-sm sm:text-base text-black font-bold">{cut}</p>
        </div>
        <div className="flex flex-col w-full">
          <p className="text-xs sm:text-sm opacity-60 uppercase text-[#0C0E0E]">
            Symmetry
          </p>
          <p className="text-sm sm:text-base text-black font-bold">
            {symmetry}
          </p>
        </div>
        <div className="flex flex-col w-full">
          <p className="text-xs sm:text-sm opacity-60 uppercase text-[#0C0E0E]">
            Polish
          </p>
          <p className="text-sm sm:text-base text-black font-bold">{polish}</p>
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
        <Link href="/buy" className="w-fit mx-auto mb-6">
          <Button text="Buy Now" />
        </Link>
      </div>
    </div>
  );
}
