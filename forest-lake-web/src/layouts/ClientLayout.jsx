import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { path: '/client/dashboard', label: 'Dashboard', icon: '📊' },
  { path: '/client/burial-lots', label: 'Burial Lots', icon: '🗺️' },
  { path: '/client/map', label: 'Cemetery Map', icon: '📍' },
  { path: '/client/reservations', label: 'Reservations', icon: '📋' },
  { path: '/client/profile', label: 'Profile', icon: '👤' },
  { path: '/client/settings', label: 'Settings', icon: '⚙️' },
];

export default function ClientLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-primary-dark text-white transform transition-transform lg:translate-x-0 lg:static ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-green-800">
          <Link to="/client/dashboard" className="text-lg font-bold">🌲 Forest Lake</Link>
          <p className="text-xs text-green-300 mt-1">Client Portal</p>
        </div>
        <nav className="p-4 space-y-1">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition ${location.pathname === item.path ? 'bg-primary text-white' : 'text-green-200 hover:bg-green-800/50'}`}
            >
              <span>{item.icon}</span> {item.label}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-green-800">
          <p className="text-sm text-green-300 mb-2">{user?.email}</p>
          <button onClick={handleLogout} className="w-full text-left text-sm text-red-300 hover:text-red-200">Logout</button>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex items-center justify-between lg:justify-end">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2" aria-label="Open sidebar">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          <p className="text-sm text-gray-600">Welcome, <span className="font-medium text-primary-dark">{user?.first_name || 'Client'}</span></p>
        </header>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
