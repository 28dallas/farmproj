import React from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Filters from './components/Filters';
import Actions from './components/Actions';
import SummaryCards from './components/SummaryCards';
import Charts from './components/Charts';
import Projects from './components/Projects';
import Crops from './components/Crops';
import Income from './components/Income';
import Inventory from './components/Inventory';
import ExpensesReport from './components/ExpensesReport';
import CashFlow from './components/CashFlow';
import Reports from './components/Reports';
import Settings from './components/Settings';
import FinanceTab from './components/FinanceTab';
import { useSidebar } from './context/SidebarContext';

const Dashboard = ({ user, onLogout }) => {
  const { isOpen, toggleSidebar, currentView, isCollapsed, setIsCollapsed } = useSidebar();

  const handleMainClick = () => {
    if (!isCollapsed) {
      setIsCollapsed(true);
    }
  };

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
        <Navbar user={user} onLogout={onLogout} />

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6" onClick={handleMainClick}>
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
          {currentView === 'Crops' && <Crops />}
          {currentView === 'Income' && <Income />}
          {currentView === 'Inventory' && <Inventory />}
          {currentView === 'Expenses' && <ExpensesReport />}
          {/* Removed incorrect require() usage. Only <FinanceTab /> remains. */}
          {currentView === 'Finance' && <FinanceTab />}
          {currentView === 'Reports' && <Reports />}
          {currentView === 'Settings' && <Settings />}
          {!['Dashboard', 'Projects', 'Expenses', 'Finance', 'Reports', 'Settings'].includes(currentView) && (
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