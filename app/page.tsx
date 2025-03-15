import { serif } from '@/app/fonts';
import { Button } from '@/components/button';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center p-12 gap-24 py-24">
      <div className="w-full">
        <h1
          className={`${serif.className} text-7xl max-w-3xl mx-auto text-center uppercase leading-[80px] text-white`}
        >
          Choose your diamond
        </h1>
        <div className="flex flex-col md:flex-row gap-32 justify-between mx-auto w-full p-4 lg:p-16 lg:py-24">
          <div
            style={{
              background: `
              linear-gradient(to bottom, rgba(1, 72, 76, 0) 47%, rgba(1, 72, 76, .2) 94%) 18%, 
              rgba(166, 175, 177, 0.3)
            `,
            }}
            className="flex flex-col w-full rounded-2xl gap-6"
          >
            <div className="p-10">
              <img
                className="h-auto w-full block"
                src="/diamond.png"
                alt="diamond"
              />
            </div>
            <div className="flex justify-between text-center">
              <div className="flex flex-col w-full">
                <p className="text-sm opacity-60">Carat</p>
                <p>1.01</p>
              </div>
              <div className="flex flex-col w-full">
                <p className="text-sm opacity-60">Clarity</p>
                <p>IF</p>
              </div>
              <div className="flex flex-col w-full">
                <p className="text-sm opacity-60">Color</p>
                <p>D</p>
              </div>
            </div>
            <div className="flex justify-between text-center">
              <div className="flex flex-col w-full">
                <p className="text-sm opacity-60">Cut</p>
                <p>excellent</p>
              </div>
              <div className="flex flex-col w-full">
                <p className="text-sm opacity-60">Symmetry</p>
                <p>excellent</p>
              </div>
              <div className="flex flex-col w-full">
                <p className="text-sm opacity-60">Polish</p>
                <p>excellent</p>
              </div>
            </div>
            <div className="flex flex-col gap-6 pt-6">
              <div className="flex gap-5 justify-center">
                <div className="h-7	w-7 rounded-full border border-white text-center text-sm leading-6 pl-0.5 font-black text-black bg-white">
                  D
                </div>
                <div className="h-7	w-7 rounded-full border border-white text-center text-sm leading-6 pl-0.5 font-black ">
                  E
                </div>
                <div className="h-7	w-7 rounded-full border border-white text-center text-sm leading-6 pl-0.5 font-black ">
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
            className="flex flex-col w-full rounded-2xl gap-6"
          >
            <div className="p-6">
              <img className="h-auto w-full" src="/diamond.png" alt="diamond" />
            </div>
            <div className="flex justify-between text-center">
              <div className="flex flex-col w-full">
                <p className="text-sm opacity-60">Carat</p>
                <p>3.01</p>
              </div>
              <div className="flex flex-col w-full">
                <p className="text-sm opacity-60">Clarity</p>
                <p>IF</p>
              </div>
              <div className="flex flex-col w-full">
                <p className="text-sm opacity-60">Color</p>
                <p>D</p>
              </div>
            </div>
            <div className="flex justify-between text-center">
              <div className="flex flex-col w-full">
                <p className="text-sm opacity-60">Cut</p>
                <p>excellent</p>
              </div>
              <div className="flex flex-col w-full">
                <p className="text-sm opacity-60">Symmetry</p>
                <p>excellent</p>
              </div>
              <div className="flex flex-col w-full">
                <p className="text-sm opacity-60">Polish</p>
                <p>excellent</p>
              </div>
            </div>
            <div className="flex flex-col gap-6 pt-6">
              <div className="flex gap-5 justify-center">
                <div className="h-7	w-7 rounded-full border border-white text-center text-sm leading-6 pl-0.5 font-black text-black bg-white">
                  D
                </div>
                <div className="h-7	w-7 rounded-full border border-white text-center text-sm leading-6 pl-0.5 font-black ">
                  E
                </div>
                <div className="h-7	w-7 rounded-full border border-white text-center text-sm leading-6 pl-0.5 font-black ">
                  F
                </div>
              </div>
              <Link href="/buy" className="w-fit mx-auto mb-6">
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
            className="flex flex-col w-full rounded-2xl gap-6"
          >
            <div className="p-6">
              <img className="h-auto w-full" src="/diamond.png" alt="diamond" />
            </div>
            <div className="flex justify-between text-center">
              <div className="flex flex-col w-full">
                <p className="text-sm opacity-60">Carat</p>
                <p>5.01</p>
              </div>
              <div className="flex flex-col w-full">
                <p className="text-sm opacity-60">Clarity</p>
                <p>IF</p>
              </div>
              <div className="flex flex-col w-full">
                <p className="text-sm opacity-60">Color</p>
                <p>D</p>
              </div>
            </div>
            <div className="flex justify-between text-center">
              <div className="flex flex-col w-full">
                <p className="text-sm opacity-60">Cut</p>
                <p>excellent</p>
              </div>
              <div className="flex flex-col w-full">
                <p className="text-sm opacity-60">Symmetry</p>
                <p>excellent</p>
              </div>
              <div className="flex flex-col w-full">
                <p className="text-sm opacity-60">Polish</p>
                <p>excellent</p>
              </div>
            </div>
            <div className="flex flex-col gap-6 pt-6">
              <div className="flex gap-5 justify-center">
                <div className="h-7	w-7 rounded-full border border-white text-center text-sm leading-6 pl-0.5 font-black text-black bg-white">
                  D
                </div>
                <div className="h-7	w-7 rounded-full border border-white text-center text-sm leading-6 pl-0.5 font-black ">
                  E
                </div>
                <div className="h-7	w-7 rounded-full border border-white text-center text-sm leading-6 pl-0.5 font-black ">
                  F
                </div>
              </div>
              <Link href="/buy" className="w-fit mx-auto">
                <Button text="Buy Now" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-10 max-w-5xl mx-auto py-40">
        <img
          className="h-auto w-[350px] mx-auto"
          src="/coinbase.png"
          alt="diamond"
        />
        <h2 className="text-xl md:text-3xl text-center md:leading-[44px]">
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
