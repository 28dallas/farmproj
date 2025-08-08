import React, { createContext, useContext, useState } from 'react';

const SidebarContext = createContext();

export const useSidebar = () => useContext(SidebarContext);

export const SidebarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentView, setCurrentView] = useState('Dashboard');
  const toggleSidebar = () => setIsOpen(!isOpen);
  
  const handleViewChange = (view) => {
    setCurrentView(view);
    setIsCollapsed(false);
  };

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar, currentView, setCurrentView: handleViewChange, isCollapsed, setIsCollapsed }}>
      {children}
    </SidebarContext.Provider>
  );
};