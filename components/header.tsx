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
      className="w-full mx-auto flex justify-between p-9 items-center"
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
      <span></span>
      <Link href="/">
        <Image src="/Logo.svg" alt="Logo" width={164} height={48} />
      </Link>
      {!ready ? null : user ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="uppercase text-[#F5F5F5] cursor-pointer">
              {formatAddress(address)}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link className="cursor-pointer" href={`/profile/${address}`}>
                My Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onSelect={logout}>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div
          onClick={login}
          className="uppercase text-[#F5F5F5] cursor-pointer"
        >
          Sign in
        </div>
      )}
    </div>
  );
};
