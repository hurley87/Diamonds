'use client';
import Link from 'next/link';
import { getDiamond, getUri } from '@/utils/view-tokens';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { X } from 'lucide-react';
import { Transfer } from './transfer';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

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
    <div className="flex flex-col w-full p-6 gap-6">
      <div className="flex flex-col w-full gap-6 relative">
        {showMetadata && (
          <div
            style={{
              background:
                'linear-gradient(0deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.03) 100%), rgba(0, 0, 0, 0.61)',
              backdropFilter: 'blur(80px)',
            }}
            className="flex flex-col absolute top-0 w-full h-full bg-black z-10"
          >
            <div className="flex justify-end">
              <X
                className="cursor-pointer"
                onClick={() => setShowMetadata(false)}
                size={24}
              />
            </div>
            <div className="flex flex-col">
              <h2 className="text-center py-6 font-bold text-lg">Metadata</h2>
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

        <p className="text-right text-sm">226.095,25 €</p>
        <img className="h-auto w-full py-6" src="/diamond.png" alt="diamond" />
        <div className="flex gap-6 justify-center pb-6">
          <div className="flex gap-2 items-center justify-center">
            <div className="text-center opacity-50 text-xs">
              certified by GIA
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <img
                    src="/icons/exclamation.svg"
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
        <div className="flex justify-between text-center">
          <div className="flex flex-col w-full">
            <p className="text-xs opacity-50">Token ID</p>
            <p>{tokenId}</p>
          </div>
          <div className="flex flex-col w-full">
            <p className="text-xs opacity-50">Color Grade</p>
            <p>{diamond.colorGrade}</p>
          </div>
          <div className="flex flex-col w-full">
            <p className="text-xs opacity-50">Color Grade</p>
            <p>{diamond.caratWeight}</p>
          </div>
        </div>
        <div className="flex justify-between text-center">
          <div className="flex flex-col w-full">
            <p className="text-xs opacity-50">Cut</p>
            <p>excellent</p>
          </div>
          <div className="flex flex-col w-full">
            <p className="text-xs opacity-50">Symmetry</p>
            <p>excellent</p>
          </div>
          <div className="flex flex-col w-full">
            <p className="text-xs opacity-50">Polish</p>
            <p>excellent</p>
          </div>
        </div>
      </div>

      {showActions && (
        <div className="flex flex-col gap-4">
          <Link href={`/redeem/${tokenId}`}>
            <Button>Redeem diamond</Button>
          </Link>
          <Transfer tokenId={tokenId} />
        </div>
      )}
    </div>
  );
};
