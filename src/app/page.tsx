'use client';

import { useEffect, useState } from 'react';

import { unwrapResult } from '@reduxjs/toolkit';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

import Greeting from '@/components/Greeting';
import LoadingScreen from '@/components/LoadingScreen';
import MessageInput from '@/components/MessageInput';
import { useAuth } from '@/context/AuthContext';
import { useSidebarContext } from '@/context/SidebarContext';
import data from '@/data/conversations.json';
import { loadConversations } from '@/store/conversation/conversationSlice';
import { addMessageToNewConversationThunk } from '@/store/conversation/conversationSlice';
import { useAppDispatch } from '@/store/hooks';
import { FileInfo } from '@/types';
import { transformConversation } from '@/utils/transformer';

export default function HomePage() {
  const router = useRouter();
  const { isOpen } = useSidebarContext();
  const { user, isLoading } = useAuth();
  const dispatch = useAppDispatch();

  const [isSubtitleVisible, setIsSubtitleVisible] = useState(false);
  const [isMessageInputVisible, setIsMessageInputVisible] = useState(false);

  const handleSendMessage = async (
    messageText: string,
    attachments: FileInfo[],
  ) => {
    try {
      const action = await dispatch(
        addMessageToNewConversationThunk({
          message: messageText,
          attachments: attachments,
        }),
      );

      const newConversationId = unwrapResult(action);

      router.push(`/chat/${newConversationId}`);
    } catch (error) {
      console.error('Failed to send message', error);
    }
  };

  const handleGreetingComplete = () => {
    setTimeout(() => {
      setIsSubtitleVisible(true);

      setTimeout(() => {
        setIsMessageInputVisible(true);
      }, 1000);
    }, 500);
  };

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
      <div className="flex w-full flex-col items-center justify-center gap-14 text-gray-100">
        <div className="flex w-full flex-col items-center gap-2">
          <Greeting
            username={user.username}
            onAnimationComplete={handleGreetingComplete}
          />

          <AnimatePresence>
            {isSubtitleVisible && (
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.5,
                  type: 'spring',
                  stiffness: 40,
                }}
                className="text-2xl"
              >
                Como posso ajudá-lo?
              </motion.h1>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {isMessageInputVisible && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{
                duration: 1,
                type: 'spring',
                stiffness: 30,
                damping: 8,
              }}
              className="flex w-[60%] flex-col items-center justify-start"
            >
              <MessageInput onSendMessage={handleSendMessage} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
