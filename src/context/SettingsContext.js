import React, { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [fontSize, setFontSize] = useState('medium');
  const [currency, setCurrency] = useState('KES');
  const [language, setLanguage] = useState('en');
  const [notificationEmail, setNotificationEmail] = useState(true);
  const [notificationSMS, setNotificationSMS] = useState(false);
  const [displayName, setDisplayName] = useState('Admin');
  const [email, setEmail] = useState('admin@example.com');

  // Apply theme to body
  useEffect(() => {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
  }, [theme]);

  // Apply font size to body
  useEffect(() => {
    document.body.classList.remove('font-small', 'font-medium', 'font-large');
    document.body.classList.add(`font-${fontSize}`);
  }, [fontSize]);

  return (
    <SettingsContext.Provider value={{
      theme, setTheme,
      fontSize, setFontSize,
      currency, setCurrency,
      language, setLanguage,
      notificationEmail, setNotificationEmail,
      notificationSMS, setNotificationSMS,
      displayName, setDisplayName,
      email, setEmail
    }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
