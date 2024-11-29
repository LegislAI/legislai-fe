'use client';

import { useEffect } from 'react';

import Greeting from '@/components/Greeting';
import LoadingScreen from '@/components/LoadingScreen';
import { useAuth } from '@/context/AuthContext';
import { useSidebarContext } from '@/context/SidebarContext';
import data from '@/data/conversations.json';
import { loadConversations } from '@/store/conversation/conversationSlice';
import { useAppDispatch } from '@/store/hooks';
import { transformConversation } from '@/utils/transformer';

export default function HomePage() {
  const { isOpen } = useSidebarContext();
  const { user, isLoading } = useAuth();
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
        loading: false,
      };

      return transformConversation(conversationWithTimestamps);
    });

    dispatch(loadConversations(transformedConversations));
  }, [dispatch]);

  if (isLoading || !user || !user.username) {
    return <LoadingScreen />;
  }

  return (
    <div
      className={`flex min-h-screen duration-500 ease-in-out ${isOpen ? 'ml-[270px]' : 'ml-0'} flex-col items-center justify-center`}
    >
      <div className="flex w-full flex-col items-center justify-center gap-4 text-gray-100">
        <Greeting username={user.username} />
      </div>
    </div>
  );
}
