import { useState, useEffect } from 'react';
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-dark shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">
            <Link to="/" className="flex items-center gap-2.5 font-bold text-lg text-white">
              <img src="/src/assets/global/forest-lake-logo-white.png" alt="Forest Lake" className="h-8 w-auto" />
              <span className="hidden sm:inline">Forest Lake Sum-ag</span>
              <span className="sm:hidden">Forest Lake</span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {!user && (
                <>
                  <Link to="/" className={`px-4 py-2 text-sm rounded-lg transition-all ${location.pathname === '/' ? 'text-white bg-white/15' : 'text-white/80 hover:text-white hover:bg-white/10'}`}>Home</Link>
                  <Link to="/about" className={`px-4 py-2 text-sm rounded-lg transition-all ${location.pathname === '/about' ? 'text-white bg-white/15' : 'text-white/80 hover:text-white hover:bg-white/10'}`}>About</Link>
                  <Link to="/features" className={`px-4 py-2 text-sm rounded-lg transition-all ${location.pathname === '/features' ? 'text-white bg-white/15' : 'text-white/80 hover:text-white hover:bg-white/10'}`}>Features</Link>
                  <Link to="/products" className={`px-4 py-2 text-sm rounded-lg transition-all ${location.pathname === '/products' ? 'text-white bg-white/15' : 'text-white/80 hover:text-white hover:bg-white/10'}`}>Products</Link>
                  <Link to="/map-preview" className={`px-4 py-2 text-sm rounded-lg transition-all ${location.pathname === '/map-preview' ? 'text-white bg-white/15' : 'text-white/80 hover:text-white hover:bg-white/10'}`}>Map</Link>
                  <div className="w-px h-5 bg-white/20 mx-2"></div>
                  <button onClick={() => setShowLogin(true)} className="px-5 py-2 text-sm font-medium text-white bg-white/15 hover:bg-white/25 backdrop-blur-sm rounded-xl border border-white/20 transition-all">
                    Login
                  </button>
                  <button onClick={() => setShowRegister(true)} className="px-5 py-2 text-sm font-medium text-primary-dark bg-white hover:bg-green-50 rounded-xl transition-all shadow-sm ml-2">
                    Register
                  </button>
                </>
              )}
              {user && (
                <>
                  <Link to={user.role === 'admin' ? '/admin/dashboard' : '/client/dashboard'} className="px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all">
                    Dashboard
                  </Link>
                  <button onClick={handleLogout} className="px-5 py-2 text-sm font-medium text-white bg-red-500/80 hover:bg-red-500 rounded-xl transition-all ml-2">
                    Logout
                  </button>
                </>
              )}
            </div>

            {/* Mobile toggle */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition" aria-label="Toggle menu">
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
            <div className="md:hidden pb-4 pt-2 border-t border-white/10 space-y-1 animate-fade-in">
              {!user && (
                <>
                  <Link to="/" onClick={() => setMobileOpen(false)} className="block w-full text-left px-4 py-3 rounded-xl text-white/80 hover:bg-white/10 text-sm transition">Home</Link>
                  <Link to="/about" onClick={() => setMobileOpen(false)} className="block w-full text-left px-4 py-3 rounded-xl text-white/80 hover:bg-white/10 text-sm transition">About</Link>
                  <Link to="/features" onClick={() => setMobileOpen(false)} className="block w-full text-left px-4 py-3 rounded-xl text-white/80 hover:bg-white/10 text-sm transition">Features</Link>
                  <Link to="/products" onClick={() => setMobileOpen(false)} className="block w-full text-left px-4 py-3 rounded-xl text-white/80 hover:bg-white/10 text-sm transition">Products</Link>
                  <Link to="/map-preview" onClick={() => setMobileOpen(false)} className="block w-full text-left px-4 py-3 rounded-xl text-white/80 hover:bg-white/10 text-sm transition">Map</Link>
                  <div className="h-px bg-white/10 my-2"></div>
                  <button onClick={() => { setShowLogin(true); setMobileOpen(false); }} className="block w-full text-left px-4 py-3 rounded-xl bg-white/10 text-white text-sm font-medium">Login</button>
                  <button onClick={() => { setShowRegister(true); setMobileOpen(false); }} className="block w-full text-left px-4 py-3 rounded-xl text-white/80 text-sm font-medium">Register</button>
                </>
              )}
              {user && (
                <>
                  <Link to={user.role === 'admin' ? '/admin/dashboard' : '/client/dashboard'} className="block px-4 py-3 rounded-xl text-white/80 hover:bg-white/10 text-sm" onClick={() => setMobileOpen(false)}>Dashboard</Link>
                  <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="block w-full text-left px-4 py-3 rounded-xl text-red-300 hover:bg-red-500/10 text-sm">Logout</button>
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
