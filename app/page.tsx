import { DiamondCarousel } from '@/components/diamond-carousel';

export default function Home() {
  return (
    <main className="flex flex-col items-center p-4 sm:p-8 md:p-12 gap-12 md:gap-24 py-12 md:py-24">
      <div className="w-full pt-44">
        <h1
          className={`font-haboro text-4xl sm:text-5xl md:text-6xl lg:text-[104px] max-w-3xl mx-auto text-center uppercase leading-tight md:leading-[1.3em] text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]`}
        >
          Choose your diamond
        </h1>
        <DiamondCarousel />
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
          renowned global cryptocurrency leader, Coinbase, Inc., ensures
          seamless and reliable service.
        </h2>
      </div>
    </main>
  );
}
