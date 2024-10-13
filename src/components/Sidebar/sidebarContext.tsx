'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type SidebarContextType = {
  isOpen: boolean;
  toggleSidebar: () => void;
  isHistoryOpen: boolean;
  toggleHistoryOpen: () => void;
  numberOfConversations: number;
  setNumberOfConversations: (value: number) => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [numberOfConversations, setNumberOfConversations] = useState(8);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleHistoryOpen = () => {
    setIsHistoryOpen(!isHistoryOpen);
  };

  return (
    <SidebarContext.Provider
      value={{
        isOpen,
        toggleSidebar,
        isHistoryOpen,
        toggleHistoryOpen,
        numberOfConversations,
        setNumberOfConversations,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

// trigger error if useSidebar is used outside of SidebarProvider
export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }

  return context;
};
