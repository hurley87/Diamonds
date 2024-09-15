'use client';
import { usePrivy } from '@privy-io/react-auth';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './button';
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
    <div className="w-full max-w-screen-2xl mx-auto flex justify-between p-6 items-center">
      <Link href="/">
        <Image src="/logo.png" alt="Logo" width={161} height={32} />
      </Link>
      {!ready ? null : user ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex items-center gap-2">
              <div>{formatAddress(address)}</div>
              <img
                src={`https://zora.co/api/avatar/${address}?size=36`}
                alt="Profile"
                width={32}
                height={32}
                className="rounded-full"
              />
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
        <Button text="Login" onClick={login} />
      )}
    </div>
  );
};
