import React, { useState } from 'react';

const Settings = () => {
  const [theme, setTheme] = useState('light');
  const [currency, setCurrency] = useState('KES');
  const [language, setLanguage] = useState('en');
  const [email, setEmail] = useState('admin@example.com');
  const [displayName, setDisplayName] = useState('Admin');
  const [notificationEmail, setNotificationEmail] = useState(true);
  const [notificationSMS, setNotificationSMS] = useState(false);
  const [fontSize, setFontSize] = useState('medium');

  // Placeholder handlers
  const handleSave = (e) => {
    e.preventDefault();
    alert('Settings saved (demo only)');
  };

  const handleResetData = () => {
    if (window.confirm('Are you sure you want to reset all data? This cannot be undone.')) {
      alert('Data reset (demo only)');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
      <form onSubmit={handleSave} className="space-y-6">
        {/* User Profile */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">User Profile</h3>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Display Name</label>
            <input type="text" value={displayName} onChange={e => setDisplayName(e.target.value)} className="border rounded px-3 py-2 w-full" />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="border rounded px-3 py-2 w-full" />
          </div>
          <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded">Change Password</button>
        </div>

        {/* Theme & Appearance */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Theme & Appearance</h3>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Theme</label>
            <select value={theme} onChange={e => setTheme(e.target.value)} className="border rounded px-3 py-2 w-full">
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Font Size</label>
            <select value={fontSize} onChange={e => setFontSize(e.target.value)} className="border rounded px-3 py-2 w-full">
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
          <div className="flex items-center mb-2">
            <input type="checkbox" checked={notificationEmail} onChange={e => setNotificationEmail(e.target.checked)} className="mr-2" />
            <span>Email Notifications</span>
          </div>
          <div className="flex items-center mb-2">
            <input type="checkbox" checked={notificationSMS} onChange={e => setNotificationSMS(e.target.checked)} className="mr-2" />
            <span>SMS Notifications</span>
          </div>
        </div>

        {/* Data Management */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Data Management</h3>
          <button type="button" className="bg-green-500 text-white px-4 py-2 rounded mr-2">Export Data</button>
          <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Import Data</button>
          <button type="button" className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleResetData}>Reset All Data</button>
        </div>

        {/* App Preferences */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">App Preferences</h3>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Default Currency</label>
            <select value={currency} onChange={e => setCurrency(e.target.value)} className="border rounded px-3 py-2 w-full">
              <option value="KES">KES (Kenyan Shilling)</option>
              <option value="USD">USD (US Dollar)</option>
              <option value="EUR">EUR (Euro)</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Language</label>
            <select value={language} onChange={e => setLanguage(e.target.value)} className="border rounded px-3 py-2 w-full">
              <option value="en">English</option>
              <option value="sw">Swahili</option>
            </select>
          </div>
        </div>

        {/* Security */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Security</h3>
          <button type="button" className="bg-yellow-500 text-white px-4 py-2 rounded mr-2">Enable 2FA</button>
          <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded">View Login Activity</button>
        </div>

        <div className="text-right">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold">Save Settings</button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
