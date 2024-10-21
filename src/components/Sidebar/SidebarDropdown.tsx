'use client';

import './sidebar.css';
import {
  ReactNode,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { Tooltip } from 'react-tooltip';
import { useSidebarContext } from './sidebarContext';

import { Conversation } from '@/types';

import {
  IoCaretDown,
  IoCaretUp,
  IoEllipsisHorizontalSharp,
  IoFilter,
  IoTrashOutline,
} from 'react-icons/io5';
import { CiEdit } from 'react-icons/ci';
import { useAppSelector } from '@/state/hooks';

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
    activeConversation,
    changeActiveConversation,
  } = useSidebarContext();
  const pathname = usePathname();

  const conversationsRaw = useAppSelector(
    state => state.conversation.conversations,
  );

  const conversations = useMemo(
    () =>
      Object.values(conversationsRaw).map((conversation: Conversation) => ({
        conversation_id: conversation.conversationId,
        conversation_name: conversation.conversationName,
      })),
    [conversationsRaw],
  );

  const [localConversations, setLocalConversations] = useState(
    conversations.slice(0, numberOfConversations),
  );
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setLocalConversations(conversations.slice(0, numberOfConversations));
  }, [conversations, numberOfConversations]);

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

  useEffect(() => {
    const conversationId = pathname.split('/').pop();

    if (conversationId) {
      changeActiveConversation(conversationId);
    } else {
      changeActiveConversation(undefined);
    }
  }, [changeActiveConversation, pathname]);

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
        <div className="sidebar flex max-h-[400px] flex-col gap-0.5 overflow-y-auto pb-2">
          {localConversations.map(conversation => (
            <Link
              key={conversation.conversation_id}
              href={`/chat/${conversation.conversation_id}`}
            >
              <div
                className={`group relative flex w-full flex-row items-center justify-between rounded-md p-2 hover:bg-mine-shaft-700 ${openMenuId === conversation.conversation_id || activeConversation == conversation.conversation_id ? 'bg-mine-shaft-700' : ''}`}
                data-tooltip-id={`tooltip-${conversation.conversation_id}`}
                data-tooltip-content={conversation.conversation_name}
                data-tooltip-delay-show={1000}
              >
                <div className="flex w-full max-w-[100%] flex-row items-center gap-2 overflow-hidden pl-6">
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
                  className="absolute right-1 rounded-md p-2 opacity-0 group-hover:bg-mine-shaft-700 group-hover:opacity-100"
                >
                  <IoEllipsisHorizontalSharp className="text-lg text-gray-100 opacity-40 hover:opacity-100" />
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
              <Tooltip id={`tooltip-${conversation.conversation_id}`} />
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
