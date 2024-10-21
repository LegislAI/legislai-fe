'use client';

import { useRef, useEffect } from 'react';

import Image from 'next/image';

import { Message } from '@/types';

type ChatProps = {
  messages: Message[];
};

const ConversationMessages = ({ messages }: ChatProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="flex h-full w-full flex-col gap-6 overflow-y-auto px-6">
      {messages.map(message => (
        <div
          key={message.messageId}
          className={`flex items-center ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
        >
          <div
            className={`flex ${message.sender === 'user' ? 'flex-row-reverse items-end' : 'flex-row'} h-full gap-1`}
          >
            <div className="relative h-10 w-10 flex-shrink-0 rounded-full">
              <Image
                src={message.sender === 'user' ? '/user.svg' : '/avatar.svg'}
                alt={message.sender}
                fill
                className="rounded-full object-cover"
              />
            </div>

            {message.sender === 'user' ? (
              <div className="chat chat-end">
                <div className="chat-bubble bg-green-800/90 px-4 py-2 text-gray-100">
                  {message.message}
                </div>
              </div>
            ) : (
              <div className="max-w-[80%] px-2 py-2">
                <span>{message.message}</span>
              </div>
            )}
          </div>
        </div>
      ))}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default ConversationMessages;
