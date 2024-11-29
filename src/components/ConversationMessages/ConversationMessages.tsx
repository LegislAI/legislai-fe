'use client';

import { useRef, useEffect } from 'react';

import Image from 'next/image';
import { FaCircleUser } from 'react-icons/fa6';

import MarkdownRenderer from '@/components/MarkdownRenderer';
import Thinking from '@/components/Thinking';
import { Message } from '@/types';

import AttachmentRenderer from './AttachmentRenderer';

type ChatProps = {
  messages: Message[];
  loading: string;
};

const ConversationMessages = ({ messages, loading }: ChatProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="flex h-full w-full flex-col gap-4 overflow-y-auto px-6">
      {messages.map(message => (
        <div
          key={message.messageIndex}
          className={`flex w-full items-center ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
        >
          <div
            className={`flex ${message.sender === 'user' ? 'flex-row-reverse items-end' : 'flex-row'} h-full w-full gap-2`}
          >
            <div className="relative h-8 w-8 flex-shrink-0 rounded-full">
              {message.sender === 'user' ? (
                <FaCircleUser className="text-3xl text-gray-200" />
              ) : (
                <Image
                  src="/avatar.svg"
                  alt={message.sender}
                  fill
                  className="rounded-full object-cover"
                />
              )}
            </div>

            {message.sender === 'user' ? (
              <div className="chat chat-end w-full max-w-[60%]">
                <div className="chat-bubble flex w-full flex-col bg-deep-sea-800 px-4 py-2">
                  <div className="flex w-full flex-col gap-3">
                    {message.attachments.map((attachment, index) => (
                      <AttachmentRenderer key={index} {...attachment} />
                    ))}
                  </div>

                  <MarkdownRenderer
                    content={message.message}
                    className="mt-2 text-gray-200"
                  />
                </div>
              </div>
            ) : (
              <div className="max-w-[80%] pl-2">
                {message.messageIndex === loading ? (
                  <Thinking text="A analisar a sua pergunta ..." />
                ) : (
                  <MarkdownRenderer
                    content={message.message}
                    className="text-gray-200"
                  />
                )}
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
