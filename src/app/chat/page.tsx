'use client';

import { useRouter } from 'next/navigation';

import LoadingScreen from '@/components/LoadingScreen';
import MessageInput from '@/components/MessageInput';
import { useAuth } from '@/context/AuthContext';
import { useSidebarContext } from '@/context/SidebarContext';
import { addMessageToNewConversation } from '@/store/conversation/conversationSlice';
import { useAppDispatch } from '@/store/hooks';

export default function Chat() {
  const router = useRouter();
  const { isOpen } = useSidebarContext();
  const { isLoading } = useAuth();
  const dispatch = useAppDispatch();

  const handleSendMessage = async (messageText: string) => {
    try {
      const data = await dispatch(addMessageToNewConversation(messageText));
      const newConversationId = data.payload;

      router.push(`/chat/${newConversationId}`);
    } catch (error) {
      console.error('Failed to send message', error);
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div
      className={`flex h-screen max-h-screen overflow-y-auto duration-500 ease-in-out ${isOpen ? 'ml-[270px]' : 'ml-0'} flex-col items-center justify-end py-6`}
    >
      <div className="flex h-full w-[60%] flex-col items-center justify-center">
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}
