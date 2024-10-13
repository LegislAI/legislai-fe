'use client';

import { useSidebarContext } from '@/components/Sidebar/sidebarContext';

export default function Chat() {
  const { isOpen } = useSidebarContext();
  return (
    <div
      className={`transition-margin flex min-h-screen duration-500 ease-in-out ${isOpen ? 'ml-[270px]' : 'ml-0'} flex-col items-center justify-center bg-gradient-to-t from-green-100 to-green-400`}
    >
      <h1 className="text-4xl">Chat</h1>
    </div>
  );
}
