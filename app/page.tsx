import { serif } from '@/app/fonts';
import { Button } from '@/components/button';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center p-12 gap-24 py-24">
      <h1
        className={`${serif.className} text-7xl max-w-3xl mx-auto text-center`}
      >
        Choose your diamond
      </h1>
      <div className="flex gap-10 justify-between max-w-5xl mx-auto">
        <div className="flex flex-col w-full rounded-2xl gap-6">
          <div className="p-6">
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
        <div className="flex flex-col w-full rounded-2xl gap-6">
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
            <Link href="/buy" className="w-fit mx-auto">
              <Button text="Buy Now" />
            </Link>
          </div>
        </div>
        <div className="flex flex-col w-full rounded-2xl gap-6">
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
      <div className="flex flex-col max-w-5xl	mx-auto">
        <img
          className="h-auto w-[537px] mx-auto"
          src="/coinbase.png"
          alt="diamond"
        />
        <h2 className="text-4xl text-center leading-[64px]">
          Our trusted partner, Coinbase Commerce, expertly handles all aspects
          of our transactions. From Know Your Customer (KYC) procedures to
          secure payments and final distribution, our collaboration with the
          renowned global cryptocurrency leader, Coinbase, Inc., ensures
          seamless and reliable service.
        </h2>
      </div>
    </main>
  );
}
