'use client';
import { usePrivy } from '@privy-io/react-auth';
import Link from 'next/link';

export const Header = () => {
  const { user, login, logout } = usePrivy();
  const email = user?.email?.address;
  const address = user?.wallet?.address;

  return (
    <div className="max-w-screen-2xl mx-auto flex justify-between p-6">
      <Link href="/">
        <h1 className="text-lg font-bold">4Collection</h1>
      </Link>
      {user ? (
        <div className="flex items-center gap-2">
          <Link href={`/profile/${address}`}>
            <div>{address}</div>
          </Link>
          <div>{email}</div>
          <button
            className="bg-white rounded-sm px-4 text-black"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      ) : (
        <button className="bg-white rounded-sm px-4 text-black" onClick={login}>
          Login
        </button>
      )}
    </div>
  );
};
