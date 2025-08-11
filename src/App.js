import React, { useState } from 'react';
import Dashboard from './Dashboard';
import { SidebarProvider } from './context/SidebarContext';
import Login from './components/Login';
import Signup from './components/Signup';
import { SettingsProvider } from './context/SettingsContext';


function App() {
  const [user, setUser] = useState(null);
  const [showSignup, setShowSignup] = useState(false);

  if (!user) {
    if (showSignup) {
      return <Signup onSignup={setUser} onSwitchToLogin={() => setShowSignup(false)} />;
    }
    return <Login onLogin={setUser} onSwitchToSignup={() => setShowSignup(true)} />;
  }

  return (
    <SettingsProvider>
      <SidebarProvider>
        <Dashboard user={user} />
      </SidebarProvider>
    </SettingsProvider>
  );
}

export default App;