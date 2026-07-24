import { useState } from 'react';
import api from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import toast from 'react-hot-toast';

export default function AdminSettings() {
  const { user } = useAuth();
  const { darkMode, toggleDarkMode, compactSidebar, toggleCompactSidebar } = useTheme();
  const [activeTab, setActiveTab] = useState('profile');
  const [passwordForm, setPasswordForm] = useState({ current_password: '', new_password: '', confirm_password: '' });
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState({
    email_reservations: true,
    email_status: true,
    browser_notifications: false,
  });

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordForm.new_password !== passwordForm.confirm_password) { toast.error('Passwords do not match'); return; }
    if (passwordForm.new_password.length < 6) { toast.error('Min 6 characters'); return; }
    setLoading(true);
    try {
      await api.put('/users/change-password.php', { current_password: passwordForm.current_password, new_password: passwordForm.new_password });
      toast.success('Password changed!');
      setPasswordForm({ current_password: '', new_password: '', confirm_password: '' });
    } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
    finally { setLoading(false); }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> },
    { id: 'security', label: 'Security', icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg> },
    { id: 'appearance', label: 'Appearance', icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg> },
    { id: 'notifications', label: 'Notifications', icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg> },
  ];

  return (
    <div className="animate-fade-in-up">
      <div className="mb-8">
        <h1 className={`text-2xl sm:text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Settings</h1>
        <p className={`mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Manage your account and system preferences.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Tabs */}
        <div className="lg:w-56 shrink-0">
          <div className={`rounded-2xl border p-2 lg:sticky lg:top-6 ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-100'}`}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === tab.id ? 'bg-primary/10 text-primary' : darkMode ? 'text-gray-300 hover:bg-gray-600' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 max-w-2xl">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className={`rounded-2xl p-7 border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-100'}`}>
              <h2 className={`text-lg font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Profile Information</h2>
              <p className={`text-sm mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Your account details</p>
              <div className={`flex items-center gap-4 mb-6 p-4 rounded-xl ${darkMode ? 'bg-gray-600' : 'bg-gray-50'}`}>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary text-2xl font-bold">
                  {user?.first_name?.[0] || 'A'}
                </div>
                <div>
                  <p className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>{user?.first_name || 'Administrator'}</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{user?.email}</p>
                  <span className="inline-block mt-1 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium capitalize">{user?.role}</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-xs font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Email</label>
                    <p className={`text-sm ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>{user?.email}</p>
                  </div>
                  <div>
                    <label className={`block text-xs font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Role</label>
                    <p className={`text-sm capitalize ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>{user?.role}</p>
                  </div>
                </div>
                <div>
                  <label className={`block text-xs font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Account Status</label>
                  <span className="inline-flex items-center gap-1.5 text-sm text-green-700 bg-green-50 px-3 py-1 rounded-full">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Active
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className={`rounded-2xl p-7 border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-100'}`}>
              <h2 className={`text-lg font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Change Password</h2>
              <p className={`text-sm mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Update your account security credentials</p>
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-1.5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Current Password</label>
                  <input type="password" value={passwordForm.current_password} onChange={e => setPasswordForm({...passwordForm, current_password: e.target.value})} required className={`input-modern ${darkMode ? '!bg-gray-600 !border-gray-500 !text-white placeholder:text-gray-400' : ''}`} placeholder="••••••••" />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1.5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>New Password</label>
                  <input type="password" value={passwordForm.new_password} onChange={e => setPasswordForm({...passwordForm, new_password: e.target.value})} required className={`input-modern ${darkMode ? '!bg-gray-600 !border-gray-500 !text-white placeholder:text-gray-400' : ''}`} placeholder="••••••••" />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1.5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Confirm New Password</label>
                  <input type="password" value={passwordForm.confirm_password} onChange={e => setPasswordForm({...passwordForm, confirm_password: e.target.value})} required className={`input-modern ${darkMode ? '!bg-gray-600 !border-gray-500 !text-white placeholder:text-gray-400' : ''}`} placeholder="••••••••" />
                </div>
                <button type="submit" disabled={loading} className="btn-primary w-full">
                  {loading ? 'Saving...' : 'Update Password'}
                </button>
              </form>
            </div>
          )}

          {/* Appearance Tab */}
          {activeTab === 'appearance' && (
            <div className={`rounded-2xl p-7 border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-100'}`}>
              <h2 className={`text-lg font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Appearance</h2>
              <p className={`text-sm mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Customize the look and feel</p>
              <div className="space-y-6">
                <div className={`flex items-center justify-between p-4 rounded-xl ${darkMode ? 'bg-gray-600' : 'bg-gray-50'}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                    </div>
                    <div>
                      <p className={`font-medium text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>Dark Mode</p>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Switch between light and dark theme</p>
                    </div>
                  </div>
                  <button onClick={toggleDarkMode} className={`relative w-12 h-6 rounded-full transition-colors ${darkMode ? 'bg-primary' : 'bg-gray-300'}`}>
                    <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${darkMode ? 'translate-x-6' : ''}`}></span>
                  </button>
                </div>
                <div className={`flex items-center justify-between p-4 rounded-xl ${darkMode ? 'bg-gray-600' : 'bg-gray-50'}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>
                    </div>
                    <div>
                      <p className={`font-medium text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>Compact Sidebar</p>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Collapse sidebar to icons only</p>
                    </div>
                  </div>
                  <button onClick={toggleCompactSidebar} className={`relative w-12 h-6 rounded-full transition-colors ${compactSidebar ? 'bg-primary' : 'bg-gray-300'}`}>
                    <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${compactSidebar ? 'translate-x-6' : ''}`}></span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className={`rounded-2xl p-7 border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-100'}`}>
              <h2 className={`text-lg font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Notifications</h2>
              <p className={`text-sm mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Manage how you receive notifications</p>
              <div className="space-y-4">
                {[
                  { key: 'email_reservations', label: 'New Reservations', desc: 'Get notified when a client submits a reservation' },
                  { key: 'email_status', label: 'Status Updates', desc: 'Receive updates on reservation status changes' },
                  { key: 'browser_notifications', label: 'Browser Notifications', desc: 'Show desktop notifications for important events' },
                ].map(item => (
                  <div key={item.key} className={`flex items-center justify-between p-4 rounded-xl ${darkMode ? 'bg-gray-600' : 'bg-gray-50'}`}>
                    <div>
                      <p className={`font-medium text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{item.label}</p>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{item.desc}</p>
                    </div>
                    <button onClick={() => setNotifications({...notifications, [item.key]: !notifications[item.key]})} className={`relative w-12 h-6 rounded-full transition-colors ${notifications[item.key] ? 'bg-primary' : 'bg-gray-300'}`}>
                      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${notifications[item.key] ? 'translate-x-6' : ''}`}></span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
