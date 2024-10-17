'use client';

import { useSidebarContext } from '@/components/Sidebar/sidebarContext';
import ChatComponent from '@/components/ChatComponent';

type ChatParams = {
  params: {
    id: string;
  };
};

export default function Chat({ params: { id } }: ChatParams) {
  const { isOpen } = useSidebarContext();

  if (!Number(id)) {
    throw new Error('ID is not a number.');
  }

  return (
    <div
      className={`transition-margin flex min-h-screen duration-500 ease-in-out ${isOpen ? 'ml-[270px]' : 'ml-0'} flex-col items-center justify-center bg-gradient-to-t from-green-100 to-green-400`}
    >
      <ChatComponent conversationId={id} />
    </div>
  );
}
