'use client';
import { usePrivy } from '@privy-io/react-auth';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { user, ready, login, logout, linkEmail } = usePrivy();
  const address = user?.wallet?.address;
  const email = user?.email?.address;
  const router = useRouter();

  if (!ready) {
    return <div>Loading...</div>;
  }

  const handlePurchase = async () => {
    if (!user) return;

    const body = JSON.stringify({
      id: address,
      email,
    });

    const response = await fetch('/api/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });
    const data = await response.json();

    router.push(data.hosted_url);
  };

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
            <div>{email}</div>
          )}
          <div>
            <button onClick={handlePurchase}>Make $1 Purchase</button>
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
