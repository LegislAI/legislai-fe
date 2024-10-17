'use client';

import { useEffect, useState } from 'react';

import { Conversation } from '@/types/chat';
import { transformConversation } from '@/utils/transformer';

import data from '@/data/conversations.json';

type ChatProps = {
  conversationId: string;
};

const ChatComponent = ({ conversationId }: ChatProps) => {
  const [conversation, setConversation] = useState<Conversation | null>(null);

  useEffect(() => {
    if (conversationId) {
      const selectedConversation = data.find(
        conversation => conversation.conversation_id === conversationId,
      );

      if (selectedConversation) {
        const conversationWithTimestamps = {
          ...selectedConversation,
          created_at: selectedConversation.messages[0].timestamp,
          updated_at: selectedConversation.messages[0].timestamp,
          messages: selectedConversation.messages.map(message => ({
            ...message,
            created_at: message.timestamp,
            attachments: message.attachments || [],
          })),
        };

        setConversation(transformConversation(conversationWithTimestamps));
      }
    }
  }, [conversationId]);

  if (!conversation) {
    return <div>Loading...</div>;
  }

  return <div></div>;
};

export default ChatComponent;
