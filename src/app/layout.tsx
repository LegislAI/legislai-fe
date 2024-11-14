import './globals.css';
import type { Metadata } from 'next';
import { raleway } from '@/utils/fonts';

import StoreProvider from './StoreProvider';
import { SidebarProvider } from '@/components/Sidebar/sidebarContext';
import ClientSessionProvider from '@/components/ClientSessionProvider';
import SideBar from '@/components/Sidebar';
import ToastComponent from '@/components/ToastComponent';
import 'react-toastify/dist/ReactToastify.css';

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
        className={`bg-gradient-to-tr from-green-house-800 to-green-house-950 text-stone-900 ${raleway.className} tracking-wide`}
      >
        <ClientSessionProvider>
          <StoreProvider>
            <ToastComponent />
            <SidebarProvider>
              <SideBar />
              <main>{children}</main>
            </SidebarProvider>
          </StoreProvider>
        </ClientSessionProvider>
      </body>
    </html>
  );
}
