'use client';

import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useSidebarContext } from './sidebarContext';

import SidebarButton from './SidebarButton';
import SidebarDropdown from './SidebarDropdown';
import UserPanel from './UserPanel';

import { PUBLIC_ROUTES } from '@/lib/routes';

import {
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarLeftExpand,
} from 'react-icons/tb';
import { IoHomeOutline } from 'react-icons/io5';

const SideBar = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const { isOpen, toggleSidebar } = useSidebarContext();
  const isPublicRoute = PUBLIC_ROUTES.some(route => pathname.startsWith(route));

  if (isPublicRoute) {
    return null;
  }

  return (
    <>
      <button
        onClick={toggleSidebar}
        className={`fixed left-4 top-4 z-50 text-white transition-transform duration-500 ${
          isOpen ? 'hidden' : 'block'
        }`}
      >
        <TbLayoutSidebarLeftExpand className="h-8 w-8 text-gray-100" />
      </button>

      <div
        className={`fixed left-0 top-0 h-screen w-[270px] bg-green-house-950 transition-transform duration-500 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          boxShadow: '2px 0 15px rgba(0, 0, 0, 0.3)',
        }}
      >
        <button
          onClick={toggleSidebar}
          className="absolute left-4 top-4 z-50 text-white transition-transform duration-500"
        >
          <TbLayoutSidebarLeftCollapse className="h-8 w-8 text-gray-100" />
        </button>

        <div className="flex h-full w-full flex-col justify-between px-4 text-gray-100">
          <div>
            <h1 className="mb-6 mt-12 text-center text-3xl font-bold">
              LegislAI
            </h1>
            <div className="flex w-full flex-col gap-1">
              <SidebarButton
                icon={<IoHomeOutline className="text-xl" />}
                text="Página Inicial"
                url="/"
              />
              <SidebarDropdown
                icon="/avatar.svg"
                text="Assistente Jurídico"
                url="/chat"
              />
            </div>
          </div>

          <UserPanel session={session} />
        </div>
      </div>
    </>
  );
};

export default SideBar;
