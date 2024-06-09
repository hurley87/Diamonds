import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-3xl font-bold">4Collection</h1>
      <Image
        src="/vercel.svg"
        alt="Tailwind CSS Logo"
        width={200}
        height={200}
      />
    </main>
  );
}
