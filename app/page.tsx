'use client';
import { usePrivy } from '@privy-io/react-auth';
import Image from 'next/image';

export default function Home() {
  const { user, ready, login, logout, linkEmail } = usePrivy();
  const address = user?.wallet?.address;

  if (!ready) {
    return <div>Loading...</div>;
  }

  const APP_ID = process.env.NEXT_PUBLIC_COINBASE_APP_ID!;

  function buildOneClickURL() {
    return `https://pay.coinbase.com/buy/one-click?appId=${APP_ID}&defaultAsset=ETH&defaultPaymentMethod=ACH_BANK_ACCOUNT&destinationWallets=[{"address":"${address}","blockchains":["base"]}]&fiatCurrency=usd&presetFiatAmount=25&quoteId=fund-wallet-button`;
  }

  console.log('user', user);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-3xl font-bold">4Collection</h1>
      <Image
        src="/vercel.svg"
        alt="Tailwind CSS Logo"
        width={200}
        height={200}
      />
      {user ? (
        <div className="flex flex-col gap-2">
          <div>{address}</div>
          {!user.email ? (
            <div>
              <button onClick={linkEmail}>Link Your Email</button>
            </div>
          ) : (
            <div>{user.email.address}</div>
          )}

          <div>
            <button onClick={() => window.open(buildOneClickURL())}>
              Fund Wallet (Uses Real Money!)
            </button>
          </div>
          <div>
            <button onClick={logout}>Logout</button>
          </div>
        </div>
      ) : (
        <button onClick={login}>Login</button>
      )}
    </main>
  );
}
