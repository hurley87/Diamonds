'use client';
import Link from 'next/link';
import { getDiamond, getUri } from '@/utils/view-tokens';
import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Transfer } from './transfer';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import { Button } from './button';

export const Token = ({
  tokenId,
  showActions,
}: {
  tokenId: number;
  showActions?: boolean;
}) => {
  const [diamond, setDiamond] = useState<any>({});
  const [showMetadata, setShowMetadata] = useState(false);

  useEffect(() => {
    const fetchDiamond = async () => {
      const uri = (await getUri(tokenId)) as string;
      const diamond = await getDiamond(uri);
      setDiamond(diamond);
    };
    fetchDiamond();
  }, [tokenId]);

  if (!diamond) return null;

  return (
    <div
      style={{
        background: `
              linear-gradient(to bottom, rgba(1, 72, 76, 0) 47%, rgba(1, 72, 76, .2) 94%) 18%, 
              rgba(166, 175, 177, 0.3)
            `,
      }}
      className="flex flex-col w-full p-6 gap-6 rounded-xl relative"
    >
      {showMetadata && (
        <div
          style={{
            background:
              'linear-gradient(0deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.03) 100%), rgba(0, 0, 0, 0.61)',
            backdropFilter: 'blur(80px)',
          }}
          className="flex flex-col absolute left-0 top-0 w-full h-full bg-black z-10 p-6 rounded-xl backdrop-blur-xl text-white text-xl"
        >
          <div className="flex justify-end">
            <X
              className="cursor-pointer"
              onClick={() => setShowMetadata(false)}
              size={24}
            />
          </div>
          <div className="flex flex-col">
            <h2 className="text-center sfont-bold text-2xl py-16">Metadata</h2>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <div>Color Grade:</div>
                <div>{diamond.colorGrade}</div>
              </div>
              <div className="flex justify-between">
                <div>Carat Weight:</div>
                <div>{diamond.caratWeight}</div>
              </div>
              <div className="flex justify-between">
                <div>GIA Number:</div>
                <div>{diamond.giaNumber}</div>
              </div>
              <div className="flex justify-between">
                <div>GIA Date:</div>
                <div>{diamond.giaDate}</div>
              </div>
              <div className="flex justify-between">
                <div>Measurements:</div>
                <div>{diamond.measurements}</div>
              </div>
              <div className="flex justify-between">
                <div>Certificate:</div>
                <div>{diamond.certificate}</div>
              </div>
              <div className="flex justify-between">
                <div>Clarity Grade:</div>
                <div>{diamond.clarityGrade}</div>
              </div>
              <div className="flex justify-between">
                <div>Certificate link:</div>
                <div>{diamond.certificate}</div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col w-full gap-6 relative">
        <img
          className="h-auto w-2/3 mx-auto py-2"
          src="/diamond.png"
          alt="diamond"
        />
        <div className="flex justify-between text-center">
          <div className="flex flex-col w-full">
            <p className="text-sm opacity-60 uppercase text-[#0C0E0E]">Karat</p>
            <p className="text-black font-bold">1,01</p>
          </div>
          <div className="flex flex-col w-full">
            <p className="text-sm opacity-60 uppercase text-[#0C0E0E]">
              Clarity
            </p>
            <p className="text-black font-bold">IF/FL</p>
          </div>
          <div className="flex flex-col w-full">
            <p className="text-sm opacity-60 uppercase text-[#0C0E0E]">Color</p>
            <p className="text-black font-bold">D</p>
          </div>
        </div>
        <div className="flex justify-between text-center">
          <div className="flex flex-col w-full">
            <p className="text-sm opacity-60 uppercase text-[#0C0E0E]">Cut</p>
            <p className="text-black font-bold">excellent</p>
          </div>
          <div className="flex flex-col w-full">
            <p className="text-sm opacity-60 uppercase text-[#0C0E0E]">
              Symmetry
            </p>
            <p className="text-black font-bold">excellent</p>
          </div>
          <div className="flex flex-col w-full">
            <p className="text-sm opacity-60 uppercase text-[#0C0E0E]">
              Polish
            </p>
            <p className="text-black font-bold">excellent</p>
          </div>
        </div>
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
        <div className="flex gap-6 justify-center">
          <div className="flex gap-2 items-center justify-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className="flex gap-2 items-center justify-center">
                    <img
                      src="/icons/exclamation.svg"
                      alt="Exclamation"
                      className="h-4 w-auto"
                    />
                    <div className="text-center opacity-50 text-xs">
                      certified by GIA
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="bg-[#373B3C] text-[#BECBCC] rounded-xl p-4">
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
          <div className="flex gap-1 items-center opacity-50 text-xs cursor-pointer">
            <div>show metadata</div>
            <img
              onClick={() => setShowMetadata(true)}
              src="/icons/search.svg"
              alt="Exclamation"
              className="h-4 w-auto"
            />
          </div>
        </div>
      </div>
      <p className="text-center text-xl text-[#7A8385]">226.095,25 €</p>
      {showActions && (
        <div className="flex flex-col gap-4">
          <Link href={`/redeem/${tokenId}`}>
            <Button text="Redeem diamond" className="w-full" />
          </Link>
          <Transfer tokenId={tokenId} setDiamond={setDiamond} />
        </div>
      )}
    </div>
  );
};
