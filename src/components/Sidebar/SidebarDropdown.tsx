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

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CiEdit } from 'react-icons/ci';
import {
  IoCaretDown,
  IoCaretUp,
  IoEllipsisHorizontalSharp,
  IoFilter,
  IoTrashOutline,
} from 'react-icons/io5';
import { Tooltip } from 'react-tooltip';

import { useAppSelector } from '@/store/hooks';
import { Conversation } from '@/types';

import { useSidebarContext } from './sidebarContext';

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
      Object.values(conversationsRaw)
        .slice() // clone array
        .sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
        )
        .map((conversation: Conversation) => ({
          conversation_id: conversation.conversationId,
          conversation_name: conversation.conversationName,
          conversation_field: conversation.conversationField,
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

    changeActiveConversation(conversationId || undefined);
  }, [changeActiveConversation, pathname]);

  const handleChangeName = (id: string) => {
    console.log('change name', id);
  };

  const handleRemoveConversation = (id: string) => {
    console.log('remove conversation', id);
  };

  return (
    <>
      <div className="flex w-full flex-row items-center justify-between rounded-md p-2 hover:bg-deep-sea-800">
        <Link href={url}>
          <div className="flex w-full flex-row items-center gap-2">
            {typeof icon === 'string' ? (
              <Image src={icon} alt="icon" width={22} height={22} />
            ) : isValidElement(icon) ? (
              icon
            ) : (
              <></>
            )}
            <span className="text-sm text-gray-100">{text}</span>
          </div>
        </Link>

        {isHistoryOpen ? (
          <button onClick={toggleHistoryOpen}>
            <IoCaretUp className="rounded-md text-xl text-gray-100" />
          </button>
        ) : (
          <button onClick={toggleHistoryOpen}>
            <IoCaretDown className="rounded-md text-xl text-gray-100" />
          </button>
        )}
      </div>

      {isHistoryOpen && (
        <div className="sidebar flex max-h-[450px] flex-col gap-1 overflow-y-auto pb-2">
          {localConversations.map(conversation => (
            <Link
              key={conversation.conversation_id}
              href={`/chat/${conversation.conversation_id}`}
            >
              <div
                className={`group relative flex w-full flex-row items-center justify-between rounded-md px-2 py-1 hover:bg-deep-sea-800 ${openMenuId === conversation.conversation_id || activeConversation == conversation.conversation_id ? 'bg-deep-sea-800' : ''}`}
                data-tooltip-id={`tooltip-${conversation.conversation_id}`}
                data-tooltip-content={conversation.conversation_name}
                data-tooltip-delay-show={1000}
              >
                <div className="flex w-full max-w-[100%] flex-col items-start gap-[1px] overflow-hidden pl-4">
                  <span className="text-xxs text-gray-300">
                    {conversation.conversation_field}
                  </span>
                  <span className="text-clip whitespace-nowrap text-xs">
                    {conversation.conversation_name}
                  </span>
                </div>

                <button
                  onClick={e => {
                    e.stopPropagation();
                    e.preventDefault();
                    toggleMenu(conversation.conversation_id);
                  }}
                  className="absolute right-1 rounded-md p-2 opacity-0 group-hover:bg-deep-sea-800 group-hover:opacity-100"
                >
                  <IoEllipsisHorizontalSharp className="text-lg text-gray-100 opacity-40 hover:opacity-100" />
                </button>
                {openMenuId === conversation.conversation_id && (
                  <div
                    ref={menuRef}
                    className="absolute right-0 top-full z-50 rounded-xl bg-deep-sea-700 p-1 shadow-lg"
                  >
                    <button
                      onClick={() =>
                        handleChangeName(conversation.conversation_id)
                      }
                      className="flex w-full items-center gap-2 p-2 hover:rounded-xl hover:bg-deep-sea-600"
                    >
                      <CiEdit className="text-lg text-gray-100" />
                      <span className="text-xs">Editar nome</span>
                    </button>

                    <button
                      onClick={() =>
                        handleRemoveConversation(conversation.conversation_id)
                      }
                      className="flex w-full items-center gap-2 p-2 hover:rounded-xl hover:bg-deep-sea-600"
                    >
                      <IoTrashOutline className="text-lg text-gray-100" />
                      <span className="text-xs">Remover</span>
                    </button>
                  </div>
                )}
              </div>
              <Tooltip id={`tooltip-${conversation.conversation_id}`} />
            </Link>
          ))}
          {numberOfConversations < conversations.length && (
            <div className="mt-1 flex w-full flex-col items-center">
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
