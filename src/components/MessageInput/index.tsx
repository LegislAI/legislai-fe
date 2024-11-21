'use client';

import { useEffect, useRef, useState } from 'react';

import { IoSend } from 'react-icons/io5';

type MessageInputProps = {
  onSendMessage: (message: string) => void;
};

const MessageInput = ({ onSendMessage }: MessageInputProps) => {
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
    <div className="relative flex w-full gap-4 rounded-2xl shadow-lg">
      <textarea
        ref={textareaRef}
        className="w-full resize-none rounded-2xl bg-deep-sea-900 py-4 pl-6 pr-16 text-sm text-gray-200 placeholder-gray-300 outline-none placeholder:text-sm"
        rows={1}
        placeholder="Escreva uma mensagem..."
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      ></textarea>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2"
        onClick={handleSubmit}
      >
        <IoSend
          className={`text-2xl ${inputValue ? 'text-gray-200' : 'cursor-default text-gray-300'} hover:text-gray-400`}
        />
      </button>
    </div>
  );
};

export default MessageInput;
