import './globals.css';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';

import AuthWrapper from '@/components/AuthWrapper';
import ClientSessionProvider from '@/components/ClientSessionProvider';
import SideBar from '@/components/Sidebar';
import { SidebarProvider } from '@/components/Sidebar/sidebarContext';
import ToastComponent from '@/components/ToastComponent';
import { authOptions } from '@/lib/auth';
import { raleway } from '@/utils/fonts';

import StoreProvider from './StoreProvider';

import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: 'LegislAI',
  description: 'LegislAI',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={`bg-background ${raleway.className} tracking-wide`}>
        <ClientSessionProvider session={session}>
          <StoreProvider>
            <AuthWrapper>
              <ToastComponent />
              <SidebarProvider>
                <SideBar />
                <main>{children}</main>
              </SidebarProvider>
            </AuthWrapper>
          </StoreProvider>
        </ClientSessionProvider>
      </body>
    </html>
  );
}
