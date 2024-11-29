'use client';

import { useState, useEffect, useRef } from 'react';

import { useRouter } from 'next/navigation';
import { FaRegCircleUser } from 'react-icons/fa6';
import {
  IoSettingsOutline,
  IoLogOutOutline,
  IoSparklesOutline,
} from 'react-icons/io5';

import Button from '@/components/Button';

interface UserPanelProps {
  userInfo: {
    username: string | undefined;
    email: string | undefined;
    plan: string | undefined;
  };
  handleLogout: () => void;
}

const UserPanel = ({ userInfo, handleLogout }: UserPanelProps) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!userInfo) {
    return null;
  }

  return (
    <>
      <div className="relative mb-4" ref={menuRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center gap-3 rounded-md p-2 transition-colors duration-200 hover:bg-deep-sea-800"
        >
          <FaRegCircleUser className="text-2xl text-gray-100" />
          <div className="flex flex-col items-start text-gray-100">
            <p className="text-sm font-bold">{userInfo.username}</p>
            <p className="text-xxs font-bold text-accent">{userInfo.plan}</p>
          </div>
        </button>

        {isOpen && (
          <div className="absolute bottom-full z-10 w-full rounded-md bg-deep-sea-700 p-2 shadow-lg">
            <div className="flex items-center gap-3 pl-2">
              <div className="flex flex-col items-start text-gray-100">
                <p className="text-sm font-bold">{userInfo.username}</p>
                <p className="text-sm">{userInfo.email}</p>
              </div>
            </div>

            <div className="my-2 w-full border-t border-gray-100"></div>

            <Button
              icon={<IoSparklesOutline className="text-xl text-gray-100" />}
              text="Atualizar plano"
              onClick={() => console.log('Atualizar plano')}
            />

            <Button
              icon={<IoSettingsOutline className="text-xl text-gray-100" />}
              text="Definições"
              onClick={() => router.push('/definicoes')}
            />

            <div className="my-2 w-full border-t border-gray-100"></div>

            <Button
              icon={<IoLogOutOutline className="text-xl text-gray-100" />}
              text="Terminar sessão"
              onClick={handleLogout}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default UserPanel;
