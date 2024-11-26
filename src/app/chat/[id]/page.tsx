'use client';

import ConversationMessages from '@/components/ConversationMessages';
import LoadingScreen from '@/components/LoadingScreen';
import ConversationInput from '@/components/MessageInput';
import { useAuth } from '@/context/AuthContext';
import { useSidebarContext } from '@/context/SidebarContext';
import { addMessage } from '@/store/conversation/conversationSlice';
import { useAppSelector, useAppDispatch } from '@/store/hooks';

type ChatParams = {
  params: {
    id: string;
  };
};

export default function Chat({ params: { id } }: ChatParams) {
  const { isOpen } = useSidebarContext();
  const messages = useAppSelector(
    state => state.conversation.conversations[id].messages,
  );
  const dispatch = useAppDispatch();
  const { isLoading } = useAuth();

  const handleSendMessage = (messageText: string) => {
    dispatch(addMessage({ conversationId: id, message: messageText }));
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div
      className={`flex h-screen max-h-screen overflow-y-auto duration-500 ease-in-out ${isOpen ? 'ml-[270px]' : 'ml-0'} flex-col items-center justify-end py-6`}
    >
      <div className="flex h-full w-[70%] flex-col items-center justify-between">
        <div className="w-full flex-grow overflow-y-auto">
          <ConversationMessages messages={messages} />
        </div>

        <div className="w-full">
          <ConversationInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
}
