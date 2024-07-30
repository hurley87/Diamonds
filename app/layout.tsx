import type { Metadata } from 'next';
import { sans } from '@/app/fonts';
import './globals.css';
import Providers from './providers';
import { Header } from '@/components/header';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: '4Collection',
  description: 'Real Diamonds, Blockchain Certified.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={sans.className + ' bg-black w-full'}>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <div className="min-h-screen w-full flex flex-col">
              <Header />
              <div>{children}</div>
            </div>
          </ThemeProvider>

          <Toaster />
        </Providers>
        <Footer />
      </body>
    </html>
  );
}
