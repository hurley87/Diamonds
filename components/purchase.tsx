'use client';
import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export const Purchase = () => {
  const { user, login } = usePrivy();
  const id = user?.wallet?.address as `0x${string}`;
  const email = user?.email?.address;
  const colorGradeOptions = ['D', 'E', 'F'];
  const caratWeightOptions = ['1.01', '3.01', '5.01'];
  const [colorGrade, setColorGrade] = useState(colorGradeOptions[0]);
  const [caratWeight, setCaratWeight] = useState(caratWeightOptions[0]);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const router = useRouter();
  const clarity = [
    'I1',
    'SI2',
    'SI1',
    'VS2',
    'VS1',
    'VVS2',
    'VVS1',
    'IF',
    'FL',
  ];
  const cut = ['mid', 'good', 'very good', 'excellent'];
  const polish = ['mid', 'good', 'very good', 'excellent'];
  const symmetry = ['mid', 'good', 'very good', 'excellent'];

  const handleSubmit = async () => {
    setIsPurchasing(true);

    if (colorGrade === '' || caratWeight === '') {
      return;
    }

    const body = JSON.stringify({
      id,
      email,
      colorGrade,
      caratWeight,
    });

    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      });
      const data = await response.json();

      router.push(data.hosted_url);
    } catch {
      setIsPurchasing(false);
    }
  };

  return (
    <div className="w-full h-full flex justify-between p-6">
      <div className="h-full flex flex-col justify-between w-full">
        <h1 className="text-4xl">Brilliant, {caratWeight} Carat</h1>
        <div className="flex flex-col gap-0 py-24">
          <img
            src="/diamond.png"
            alt="Diamond"
            className="w-[400px] mx-auto h-auto"
          />
          <div className="flex gap-2 pt-12 items-center justify-center">
            <div className="text-center">Certified by GIA</div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <img
                    src="/icons/exclamationmark.svg"
                    alt="Exclamation"
                    className="h-4 w-auto"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    The Gemological Institute of America (GIA) is a leading
                    authority on diamonds, known for creating the 4Cs (Cut,
                    Color, Clarity, Carat) grading system. It provides unbiased
                    diamond grading reports and offers education and research in
                    gemology.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <div className="h-8"></div>
      </div>
      <div className="flex flex-col gap-8 w-full max-w-xl mx-auto p-4">
        <div className="w-full flex flex-col gap-4">
          <p>Choose Carat</p>
          <div className="flex justify-between gap-2">
            {caratWeightOptions.map((weight) => (
              <div
                onClick={() => setCaratWeight(weight)}
                className="w-full flex flex-col gap-1 cursor-pointer"
              >
                <div
                  className={`bg-[#7A8385] ${
                    caratWeight === weight ? 'h-2.5' : 'h-0.5'
                  }  w-full transition-all duration-200 ease-in-out`}
                ></div>
                <div className="text-center">{weight}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full flex flex-col gap-4">
          <p>Choose Color</p>
          <div className="flex justify-between gap-2">
            {colorGradeOptions.map((grade) => (
              <div
                onClick={() => setColorGrade(grade)}
                className="w-full flex flex-col gap-1 cursor-pointer"
              >
                <div
                  className={`bg-[#7A8385] ${
                    colorGrade === grade ? 'h-2.5' : 'h-0.5'
                  } w-full transition-all duration-200 ease-in-out`}
                ></div>
                <div className="text-center">{grade}</div>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xl">Facts about the diamond</p>
        <div className="w-full flex flex-col gap-4">
          <p>Clarity</p>
          <div className="flex justify-between gap-1">
            {clarity.map((c, i) => (
              <div className="w-full flex flex-col gap-1">
                <div
                  className={`bg-[#7A8385] ${
                    clarity.length - 1 === i ? 'opacity-100' : 'opacity-40'
                  } h-0.5 w-full`}
                ></div>
                <div
                  className={`${
                    clarity.length - 1 === i ? 'opacity-100' : 'opacity-40'
                  } w-full text-center text-xs`}
                >
                  {c}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full flex flex-col gap-4">
          <p>Cut</p>
          <div className="flex justify-between gap-1">
            {cut.map((c, i) => (
              <div className="w-full flex flex-col gap-1">
                <div
                  className={`bg-[#7A8385] ${
                    cut.length - 1 === i ? 'opacity-100' : 'opacity-40'
                  } h-0.5 w-full`}
                ></div>
                <div
                  className={`${
                    cut.length - 1 === i ? 'opacity-100' : 'opacity-40'
                  } w-full text-center text-xs`}
                >
                  {c}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full flex flex-col gap-4">
          <p>Polish</p>
          <div className="flex justify-between gap-1">
            {polish.map((p, i) => (
              <div className="w-full flex flex-col gap-1">
                <div
                  className={`bg-[#7A8385] ${
                    polish.length - 1 === i ? 'opacity-100' : 'opacity-40'
                  } h-0.5 w-full`}
                ></div>
                <div
                  className={`${
                    polish.length - 1 === i ? 'opacity-100' : 'opacity-40'
                  } w-full text-center text-xs`}
                >
                  {p}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full flex flex-col gap-4">
          <p>Symmetry</p>
          <div className="flex justify-between gap-1">
            {symmetry.map((s, i) => (
              <div className="w-full flex flex-col gap-1">
                <div
                  className={`bg-[#7A8385] ${
                    symmetry.length - 1 === i ? 'opacity-100' : 'opacity-40'
                  } h-0.5 w-full`}
                ></div>
                <div
                  className={`${
                    symmetry.length - 1 === i ? 'opacity-100' : 'opacity-40'
                  } w-full text-center text-xs`}
                >
                  {s}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-row gap-4	py-2">
          <h2 className="font-serif text-3xl">226.095,25 €</h2>
          <div className="h-full flex flex-col  justify-end">
            <div className="text-sm">inkl. mwst.</div>
          </div>
        </div>

        <div>
          {user ? (
            <button
              disabled={isPurchasing}
              className="bg-[#7A8385] text-black py-2.5 w-full font-bold bg-gradient-to-r from-white to-[#A8E0E4] disabled:opacity-50"
              onClick={handleSubmit}
            >
              {isPurchasing ? 'Buying...' : 'Buy now'}
            </button>
          ) : (
            <button
              className="bg-[#7A8385] text-black py-2.5 w-full font-bold bg-gradient-to-r from-white to-[#A8E0E4] disabled:opacity-50"
              onClick={login}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
