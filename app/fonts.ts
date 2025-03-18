import { Lato, Playfair_Display } from 'next/font/google';
import localFont from 'next/font/local';

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

export const haboro = localFont({
  src: [
    {
      path: '../public/fonts/haboro/Haboro Contrast Norm Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/haboro/Haboro Contrast Norm Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/haboro/Haboro Contrast Norm Light.otf',
      weight: '300',
      style: 'normal',
    },
  ],
  variable: '--font-haboro',
});

export const redHat = localFont({
  src: [
    {
      path: '../public/fonts/redhat/RedHatDisplay-VariableFont_wght.ttf',
      weight: '300 900',
      style: 'normal',
    },
    {
      path: '../public/fonts/redhat/RedHatDisplay-Italic-VariableFont_wght.ttf',
      weight: '300 900',
      style: 'italic',
    },
  ],
  variable: '--font-redhat',
});
