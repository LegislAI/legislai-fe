import { ReactNode, isValidElement, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSidebarContext } from './sidebarContext';

import {
  IoCaretDown,
  IoCaretUp,
  IoEllipsisHorizontalSharp,
  IoFilter,
  IoTrashOutline,
} from 'react-icons/io5';
import { CiEdit } from 'react-icons/ci';

import conversations from '@/data/conversations.json';

type SidebarDropdownProps = {
  icon: ReactNode | string;
  text: string;
  url: string;
};

const SidebarDropdown = ({ icon, text, url }: SidebarDropdownProps) => {
  const {
    isHistoryOpen,
    toggleHistoryOpen,
    numberOfConversations,
    setNumberOfConversations,
  } = useSidebarContext();

  const [localConversations, setLocalConversations] = useState(
    conversations.slice(0, numberOfConversations),
  );
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setLocalConversations(conversations.slice(0, numberOfConversations));
  }, [numberOfConversations]);

  const toggleMenu = (id: string) => {
    setOpenMenuId(prev => (prev === id ? null : id));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleChangeName = (id: string) => {
    console.log('change name', id);
  };

  const handleRemoveConversation = (id: string) => {
    console.log('remove conversation', id);
  };

  return (
    <>
      <Link href={url}>
        <div className="flex w-full flex-row items-center justify-between rounded-md p-2 hover:bg-mine-shaft-700">
          <div className="flex w-full flex-row items-center gap-2">
            {typeof icon === 'string' ? (
              <Image src={icon} alt="icon" width={24} height={24} />
            ) : isValidElement(icon) ? (
              icon
            ) : (
              <></>
            )}
            <span>{text}</span>
          </div>

          {isHistoryOpen ? (
            <IoCaretUp
              onClick={toggleHistoryOpen}
              className="rounded-md text-2xl text-gray-100 hover:bg-mine-shaft-600"
            />
          ) : (
            <IoCaretDown
              onClick={toggleHistoryOpen}
              className="rounded-md text-2xl text-gray-100 hover:bg-mine-shaft-600"
            />
          )}
        </div>
      </Link>

      {isHistoryOpen && (
        <div className="flex max-h-[400px] flex-col gap-0.5 overflow-y-auto pb-2">
          {localConversations.map(conversation => (
            <Link
              key={conversation.conversation_id}
              href={`/chat/${conversation.conversation_id}`}
            >
              <div
                className={`group relative flex w-full flex-row items-center justify-between rounded-md p-2 hover:bg-mine-shaft-700 ${openMenuId === conversation.conversation_id ? 'bg-mine-shaft-700' : ''}`}
              >
                <div className="flex w-full max-w-[90%] flex-row items-center gap-2 overflow-hidden pl-6">
                  <span className="text-clip whitespace-nowrap text-sm">
                    {conversation.conversation_name}
                  </span>
                </div>
                <button
                  onClick={e => {
                    e.stopPropagation();
                    e.preventDefault();
                    toggleMenu(conversation.conversation_id);
                  }}
                >
                  <IoEllipsisHorizontalSharp className="rounded-md text-gray-100 opacity-0 hover:!opacity-100 group-hover:opacity-40" />
                </button>
                {openMenuId === conversation.conversation_id && (
                  <div
                    ref={menuRef}
                    className="absolute right-0 top-full z-50 rounded-xl bg-mine-shaft-600 p-1 shadow-lg"
                  >
                    <button
                      onClick={() =>
                        handleChangeName(conversation.conversation_id)
                      }
                      className="flex w-full items-center gap-2 p-2 hover:rounded-xl hover:bg-mine-shaft-500"
                    >
                      <CiEdit className="text-xl text-gray-100" />
                      <span className="text-sm">Editar nome</span>
                    </button>

                    <button
                      onClick={() =>
                        handleRemoveConversation(conversation.conversation_id)
                      }
                      className="flex w-full items-center gap-2 p-2 hover:rounded-xl hover:bg-mine-shaft-500"
                    >
                      <IoTrashOutline className="text-xl text-gray-100" />
                      <span className="text-sm">Remover</span>
                    </button>
                  </div>
                )}
              </div>
            </Link>
          ))}
          {numberOfConversations < conversations.length && (
            <div className="flex w-full flex-col items-center">
              <button
                onClick={() =>
                  setNumberOfConversations(numberOfConversations + 8)
                }
              >
                <IoFilter className="text-2xl text-gray-100" />
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SidebarDropdown;
