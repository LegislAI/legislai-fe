import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['300', '400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'LegislAI',
  description: 'LegislAI',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-gray-100 text-stone-900 ${montserrat.variable} font-montserrat antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
