'use client';

import { useSidebarContext } from './sidebarContext';
import {
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarLeftExpand,
} from 'react-icons/tb';
import {
  IoHomeOutline,
  IoSettingsOutline,
  IoSparklesOutline,
} from 'react-icons/io5';

import SidebarButton from './SidebarButton';
import SidebarDropdown from './SidebarDropdown';

const SideBar = () => {
  const { isOpen, toggleSidebar } = useSidebarContext();

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
        className={`fixed left-0 top-0 h-screen w-[270px] bg-gradient-to-tr from-dark-medium to-dark-light transition-transform duration-500 ease-in-out ${
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
            <h1 className="mb-8 mt-20 text-center text-5xl font-bold">
              LegislAI
            </h1>
            <div className="flex w-full flex-col gap-1">
              <SidebarButton
                icon={<IoHomeOutline className="text-2xl" />}
                text="Página Inicial"
                url="/"
              />
              <SidebarDropdown
                icon="/avatar.svg"
                text="Assistente Jurídico"
                url=""
              />
            </div>
          </div>

          <div className="mb-4">
            <SidebarButton
              icon={<IoSparklesOutline className="text-2xl" />}
              text="Sobre"
              url=""
            />
            <SidebarButton
              icon={<IoSettingsOutline className="text-2xl" />}
              text="Definições"
              url=""
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
