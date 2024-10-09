import './globals.css';
import type { Metadata } from 'next';
import { raleway } from '@/utils/fonts';
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
        className={`bg-gray-100 text-stone-900 ${raleway.className} tracking-wide`}
      >
        <SidebarProvider>
          <SideBar />
          <main>{children}</main>
        </SidebarProvider>
      </body>
    </html>
  );
}
