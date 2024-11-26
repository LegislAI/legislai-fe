'use client';

import { useEffect, useRef, useState, ChangeEvent } from 'react';

import Image from 'next/image';
import { FaRegTimesCircle } from 'react-icons/fa';
import { FiPaperclip } from 'react-icons/fi';
import { IoSend } from 'react-icons/io5';

type MessageInputProps = {
  onSendMessage: (message: string) => void;
};

const MessageInput = ({ onSendMessage }: MessageInputProps) => {
  const [inputValue, setInputValue] = useState('');
  const [image, setImage] = useState<string | undefined>(undefined);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;

    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImage(reader.result);
      }
    };

    reader.onerror = error => {
      console.error('Error reading file:', error);
    };
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [inputValue]);

  return (
    <div className="flex w-full flex-col">
      <div
        className={`w-full ${image ? 'rounded-2xl bg-deep-sea-900/50 pt-3' : ''}`}
      >
        {image && (
          <button className="relative">
            <Image
              src={image}
              width={128}
              height={80}
              alt="uploaded image"
              className="mb-2 ml-3 cursor-default rounded-lg"
            />
            <FaRegTimesCircle
              className="absolute right-0.5 top-0.5 text-xl text-gray-300 hover:text-gray-400"
              onClick={() => setImage(undefined)}
            />
          </button>
        )}
        <div className="relative flex w-full gap-4 rounded-2xl bg-deep-sea-900 shadow-lg">
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2"
            onClick={handleFileUpload}
          >
            <FiPaperclip className="cursor-pointer text-xl text-gray-300 hover:text-gray-400" />
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={e => handleFileChange(e)}
            />
          </button>
          <textarea
            ref={textareaRef}
            className="w-full resize-none rounded-2xl bg-transparent py-4 pl-14 pr-16 text-sm text-gray-200 placeholder-gray-300 outline-none placeholder:text-sm"
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
              className={`text-xl ${inputValue ? 'text-gray-200' : 'cursor-default text-gray-300'} hover:text-gray-400`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageInput;
