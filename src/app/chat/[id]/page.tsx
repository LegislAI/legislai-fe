'use client';

import { useEffect, useState } from 'react';

import { toast } from 'react-toastify';

import ConversationMessages from '@/components/ConversationMessages';
import LoadingScreen from '@/components/LoadingScreen';
import MessageInput from '@/components/MessageInput';
import { useAuth } from '@/context/AuthContext';
import { useSidebarContext } from '@/context/SidebarContext';
import {
  sendMessageToRagApi,
  clearError,
} from '@/store/conversation/conversationSlice';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { FileInfo } from '@/types/conversations';

type ConversationParams = {
  params: {
    id: string;
  };
};

export default function Conversation({ params: { id } }: ConversationParams) {
  const { isOpen, isHistoryOpen, toggleHistoryOpen } = useSidebarContext();
  const dispatch = useAppDispatch();
  const { isLoading } = useAuth();
  const [readyToSend, setReadyToSend] = useState(false);
  const [questionSent, setQuestionSent] = useState(false);

  const conversation = useAppSelector(
    state => state.conversation.conversations[id],
  );
  const loading = useAppSelector(
    state => state.conversation.conversations[id].loading,
  );
  const error = useAppSelector(state => state.conversation.error);
  const isNewConversation = useAppSelector(
    state => state.conversation.conversations[id].isNewConversation,
  );

  useEffect(() => {
    if (isNewConversation) {
      setReadyToSend(true);
    }
  }, [isNewConversation]);

  useEffect(() => {
    if (readyToSend && !questionSent) {
      if (!isHistoryOpen) {
        toggleHistoryOpen();
      }

      dispatch(
        sendMessageToRagApi({
          conversationId: id,
          question:
            conversation.messages[conversation.messages.length - 2].message,
          isNewConversation: true,
        }),
      );
      setQuestionSent(true);
    }
  }, [
    conversation.messages,
    dispatch,
    id,
    isHistoryOpen,
    questionSent,
    readyToSend,
    toggleHistoryOpen,
  ]);

  const handleSendMessage = async (
    messageText: string,
    attachments: FileInfo[],
  ) => {
    // dispatch(addMessage({ conversationId: id, message: messageText }));
    await dispatch(
      sendMessageToRagApi({
        conversationId: id,
        question: messageText,
        attachments: attachments || [],
        isNewConversation: false,
      }),
    );
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [dispatch, error]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div
      className={`flex h-screen max-h-screen overflow-y-auto duration-500 ease-in-out ${isOpen ? 'ml-[270px]' : 'ml-0'} flex-col items-center justify-end py-6`}
    >
      <div className="flex h-full w-[70%] flex-col items-center justify-between">
        <div className="w-full flex-grow overflow-y-auto">
          <ConversationMessages
            messages={conversation.messages}
            loading={loading}
          />
        </div>

        <div className="w-full">
          <MessageInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
}
