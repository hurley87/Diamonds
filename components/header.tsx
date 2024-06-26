'use client';
import Link from 'next/link';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

export const Header = () => {
  const account = useAccount();
  const address = account.address;
  const { disconnect } = useDisconnect();
  const { connectors, connect } = useConnect();

  return (
    <div className="max-w-screen-2xl mx-auto flex justify-between p-6">
      <Link href="/">
        <h1 className="text-lg font-bold">4Collection</h1>
      </Link>
      {address ? (
        <div className="flex items-center gap-2">
          <Link href={`/profile/${address}`}>
            <div>{address}</div>
          </Link>
          <button
            className="bg-white rounded-sm px-4 text-black"
            type="button"
            onClick={() => disconnect()}
          >
            Disconnect
          </button>
        </div>
      ) : (
        <>
          {connectors.map((connector) => (
            <button
              id={connector.id}
              key={connector.uid}
              onClick={() => connect({ connector })}
              type="button"
              className="bg-white rounded-sm px-4 text-black"
            >
              Connect
            </button>
          ))}
        </>
      )}
    </div>
  );
};
