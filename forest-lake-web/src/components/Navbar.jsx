import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Smooth scroll to section or navigate to home first
  const scrollTo = (id) => {
    setMobileOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className="bg-primary-dark text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <Link to="/" className="flex items-center gap-2 font-bold text-base sm:text-lg shrink-0">
              <span className="text-green-300">🌲</span>
              <span className="hidden xs:inline">Forest Lake Sum-ag</span>
              <span className="xs:hidden">Forest Lake</span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1 lg:gap-4">
              {!user && (
                <>
                  <button onClick={() => scrollTo('home')} className="px-3 py-2 text-sm hover:text-green-300 transition rounded-lg hover:bg-white/5">Home</button>
                  <button onClick={() => scrollTo('about')} className="px-3 py-2 text-sm hover:text-green-300 transition rounded-lg hover:bg-white/5">About</button>
                  <button onClick={() => scrollTo('features')} className="px-3 py-2 text-sm hover:text-green-300 transition rounded-lg hover:bg-white/5">Features</button>
                  <button onClick={() => scrollTo('map')} className="px-3 py-2 text-sm hover:text-green-300 transition rounded-lg hover:bg-white/5">Cemetery Map</button>
                  <div className="w-px h-6 bg-green-700 mx-1 lg:mx-2"></div>
                  <button onClick={() => setShowLogin(true)} className="bg-primary-mid hover:bg-primary px-4 py-2 rounded-lg text-sm font-medium transition">
                    Login
                  </button>
                  <button onClick={() => setShowRegister(true)} className="border border-green-300/60 hover:bg-green-300/10 px-4 py-2 rounded-lg text-sm font-medium transition">
                    Register
                  </button>
                </>
              )}
              {user && (
                <>
                  <Link to={user.role === 'admin' ? '/admin/dashboard' : '/client/dashboard'} className="px-3 py-2 text-sm hover:text-green-300 transition">
                    Dashboard
                  </Link>
                  <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-medium transition">
                    Logout
                  </button>
                </>
              )}
            </div>

            {/* Mobile toggle */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 -mr-2 rounded-lg hover:bg-white/10 transition" aria-label="Toggle menu">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile menu */}
          {mobileOpen && (
            <div className="md:hidden pb-4 pt-2 border-t border-green-800/50 space-y-1 animate-[fadeIn_0.2s_ease]">
              {!user && (
                <>
                  <button onClick={() => scrollTo('home')} className="block w-full text-left px-3 py-2.5 rounded-lg hover:bg-white/10 text-sm transition">Home</button>
                  <button onClick={() => scrollTo('about')} className="block w-full text-left px-3 py-2.5 rounded-lg hover:bg-white/10 text-sm transition">About</button>
                  <button onClick={() => scrollTo('features')} className="block w-full text-left px-3 py-2.5 rounded-lg hover:bg-white/10 text-sm transition">Features</button>
                  <button onClick={() => scrollTo('map')} className="block w-full text-left px-3 py-2.5 rounded-lg hover:bg-white/10 text-sm transition">Cemetery Map</button>
                  <div className="h-px bg-green-800/50 my-2"></div>
                  <button onClick={() => { setShowLogin(true); setMobileOpen(false); }} className="block w-full text-left px-3 py-2.5 rounded-lg bg-primary-mid/50 hover:bg-primary-mid text-sm font-medium transition">Login</button>
                  <button onClick={() => { setShowRegister(true); setMobileOpen(false); }} className="block w-full text-left px-3 py-2.5 rounded-lg hover:bg-white/10 text-sm font-medium transition">Register</button>
                </>
              )}
              {user && (
                <>
                  <Link to={user.role === 'admin' ? '/admin/dashboard' : '/client/dashboard'} className="block px-3 py-2.5 rounded-lg hover:bg-white/10 text-sm" onClick={() => setMobileOpen(false)}>Dashboard</Link>
                  <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="block w-full text-left px-3 py-2.5 rounded-lg text-red-300 hover:bg-red-500/10 text-sm transition">Logout</button>
                </>
              )}
            </div>
          )}
        </div>
      </nav>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} onSwitchToRegister={() => { setShowLogin(false); setShowRegister(true); }} />}
      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} onSwitchToLogin={() => { setShowRegister(false); setShowLogin(true); }} />}
    </>
  );
}
