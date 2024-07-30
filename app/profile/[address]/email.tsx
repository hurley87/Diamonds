'use client';
import { usePrivy } from '@privy-io/react-auth';
import { serif } from '@/app/fonts';

export const Email = ({ address }: { address: `0x${string}` }) => {
  const { user, ready } = usePrivy();
  const authAddress = user?.wallet?.address as `0x${string}`;
  const email = user?.email?.address;

  if (authAddress !== address || !ready) return null;

  return <h1 className={`text-2xl ${serif.className}`}>{email}</h1>;
};
