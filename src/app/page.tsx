'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '@/state/hooks';
import { useSidebarContext } from '@/components/Sidebar/sidebarContext';
import { useSession } from 'next-auth/react';

import { loadConversations } from '@/state/conversation/conversationSlice';
import { transformConversation } from '@/utils/transformer';

import data from '@/data/conversations.json';
import { redirect } from 'next/navigation';

export default function HomePage() {
  const { data: session } = useSession();
  const { isOpen } = useSidebarContext();
  const dispatch = useAppDispatch();

  if (!session) {
    redirect('/login');
  }

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
      <div className="text-center text-gray-100">
        <h1 className="mb-4 text-5xl font-bold">LegislAI</h1>
        <h3 className="mb-4 text-xl font-bold">
          A CONSTITUIÇÃO TAMBÉM PODE SER SIMPLES
        </h3>
        <p className="mx-auto mb-12 w-[60%]">
          Navegar pela legislação portuguesa nunca foi tão fácil. O nosso
          chatbot está aqui para o ajudar a entender e a aplicar as leis
          portuguesas de forma rápida e eficiente.
        </p>
      </div>
      {/* <Card
        title="Assistente Virtual"
        description="Tem dúvidas sobre legislação? Pergunte ao nosso chatbot!"
        image="/logo.png"
        url="/chat"
      /> */}
    </div>
  );
}
