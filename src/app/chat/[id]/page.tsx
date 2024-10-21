'use client';

import { useAppSelector, useAppDispatch } from '@/state/hooks';
import { addLocalMessage } from '@/state/conversation/conversationSlice';

import { useSidebarContext } from '@/components/Sidebar/sidebarContext';
import ConversationMessages from '@/components/ConversationMessages';
import ConversationInput from '@/components/MessageInput';

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

  const handleSendMessage = (messageText: string) => {
    dispatch(addLocalMessage({ conversationId: id, message: messageText }));
  };

  return (
    <div
      className={`flex h-screen max-h-screen overflow-y-auto duration-500 ease-in-out ${isOpen ? 'ml-[270px]' : 'ml-0'} flex-col items-center justify-end py-6`}
    >
      <div className="flex h-full w-[70%] flex-col items-center justify-between">
        <div className="flex-grow overflow-y-auto">
          <ConversationMessages messages={messages} />
        </div>

        <div className="w-full">
          <ConversationInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
}
