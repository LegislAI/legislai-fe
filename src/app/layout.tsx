import './globals.css';
import type { Metadata } from 'next';

import SideBar from '@/components/Sidebar';
import { SidebarProvider } from '@/components/Sidebar/sidebarContext';
import ToastComponent from '@/components/ToastComponent';
import { AuthProvider } from '@/context/AuthContext';
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
            <ToastComponent />
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
