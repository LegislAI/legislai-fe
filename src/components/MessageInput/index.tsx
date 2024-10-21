'use client';

import { useEffect, useRef, useState } from 'react';

import { IoSend } from 'react-icons/io5';

type ConversationInputProps = {
  onSendMessage: (message: string) => void;
};

const ConversationInput = ({ onSendMessage }: ConversationInputProps) => {
  const [inputValue, setInputValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey && inputValue !== '') {
      event.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [inputValue]);

  return (
    <div className="flex w-full gap-4">
      <textarea
        ref={textareaRef}
        className="w-full resize-none rounded-2xl bg-dark-light px-8 py-4 text-white opacity-50 shadow-lg outline-none"
        rows={1}
        placeholder="Escreva uma mensagem..."
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      ></textarea>
      <button onClick={handleSubmit}>
        <IoSend className="text-3xl text-dark-light/90 hover:text-dark-medium" />
      </button>
    </div>
  );
};

export default ConversationInput;
