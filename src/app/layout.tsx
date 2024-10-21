import './globals.css';
import type { Metadata } from 'next';
import { raleway } from '@/utils/fonts';

import StoreProvider from './StoreProvider';
import { SidebarProvider } from '@/components/Sidebar/sidebarContext';

import SideBar from '@/components/Sidebar';

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
        className={`bg-gradient-to-t from-green-200 to-green-700/90 text-stone-900 ${raleway.className} tracking-wide`}
      >
        <StoreProvider>
          <SidebarProvider>
            <SideBar />
            <main>{children}</main>
          </SidebarProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
