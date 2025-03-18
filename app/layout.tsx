import type { Metadata } from 'next';
import './globals.css';
import Providers from './providers';
import { Header } from '@/components/header';
import { Toaster } from '@/components/ui/toaster';
import { Footer } from '@/components/footer';
import { VideoBackground } from '@/components/video-background';
import { haboro, redHat } from './fonts';

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
    <html lang="en" className={`${haboro.variable} ${redHat.variable}`}>
      <body>
        <Providers>
          <div className="min-h-screen w-full flex flex-col relative bg-[#F5F5F5] font-redhat">
            <VideoBackground />
            <Header />
            <div className="relative z-10">{children}</div>
            <Footer />
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
