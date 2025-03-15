import type { Metadata } from 'next';
import './globals.css';
import Providers from './providers';
import { Header } from '@/components/header';
import { Toaster } from '@/components/ui/toaster';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: '4Collection – Digitized Diamonds',
  description:
    'Discover and showcase unique digital diamonds. Powered by Web3 technology.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="min-h-screen w-full flex flex-col">
            <Header />
            <div>{children}</div>
            <Footer />
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
