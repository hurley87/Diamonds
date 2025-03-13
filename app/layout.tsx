import type { Metadata } from 'next';
import './globals.css';
import Providers from './providers';
import { Header } from '@/components/header';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';

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
      </body>
    </html>
  );
}
