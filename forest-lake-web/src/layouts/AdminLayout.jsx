import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
  { path: '/admin/clients', label: 'Clients', icon: '👥' },
  { path: '/admin/burial-lots', label: 'Burial Lots', icon: '🗺️' },
  { path: '/admin/burial-lots/map', label: 'Cemetery Map', icon: '📍' },
  { path: '/admin/reservations', label: 'Reservations', icon: '📋' },
  { path: '/admin/settings', label: 'Settings', icon: '⚙️' },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <div className="h-screen bg-surface flex overflow-hidden">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-primary-dark transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 pb-4">
            <Link to="/admin/dashboard" className="flex items-center gap-3">
              <img src="/src/assets/global/forest-lake-logo-white.png" alt="Forest Lake" className="h-9 w-auto" />
              <div>
                <p className="text-white font-bold text-lg leading-tight">Forest Lake</p>
                <p className="text-green-300/70 text-xs font-medium">Admin Panel</p>
              </div>
            </Link>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
            {navItems.map(item => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-white/15 text-white shadow-sm'
                      : 'text-green-200/70 hover:bg-white/8 hover:text-white'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                  {isActive && <span className="ml-auto w-1.5 h-1.5 bg-green-400 rounded-full"></span>}
                </Link>
              );
            })}
          </nav>

          {/* User section */}
          <div className="p-4 m-4 mt-0 bg-white/5 rounded-2xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 bg-primary/50 rounded-full flex items-center justify-center text-white text-sm font-bold">
                {user?.first_name?.[0] || 'A'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">{user?.first_name || 'Admin'}</p>
                <p className="text-green-300/60 text-xs truncate">{user?.email}</p>
              </div>
            </div>
            <button onClick={handleLogout} className="w-full text-left text-sm text-red-300/80 hover:text-red-300 px-2 py-1.5 rounded-lg hover:bg-red-500/10 transition-all flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden animate-fade-in" onClick={() => setSidebarOpen(false)} />}

      {/* Main content */}
      <div className="flex-1 flex flex-col h-screen lg:min-w-0 overflow-hidden">
        <header className="shrink-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 -ml-2 rounded-xl hover:bg-gray-100 transition" aria-label="Open sidebar">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            <div className="flex items-center gap-3 ml-auto">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-gray-900">Administrator</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-sm">
                {user?.first_name?.[0] || 'A'}
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
