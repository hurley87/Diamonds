import Link from 'next/link';
import Image from 'next/image';

export const Footer = () => {
  return (
    <div className="w-full max-w-screen-2xl mx-auto flex justify-between p-6 items-center">
      <Link href="/">
        <Image src="/logo.png" alt="Logo" width={161} height={32} />
      </Link>
      <div>links</div>
    </div>
  );
};
