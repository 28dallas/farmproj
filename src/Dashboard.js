import React from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Filters from './components/Filters';
import Actions from './components/Actions';
import SummaryCards from './components/SummaryCards';
import Charts from './components/Charts';
import Projects from './components/Projects';
import { useSidebar } from './context/SidebarContext';

const Dashboard = () => {
  const { isOpen, toggleSidebar, currentView } = useSidebar();
  
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" 
          onClick={toggleSidebar}
        />
      )}
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          {currentView === 'Dashboard' && (
            <>
              <div className="flex justify-between items-start mb-6">
                <Filters />
                <Actions />
              </div>
              <SummaryCards />
              <Charts />
              <div className="mt-8">
                <Projects />
              </div>
            </>
          )}
          {currentView === 'Projects' && <Projects />}
          {currentView !== 'Dashboard' && currentView !== 'Projects' && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{currentView}</h2>
              <p className="text-gray-600">This section is coming soon...</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;