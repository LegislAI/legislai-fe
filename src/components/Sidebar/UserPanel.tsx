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
import { logout } from '@/services/authService';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchUserInfo } from '@/store/user/userSlice';

const UserPanel = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

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

  const { email, username, plan, isLoading, error } = useAppSelector(
    state => state.user,
  );

  if (isLoading || error) {
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
            <p className="text-sm font-bold">{username}</p>
            <p className="text-xs">{plan}</p>
          </div>
        </button>

        {isOpen && (
          <div className="absolute bottom-full z-10 w-full rounded-md bg-deep-sea-700 p-2 shadow-lg">
            <div className="flex items-center gap-3 pl-2">
              <div className="flex flex-col items-start text-gray-100">
                <p className="text-sm font-bold">{username}</p>
                <p className="text-sm">{email}</p>
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
              onClick={() => logout()}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default UserPanel;
