import React from 'react';
import { FiHome, FiGrid, FiFolder, FiDollarSign, FiTrendingUp, FiPackage, FiPieChart, FiCheckSquare, FiFileText, FiSettings } from 'react-icons/fi';
import { useSidebar } from '../context/SidebarContext';

const Sidebar = () => {
  const { isOpen, currentView, setCurrentView, isCollapsed } = useSidebar();
  
  const menuItems = [
    { icon: FiHome, label: 'Dashboard' },
    { icon: FiGrid, label: 'Crops' },
    { icon: FiFolder, label: 'Projects' },
    { icon: FiDollarSign, label: 'Expenses' },
    { icon: FiTrendingUp, label: 'Income' },
    { icon: FiPackage, label: 'Inventory' },
    { icon: FiPieChart, label: 'Finance' },
    { icon: FiCheckSquare, label: 'Tasks' },
    { icon: FiFileText, label: 'Reports' },
    { icon: FiSettings, label: 'Settings' }
  ];

  return (
    <div className={`fixed lg:static inset-y-0 left-0 z-50 ${isCollapsed ? 'w-16' : 'w-64'} bg-white shadow-lg h-screen transform transition-all duration-300 ease-in-out ${
      isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    }`}>
      <div className="p-6">
        <h2 className={`text-xl font-bold text-gray-800 ${isCollapsed ? 'hidden' : 'block'}`}>Farm Manager</h2>
        {isCollapsed && <div className="text-center text-2xl">🌾</div>}
      </div>
      <nav className="mt-6">
        {menuItems.map((item, index) => (
          <button 
            key={index} 
            onClick={() => setCurrentView(item.label)}
            className={`w-full flex items-center ${isCollapsed ? 'px-4 justify-center' : 'px-6'} py-3 text-left hover:bg-gray-100 ${
              currentView === item.label ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-gray-700'
            }`}
            title={isCollapsed ? item.label : ''}
          >
            <item.icon className={`w-5 h-5 ${isCollapsed ? '' : 'mr-3'}`} />
            {!isCollapsed && item.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;