import './globals.css';
import type { Metadata } from 'next';

import SideBar from '@/components/Sidebar';
import ToastProvider from '@/components/ToastProvider';
import { AuthProvider } from '@/context/AuthContext';
import { SidebarProvider } from '@/context/SidebarContext';
import { raleway } from '@/utils/fonts';

import StoreProvider from './StoreProvider';

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
      <body className={`bg-background ${raleway.className} tracking-wide`}>
        <AuthProvider>
          <StoreProvider>
            <ToastProvider />
            <SidebarProvider>
              <SideBar />
              <main>{children}</main>
            </SidebarProvider>
          </StoreProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
