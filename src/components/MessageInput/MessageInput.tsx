'use client';

import { useEffect, useRef, useState, ChangeEvent } from 'react';

import { FiPaperclip } from 'react-icons/fi';
import { IoSend } from 'react-icons/io5';

import { useAuth } from '@/context/AuthContext';
import { FileInfo } from '@/types/conversations';

import { ImageInput, DocumentInput } from './FileInput';

interface MessageInputProps {
  onSendMessage: (message: string, attachments: FileInfo[]) => void;
}

const MessageInput = ({ onSendMessage }: MessageInputProps) => {
  const { user } = useAuth();
  const [inputValue, setInputValue] = useState('');
  const [files, setFiles] = useState<FileInfo[]>([]);
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
      onSendMessage(inputValue, files.length > 0 ? files : []);
      setFiles([]);
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
    if (!e.target.files || !e.target.files[0]) return;

    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        const newFile: FileInfo = {
          name: file.name,
          type: file.type,
          value: reader.result,
        };
        setFiles(prev => [...prev, newFile]);
      }
    };

    reader.onerror = error => {
      console.error('Error reading file:', error);
    };
  };

  const handleRemoveFile = (file: FileInfo) => {
    setFiles(prev => prev.filter(f => f !== file));
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [inputValue]);

  return (
    <div className="flex w-full flex-col">
      <div
        className={`w-full ${files.length > 0 ? 'rounded-2xl bg-deep-sea-900/50 pt-2' : ''}`}
      >
        {files.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {files.map((file, index) => (
              <div key={index} className="flex items-center">
                {file.type.includes('image') ? (
                  <ImageInput
                    file={file}
                    removeFileHandler={(file: FileInfo) =>
                      handleRemoveFile(file)
                    }
                  />
                ) : (
                  <DocumentInput
                    file={file}
                    removeFileHandler={(file: FileInfo) =>
                      handleRemoveFile(file)
                    }
                  />
                )}
              </div>
            ))}
          </div>
        )}
        <div className="relative flex w-full gap-4 rounded-2xl bg-deep-sea-900 shadow-lg">
          {user && user.plan === 'premium_plus' && (
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2"
              onClick={handleFileUpload}
            >
              <FiPaperclip className="cursor-pointer text-xl text-gray-300 hover:text-gray-400" />
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={e => handleFileChange(e)}
              />
            </button>
          )}
          <textarea
            ref={textareaRef}
            className={`w-full resize-none rounded-2xl bg-transparent py-4 ${user && user.plan === 'premium_plus' ? 'pl-14' : 'pl-6'} pr-16 text-sm text-gray-200 placeholder-gray-300 outline-none placeholder:text-sm`}
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
