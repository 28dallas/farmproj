import React from 'react';
import Dashboard from './Dashboard';
import { SidebarProvider } from './context/SidebarContext';

function App() {
  return (
    <SidebarProvider>
      <Dashboard />
    </SidebarProvider>
  );
}

export default App;