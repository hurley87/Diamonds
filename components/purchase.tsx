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
    <div className="flex flex-col gap-8 md:gap-12 py-8 md:py-12 max-w-screen-xl mx-auto font-redhat px-4 md:px-0">
      <img src="/step3.png" alt="Diamond" className="w-full h-auto" />
      <div className="w-full h-full flex flex-col md:flex-row justify-between gap-8 md:gap-24 p-6 md:p-14 bg-[#DFE5E5] rounded-2xl">
        <div className="h-full flex flex-col justify-between w-full">
          <div className="flex flex-col gap-8 md:gap-12 h-full">
            <h1 className="text-3xl md:text-4xl text-[#373B3C] font-haboro uppercase">
              Brilliant, {caratWeight} Carat
            </h1>
            <img src="/buy.png" alt="Diamond" className="w-full h-auto" />
            <div className="flex gap-2 pt-8 md:pt-12 items-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div className="flex gap-2 items-center">
                      <img
                        src="/exclamationmark.png"
                        alt="Exclamation"
                        className="h-4 w-auto"
                      />
                      <div className="text-left text-[#62696B] text-xs md:text-base">
                        Certified by GIA
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs md:text-base">
                      The Gemological Institute of America (GIA) is a leading
                      authority on diamonds, known for creating the 4Cs (Cut,
                      Color, Clarity, Carat) grading system. It provides
                      unbiased diamond grading reports and offers education and
                      research in gemology.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <div className="h-8"></div>
        </div>
        <div className="flex flex-col gap-6 md:gap-8 w-full max-w-xl mx-auto p-4">
          <div className="w-full flex flex-col gap-4">
            <p className="text-lg md:text-xl text-black">Choose Carat</p>
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
                  <div className="text-center text-xs md:text-base">
                    {weight}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full flex flex-col gap-4">
            <p className="text-lg md:text-xl text-black">Choose Color</p>
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
                  <div className="text-center text-xs md:text-base">
                    {grade}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full flex flex-col gap-4 md:gap-6 pt-8 md:pt-16">
            <p className="text-lg md:text-xl">Clarity</p>
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
                    } w-full text-center text-xs md:text-sm text-black`}
                  >
                    {c}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full flex flex-col gap-4">
            <p className="text-lg md:text-xl">Cut</p>
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
                    } w-full text-center text-xs md:text-sm text-black`}
                  >
                    {c}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full flex flex-col gap-4">
            <p className="text-lg md:text-xl">Polish</p>
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
                    } w-full text-center text-xs md:text-sm text-black`}
                  >
                    {p}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full flex flex-col gap-4">
            <p className="text-lg md:text-xl">Symmetry</p>
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
                    } w-full text-center text-xs md:text-sm text-black`}
                  >
                    {s}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-row gap-4 py-6 md:py-8 justify-between items-center">
            <h2 className="text-2xl md:text-5xl font-redhat">226.095,25 €</h2>
            <div className="h-full flex flex-col justify-end">
              <div className="text-sm text-left md:text-lg font-redhat">
                inkl. mwst.
              </div>
            </div>
          </div>

          <div className="w-full">
            {user ? (
              <Button
                text={isPurchasing ? 'Buying...' : 'Buy now'}
                disabled={isPurchasing}
                onClick={handleSubmit}
                className="w-full"
              />
            ) : (
              <Button
                text="Connect Wallet to Buy"
                onClick={login}
                className="w-full"
              />
            )}
          </div>
        </div>
      </div>
      <div className="py-12 md:py-24 flex flex-col gap-8 md:gap-14 max-w-screen-lg mx-auto w-full px-4 md:px-0">
        <div className="flex flex-col gap-4 w-full">
          <h3 className="text-xl md:text-2xl uppercase text-[#7A8385] font-haboro">
            prefer a guided experience?
          </h3>
          <h2 className="text-4xl md:text-6xl uppercase text-[#0C0D0D] font-haboro">
            {`we're here to help`}
          </h2>
        </div>
        <p className="text-[#0C0D0D] text-lg md:text-xl whitespace-pre-line">
          {`Navigating the world of diamond investment should be as seamless as possible. If you'd prefer personalized 
          assistance with your purchase, our team is ready to provide one-on-one support.
          \nFrom connecting your wallet to finalizing your investment, we'll be with you every step of the way.`}
        </p>
        <Link target="_blank" href="https://4collection.com/contact/">
          <Button text="Book Personal Consultation" />
        </Link>
      </div>
      <div className="py-12 md:py-24 flex flex-col gap-8 md:gap-14 max-w-screen-lg mx-auto px-4 md:px-0">
        <div className="flex flex-col gap-4">
          <h3 className="text-xl md:text-2xl uppercase text-[#7A8385] font-haboro">
            FAQ
          </h3>
          <img src="/title.png" alt="Diamond" className="w-full h-auto" />
          <Accordion
            type="single"
            collapsible
            className="border-t border-[#0C0D0D] mt-8 md:mt-12"
          >
            <AccordionItem
              value="item-1"
              className="border-b border-[#0C0D0D] py-3 md:py-4"
            >
              <AccordionTrigger className="text-sm text-left md:text-lg">
                What payment options are available for minting?
              </AccordionTrigger>
              <AccordionContent className="text-xs md:text-base">
                We accept all major cryptocurrencies supported by Coinbase
                Commerce. Payments can be made directly through Coinbase
                accounts (including fiat payments connected to Coinbase) or via
                external crypto wallets such as MetaMask. You do not need a
                Coinbase account to complete a purchase. The minimum purchase
                amount corresponds to the value of the most affordable diamond
                available on our platform.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="item-2"
              className="border-b border-[#0C0D0D] py-3 md:py-4"
            >
              <AccordionTrigger className="text-sm text-left md:text-lg">
                Is there a limit on how many NFTs I can mint at once?
              </AccordionTrigger>
              <AccordionContent className="text-xs md:text-base">
                You can mint one NFT per transaction. However, there is no limit
                on the total number of NFTs you can mint overall—feel free to
                mint as many as you like, one at a time.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="item-3"
              className="border-b border-[#0C0D0D] py-3 md:py-4"
            >
              <AccordionTrigger className="text-sm text-left md:text-lg">
                Does the NFT price change with cryptocurrency market
                fluctuations?
              </AccordionTrigger>
              <AccordionContent className="text-xs md:text-base">
                Our diamond prices are pegged to a fixed USD/EUR value and do
                not fluctuate with cryptocurrency market changes. However, since
                payments are made in crypto, the amount of cryptocurrency
                required to complete a purchase may vary to match the fixed
                USD/EUR price.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="item-4"
              className="border-b border-[#0C0D0D] py-3 md:py-4"
            >
              <AccordionTrigger className="text-sm text-left md:text-lg">
                How do our diamonds and NFTs stand out from others?
              </AccordionTrigger>
              <AccordionContent className="text-xs md:text-base">
                Each diamond we offer is GIA-certified and uniquely tied to a
                single NFT, ensuring both physical and digital authenticity. Our
                NFTs are deployed on Base, Coinbase's official Layer-2 solution,
                offering security and scalability. Unlike many other digital
                assets, our diamonds are physically redeemable—holders can burn
                the NFT to claim the underlying diamond.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="item-5"
              className="border-b border-[#0C0D0D] py-3 md:py-4"
            >
              <AccordionTrigger className="text-sm text-left md:text-lg">
                How do we ensure the security and authenticity of our diamonds
                and NFTs?
              </AccordionTrigger>
              <AccordionContent className="text-xs md:text-base">
                Every diamond is GIA-certified and linked directly to its NFT
                via metadata that stores the original GIA certificate, creating
                a secure digital twin. Our smart contracts are audited by
                leading firms to ensure maximum security. This guarantees the
                authenticity and traceability of both the physical diamond and
                its digital counterpart.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="item-6"
              className="border-b border-[#0C0D0D] py-3 md:py-4"
            >
              <AccordionTrigger className="text-sm text-left md:text-lg">
                Where are the diamonds securely stored?
              </AccordionTrigger>
              <AccordionContent className="text-xs md:text-base">
                All diamonds are stored in insured and audited warehouses. When
                a customer redeems a diamond by burning the associated NFT, the
                diamond is securely shipped and fully insured by the luxury
                logistics provider Ferrari Group.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};
