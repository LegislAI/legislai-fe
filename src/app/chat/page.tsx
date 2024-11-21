'use client';

import { useRouter } from 'next/navigation';

import { useAppDispatch } from '@/state/hooks';
import { addMessageToNewConversation } from '@/state/conversation/conversationSlice';

import { useSidebarContext } from '@/components/Sidebar/sidebarContext';
import MessageInput from '@/components/MessageInput';

export default function Chat() {
  const router = useRouter();
  const { isOpen } = useSidebarContext();
  const dispatch = useAppDispatch();

  let newConversationId = '';

  const handleSendMessage = (messageText: string) => {
    try {
      const data = dispatch(addMessageToNewConversation(messageText));
      newConversationId = data.payload;
    } catch (error) {
      console.error('Failed to send message', error);
    } finally {
      console.log('newConversationId', newConversationId);
      router.push(`/chat/${newConversationId}`);
    }
  };

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
