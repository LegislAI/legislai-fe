'use client';

import { useEffect } from 'react';
// import Image from 'next/image';

import { useSidebarContext } from '@/components/Sidebar/sidebarContext';
import data from '@/data/conversations.json';
import { loadConversations } from '@/store/conversation/conversationSlice';
import { useAppDispatch } from '@/store/hooks';
import { transformConversation } from '@/utils/transformer';

// import TypewriterEffect from '@/components/TypewriterEffect';

// import { CatchPhrases } from '@/data/phrases';

export default function HomePage() {
  const { isOpen } = useSidebarContext();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const transformedConversations = data.map(conversations => {
      const conversationWithTimestamps = {
        ...conversations,
        created_at: conversations.messages[0].timestamp,
        updated_at: conversations.messages[0].timestamp,
        messages: conversations.messages.map(message => ({
          ...message,
          created_at: message.timestamp,
          attachments: message.attachments || [],
        })),
      };

      return transformConversation(conversationWithTimestamps);
    });

    dispatch(loadConversations(transformedConversations));
  }, [dispatch]);

  return (
    <div
      className={`flex min-h-screen duration-500 ease-in-out ${isOpen ? 'ml-[270px]' : 'ml-0'} flex-col items-center justify-center`}
    >
      <div className="flex w-full flex-col items-center justify-center gap-4 text-gray-100">
        {/* <Image
          src="/legislai-logo-fff.svg"
          alt="legislau-logo"
          width={250}
          height={50}
        /> */}

        {/* <TypewriterEffect
          phrases={CatchPhrases}
          typingSpeed={100}
          deleteSpeed={50}
          pauseTime={2000}
        /> */}

        {/* <p className="mx-auto mt-10 w-3/4 text-center text-lg">
          Navegar pela legislação portuguesa nunca foi tão fácil. O nosso
          chatbot está aqui para o ajudar a entender e a aplicar as leis
          portuguesas de forma rápida e eficiente.
        </p> */}
      </div>
    </div>
  );
}
