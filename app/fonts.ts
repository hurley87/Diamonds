import { Lato, Playfair_Display } from 'next/font/google';

export const sans = Lato({
  weight: ['400', '700'],
  style: ['normal'],
  subsets: ['latin'],
  variable: '--font-sans',
});

export const serif = Playfair_Display({
  weight: ['400', '700'],
  style: ['normal'],
  subsets: ['latin'],
  variable: '--font-serif',
});
