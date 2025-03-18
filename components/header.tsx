'use client';
import { usePrivy } from '@privy-io/react-auth';
import Link from 'next/link';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export const Header = () => {
  const { user, login, ready, logout } = usePrivy();
  const address = user?.wallet?.address as `0x${string}`;

  const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address?.slice(0, 6)}...${address?.slice(-4)}`;
  };

  return (
    <div
      className="w-full mx-auto flex justify-between items-center px-4 sm:px-6 md:px-9 py-4 sm:py-6 md:py-9"
      style={{
        background: `linear-gradient(
    to bottom, 
    rgba(12, 13, 13, 1) 41%, 
    rgba(12, 13, 13, 0.75) 65%, 
    rgba(55, 59, 60, 0.65) 84%, 
    rgba(55, 59, 60, 0) 100%
  )`,
        opacity: 0.3,
      }}
    >
      <span className="w-8 sm:w-12 md:w-16"></span>
      <Link href="/">
        <Image
          src="/Logo.svg"
          alt="Logo"
          width={120}
          height={35}
          className="sm:w-[140px] sm:h-[40px] md:w-[164px] md:h-[48px]"
        />
      </Link>
      {!ready ? null : user ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="uppercase text-[#F5F5F5] cursor-pointer text-sm sm:text-base">
              {formatAddress(address)}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-[#373B3C] rounded-xl p-4 sm:p-6 backdrop-blur-xl font-redhat w-[200px] sm:w-[220px]"
          >
            <DropdownMenuItem asChild>
              <Link
                className="cursor-pointer text-[#BECBCC] uppercase text-sm sm:text-base"
                href={`/profile/${address}`}
              >
                My Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer text-[#BECBCC] uppercase text-sm sm:text-base"
              onSelect={logout}
            >
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div
          onClick={login}
          className="uppercase text-[#F5F5F5] cursor-pointer text-sm sm:text-base"
        >
          Sign in
        </div>
      )}
    </div>
  );
};
