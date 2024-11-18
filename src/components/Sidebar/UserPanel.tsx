'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Session } from 'next-auth';

import { logout } from '@/services/authService';

import Button from '@/components/Button';

import {
  IoSettingsOutline,
  IoLogOutOutline,
  IoSparklesOutline,
} from 'react-icons/io5';
import { FaRegCircleUser } from 'react-icons/fa6';

interface UserPanelProps {
  session: Session | null;
}

const UserPanel = ({ session }: UserPanelProps) => {
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

  if (!session) {
    return null;
  }

  return (
    <>
      <div className="relative mb-4" ref={menuRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center gap-3 rounded-md p-2 transition-colors duration-200 hover:bg-green-house-900"
        >
          <FaRegCircleUser className="text-2xl text-light-green-50" />
          <div className="flex flex-col items-start text-light-green-50">
            <p className="text-sm font-bold">{session.user.username}</p>
            <p className="text-xs">Plano gratuito</p>
          </div>
        </button>

        {isOpen && (
          <div className="absolute bottom-full z-10 w-full rounded-md bg-green-house-800 p-2 shadow-lg">
            <div className="flex items-center gap-3 pl-2">
              <div className="flex flex-col items-start text-light-green-50">
                <p className="text-sm font-bold">{session.user.username}</p>
                <p className="text-sm">{session.user.email}</p>
              </div>
            </div>

            <div className="my-2 w-full border-t border-light-green-50"></div>

            <Button
              icon={
                <IoSparklesOutline className="text-xl text-light-green-50" />
              }
              text="Atualizar plano"
              onClick={() => console.log('Atualizar plano')}
            />

            <Button
              icon={
                <IoSettingsOutline className="text-xl text-light-green-50" />
              }
              text="Definições"
              onClick={() => router.push('/definicoes')}
            />

            <div className="my-2 w-full border-t border-light-green-50"></div>

            <Button
              icon={<IoLogOutOutline className="text-xl text-light-green-50" />}
              text="Terminar sessão"
              onClick={() => logout()}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default UserPanel;
