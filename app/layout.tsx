import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const font = Plus_Jakarta_Sans({
  weight: '400',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Monaf Studio',
  description: 'A full stack web development agency',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={font.className}>{children}</body>
    </html>
  );
}
