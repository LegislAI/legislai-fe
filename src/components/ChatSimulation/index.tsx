import { useEffect, useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FaCircleUser } from 'react-icons/fa6';

import MarkdownRenderer from '@/components/MarkdownRenderer';
import Thinking from '@/components/Thinking';

type Message = {
  messageIndex: number;
  sender: 'user' | 'assistant';
  message: string;
  image?: string;
};

const ChatSimulation = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      messageIndex: 1,
      sender: 'user',
      message: 'Os trabalhadores estudantes têm direito a férias?',
    },
  ]);
  const [isThinking, setIsThinking] = useState(false);
  const [assistantResponse, setAssistantResponse] = useState<Message | null>(
    null,
  );

  useEffect(() => {
    if (messages.length === 1) {
      const delayTimer = setTimeout(() => {
        setIsThinking(true);

        const thinkingTimer = setTimeout(() => {
          const response: Message = {
            messageIndex: 2,
            sender: 'assistant',
            message:
              'Sim, os trabalhadores estudantes têm direito a férias. De acordo com o **Artigo 92.º**, o trabalhador-estudante tem direito a marcar o período de férias de acordo com as suas necessidades escolares, podendo gozar até **15 dias** de férias interpoladas, na medida em que tal seja compatível com as exigências imperiosas do funcionamento da empresa.',
          };

          setAssistantResponse(response);
          setIsThinking(false);
        }, 3000);

        return () => {
          clearTimeout(delayTimer);
          clearTimeout(thinkingTimer);
        };
      }, 500);
    }

    if (messages.length === 2 && messages[1].sender === 'assistant') {
      const newUserMessage: Message = {
        messageIndex: 3,
        sender: 'user',
        message: 'Podes me dizer de que se trata o seguinte documento?',
        image: '/document-example.png',
      };

      setMessages(prev => [...prev, newUserMessage]);

      // Simulate image response
      const simulatedImageResponse: Message = {
        messageIndex: 4,
        sender: 'assistant',
        message:
          'Este parece ser um documento oficial. Infelizmente, não consigo ler o conteúdo específico da imagem.',
      };

      // Simulate thinking and response
      setTimeout(() => {
        setIsThinking(true);
        setTimeout(() => {
          setIsThinking(false);
          setMessages(prev => [...prev, simulatedImageResponse]);
        }, 3000);
      }, 500);
    }
  }, [messages, messages.length]);

  useEffect(() => {
    if (assistantResponse) {
      setMessages(prev => [...prev, assistantResponse]);
    }
  }, [assistantResponse]);

  return (
    <div className="mx-auto flex h-full w-full max-w-2xl flex-col overflow-hidden">
      <div className="flex-grow space-y-4 overflow-y-auto px-6 py-10">
        <AnimatePresence>
          {messages.map(message => (
            <motion.div
              key={message.messageIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex w-full items-center ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`flex ${message.sender === 'user' ? 'flex-row-reverse gap-3' : 'flex-row'} w-full items-end`}
              >
                <div className="h-8 w-8 flex-shrink-0">
                  {message.sender === 'user' ? (
                    <FaCircleUser className="text-3xl text-gray-200" />
                  ) : (
                    <Image
                      src="/avatar.svg"
                      alt="Assistant"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  )}
                </div>

                <div
                  className={`max-w-[80%] ${message.sender === 'user' ? 'bg-deep-sea-900 px-4 py-3' : 'px-2'} mb-3 rounded-xl text-gray-200`}
                >
                  {message.sender === 'user' ? (
                    <>
                      {message.image && (
                        <div className="max-w-full overflow-hidden rounded-lg">
                          <Image
                            src={message.image}
                            alt="image"
                            width={80}
                            height={100}
                            objectFit="cover"
                            className="mt-1 rounded-lg"
                          />
                        </div>
                      )}
                      <MarkdownRenderer
                        content={message.message}
                        className={`text-gray-200 ${message.image ? 'mt-3' : ''}`}
                      />
                    </>
                  ) : (
                    <div className="max-w-[80%] pl-2">
                      {isThinking ? (
                        <Thinking text="A analisar a sua pergunta ..." />
                      ) : (
                        <>
                          <MarkdownRenderer
                            content={message.message}
                            className="text-gray-200"
                          />
                          {message.image && (
                            <Image
                              src={message.image}
                              alt="Assistant response image"
                              width={300}
                              height={200}
                              className="mt-2 rounded-lg"
                            />
                          )}
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
          {isThinking && (
            <motion.div
              key="thinking"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex w-full items-center justify-start"
            >
              <div className="flex w-full flex-row items-end gap-3">
                <Image
                  src="/avatar.svg"
                  alt="Assistant"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <div className="max-w-[80%] rounded-xl px-4 py-3 text-gray-200">
                  <Thinking text="A analisar a sua pergunta ..." />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ChatSimulation;
