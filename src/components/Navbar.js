import React from 'react';
import { FiMenu, FiSearch, FiUser } from 'react-icons/fi';
import { useSidebar } from '../context/SidebarContext';

const Navbar = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <div className="bg-white shadow-sm border-b px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <FiMenu className="w-6 h-6 text-gray-600 mr-4 cursor-pointer" onClick={toggleSidebar} />
          <h1 className="text-xl font-semibold text-gray-800">Farm Dashboard</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <FiUser className="w-4 h-4 text-white" />
            </div>
            <span className="text-gray-700 font-medium">Paul Gichuki</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;