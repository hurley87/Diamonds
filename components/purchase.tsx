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
import { Button } from '@/components/button';
import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

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

    if (!user || !user.wallet?.address || !user.email?.address) {
      console.error('User information is incomplete');
      setIsPurchasing(false);
      return;
    }

    if (colorGrade === '' || caratWeight === '') {
      setIsPurchasing(false);
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

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.hosted_url) {
        throw new Error('No hosted_url in response');
      }

      router.push(data.hosted_url);
    } catch (e) {
      console.error('Error during payment:', e);
      setIsPurchasing(false);
      // Optionally, show an error message to the user
    }
  };

  return (
    <div className="flex flex-col gap-12 py-12 max-w-screen-xl mx-auto">
      <img src="/steps.png" alt="Diamond" className="w-full h-auto" />
      <div className="w-full h-full flex flex-col md:flex-row justify-between gap-24 p-14 bg-[#DFE5E5] rounded-2xl">
        <div className="h-full flex flex-col justify-between w-full">
          <div className="flex flex-col gap-12">
            <h1 className="text-4xl text-[#373B3C]">
              Brilliant, {caratWeight} Carat
            </h1>
            <img src="/buy.png" alt="Diamond" className="w-full h-auto" />
            <div className="flex gap-2 pt-12 items-center justify-start">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <img
                      src="/exclamationmark.png"
                      alt="Exclamation"
                      className="h-4 w-auto"
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      The Gemological Institute of America (GIA) is a leading
                      authority on diamonds, known for creating the 4Cs (Cut,
                      Color, Clarity, Carat) grading system. It provides
                      unbiased diamond grading reports and offers education and
                      research in gemology.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <div className="text-left text-[#62696B]">Certified by GIA</div>
            </div>
          </div>
          <div className="h-8"></div>
        </div>
        <div className="flex flex-col gap-8 w-full max-w-xl mx-auto p-4">
          <div className="w-full flex flex-col gap-4">
            <p className="text-xl text-black">Choose Carat</p>
            <div className="flex justify-between gap-2">
              {caratWeightOptions.map((weight) => (
                <div
                  key={weight}
                  onClick={() => setCaratWeight(weight)}
                  className="w-full flex flex-col gap-1 cursor-pointer"
                >
                  <div
                    className={`bg-black ${
                      caratWeight === weight ? 'h-2.5' : 'h-0.5'
                    }  w-full transition-all duration-200 ease-in-out`}
                  ></div>
                  <div className="text-center">{weight}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full flex flex-col gap-4">
            <p className="text-xl text-black">Choose Color</p>
            <div className="flex justify-between gap-2">
              {colorGradeOptions.map((grade) => (
                <div
                  key={grade}
                  onClick={() => setColorGrade(grade)}
                  className="w-full flex flex-col gap-1 cursor-pointer"
                >
                  <div
                    className={`bg-black ${
                      colorGrade === grade ? 'h-2.5' : 'h-0.5'
                    } w-full transition-all duration-200 ease-in-out`}
                  ></div>
                  <div className="text-center">{grade}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full flex flex-col gap-6 pt-16">
            <p>Clarity</p>
            <div className="flex justify-between gap-1">
              {clarity.map((c, i) => (
                <div key={c} className="w-full flex flex-col gap-1">
                  <div
                    className={`bg-black ${
                      clarity.length - 1 === i
                        ? 'opacity-100 h-1.5'
                        : 'opacity-40 h-0.5'
                    } w-full`}
                  ></div>
                  <div
                    className={`${
                      clarity.length - 1 === i ? 'opacity-100' : 'opacity-40'
                    } w-full text-center text-sm text-black`}
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
                <div key={c} className="w-full flex flex-col gap-1">
                  <div
                    className={`bg-black ${
                      cut.length - 1 === i
                        ? 'opacity-100 h-1.5'
                        : 'opacity-40 h-0.5'
                    } w-full`}
                  ></div>
                  <div
                    className={`${
                      cut.length - 1 === i ? 'opacity-100' : 'opacity-40'
                    } w-full text-center text-sm text-black`}
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
                <div key={p} className="w-full flex flex-col gap-1">
                  <div
                    className={`bg-black ${
                      polish.length - 1 === i
                        ? 'opacity-100 h-1.5'
                        : 'opacity-40 h-0.5'
                    } w-full`}
                  ></div>
                  <div
                    className={`${
                      polish.length - 1 === i ? 'opacity-100' : 'opacity-40'
                    } w-full text-center text-sm text-black`}
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
                <div
                  key={s}
                  className="w-full flex flex-col justify-between h-8"
                >
                  <div
                    className={`bg-black ${
                      symmetry.length - 1 === i
                        ? 'opacity-100 h-1.5'
                        : 'opacity-40 h-0.5'
                    } w-full`}
                  ></div>
                  <div
                    className={`${
                      symmetry.length - 1 === i ? 'opacity-100' : 'opacity-40'
                    } w-full text-center text-sm text-black`}
                  >
                    {s}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-row gap-4	py-8 justify-between">
            <h2 className="font-serif text-5xl">226.095,25 €</h2>
            <div className="h-full flex flex-col  justify-end">
              <div className="text-sm">inkl. mwst.</div>
            </div>
          </div>

          <div className="w-full">
            {user ? (
              <Button
                text={isPurchasing ? 'Buying...' : 'Buy now'}
                disabled={isPurchasing}
                onClick={handleSubmit}
                className="w-full "
              />
            ) : (
              <Button text="Login" onClick={login} className="w-full " />
            )}
          </div>
        </div>
      </div>
      <div className="py-24 flex flex-col gap-14 max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl uppercase  text-[#7A8385]">
            prefer a guided experience?
          </h3>
          <h2 className="text-6xl  uppercase text-[#0C0D0D]">
            we're here to help
          </h2>
        </div>
        <p className="text-[#0C0D0D] text-xl">
          Navigating the world of diamond investment should be as seamless as
          possible. If you'd prefer personalized assistance with your purchase,
          our team is ready to provide one-on-one support. <br />
          <br />
          From connecting your wallet to finalizing your investment, we'll be
          with you every step of the way.
        </p>
        <Link href="#">
          <Button text="Book Personal Consultation" />
        </Link>
      </div>
      <div className="py-24 flex flex-col gap-14 max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl uppercase  text-[#7A8385]">FAQ</h3>
          <img src="/title.png" alt="Diamond" className="w-full h-auto" />
          <Accordion
            type="single"
            collapsible
            className="border-t border-[#0C0D0D] mt-12"
          >
            <AccordionItem
              value="item-1"
              className="border-b border-[#0C0D0D] py-4"
            >
              <AccordionTrigger className="text-2xl">
                What payment options are available for minting?
              </AccordionTrigger>
              <AccordionContent className="text-xl">
                We accept various cryptocurrency payments including ETH, USDC,
                and other major cryptocurrencies.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="item-2"
              className="border-b border-[#0C0D0D] py-4 "
            >
              <AccordionTrigger className="text-2xl">
                Is there a limit on how many NFTs I can mint at once?
              </AccordionTrigger>
              <AccordionContent className="text-xl">
                Yes, there are limits to ensure fair distribution and maintain
                the value of our collection.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="item-3"
              className="border-b border-[#0C0D0D] py-4"
            >
              <AccordionTrigger className="text-2xl">
                Does the NFT price change with cryptocurrency market
                fluctuations?
              </AccordionTrigger>
              <AccordionContent className="text-xl">
                Our NFT prices are pegged to the physical diamond value and are
                not directly affected by crypto market volatility.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="item-4"
              className="border-b border-[#0C0D0D] py-4"
            >
              <AccordionTrigger className="text-2xl">
                How do our diamonds and NFTs stand out from others?
              </AccordionTrigger>
              <AccordionContent className="text-xl">
                Our diamonds are GIA-certified, and our NFTs are backed by
                physical diamonds stored in secure vaults.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="item-5"
              className="border-b border-[#0C0D0D] py-4"
            >
              <AccordionTrigger className="text-2xl">
                How do we ensure the security and authenticity of our diamonds
                and NFTs?
              </AccordionTrigger>
              <AccordionContent className="text-xl">
                Each diamond is GIA-certified and stored in secure vaults. Our
                NFTs are minted on a secure blockchain with detailed
                verification processes.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="item-6"
              className="border-b border-[#0C0D0D] py-4"
            >
              <AccordionTrigger className="text-2xl">
                Where are the diamonds securely stored?
              </AccordionTrigger>
              <AccordionContent className="text-xl">
                Our diamonds are stored in high-security vaults in Switzerland,
                insured and regularly audited.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};
