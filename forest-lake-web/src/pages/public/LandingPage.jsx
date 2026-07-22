import { useState, useEffect } from 'react';
import api from '../../utils/api';
import CemeteryMap from '../../components/CemeteryMap';
import LoginModal from '../../components/LoginModal';
import RegisterModal from '../../components/RegisterModal';

const features = [
  { icon: '🌳', title: 'Peaceful Grounds', desc: 'Beautifully landscaped gardens and well-maintained pathways for a serene atmosphere.' },
  { icon: '🗺️', title: 'Organized Sections', desc: 'Clearly mapped burial sections for easy navigation and lot identification.' },
  { icon: '📍', title: 'Interactive Cemetery Map', desc: 'Locate burial lots using our geo-tagged interactive map.' },
  { icon: '📋', title: 'Online Reservations', desc: 'Reserve burial lots conveniently through our online platform.' },
  { icon: '🏛️', title: 'Memorial Services', desc: 'Dedicated spaces and support for honoring loved ones with dignity.' },
  { icon: '�', title: 'Secure & Accessible', desc: 'Monitored premises with easy access for families and visitors.' },
];

export default function LandingPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [lots, setLots] = useState([]);

  useEffect(() => {
    api.get('/burial-lots/list.php')
      .then(res => setLots(res.data.data || []))
      .catch(() => setLots([]));
  }, []);

  return (
    <div className="scroll-smooth">
      {/* ==================== HERO SECTION ==================== */}
      <section id="home" className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-primary-dark via-primary-mid to-primary">
        {/* Animated background shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary-light/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full"></div>
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8 animate-fade-in-up">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-green-100 text-sm font-medium">Cemetery Management System</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              Forest Lake
              <span className="block text-primary-light">Memorial Park</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-green-100/80 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              A peaceful and well-maintained resting place in Sum-ag, Bacolod City — honoring lives with dignity, care, and respect.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <a href="#map" className="w-full sm:w-auto bg-white text-primary-dark px-8 py-4 rounded-2xl font-semibold hover:bg-green-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-center">
                Explore Burial Lots
              </a>
              <button onClick={() => setShowLogin(true)} className="w-full sm:w-auto border-2 border-white/30 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white/10 backdrop-blur-sm transition-all text-center">
                Client Login
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-16 max-w-md mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-white">{lots.length || '—'}</p>
                <p className="text-xs sm:text-sm text-green-200/70 mt-1">Total Lots</p>
              </div>
              <div className="text-center border-x border-white/10">
                <p className="text-2xl sm:text-3xl font-bold text-white">{lots.filter(l => l.status === 'available').length || '—'}</p>
                <p className="text-xs sm:text-sm text-green-200/70 mt-1">Available</p>
              </div>
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-white">24/7</p>
                <p className="text-xs sm:text-sm text-green-200/70 mt-1">Online</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== ABOUT SECTION ==================== */}
      <section id="about" className="py-20 sm:py-28 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block bg-primary/10 text-primary text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider">About Us</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">Forest Lake Memorial Park</h2>
            <p className="text-gray-500 max-w-xl mx-auto">A peaceful resting place nestled in the heart of Sum-ag, Bacolod City.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-lg">
                Forest Lake Memorial Park is a well-maintained cemetery located in Sum-ag, Bacolod City. It serves as a serene
                and dignified final resting place for loved ones, offering families a tranquil environment surrounded by nature.
              </p>
              <p className="text-gray-600 leading-relaxed">
                The memorial park features organized burial sections, well-kept landscapes, and accessible pathways, ensuring
                that visitors can pay their respects in a peaceful setting.
              </p>
              <p className="text-gray-600 leading-relaxed">
                With a commitment to providing compassionate service, Forest Lake Memorial Park continues to serve the
                community with care, respect, and professionalism.
              </p>
            </div>

            <div className="bg-gradient-to-br from-primary/5 to-primary-light/20 rounded-3xl p-8 border border-primary/10">
              <h3 className="font-bold text-gray-900 mb-6 text-lg">Why Choose Forest Lake</h3>
              <ul className="space-y-4">
                {[
                  'Peaceful and well-maintained grounds',
                  'Organized and accessible burial sections',
                  'Beautiful landscaped surroundings',
                  'Convenient location in Sum-ag, Bacolod City',
                  'Compassionate and professional service',
                  'Secure and monitored premises',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                      <svg className="w-3.5 h-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FEATURES SECTION ==================== */}
      <section id="features" className="py-20 sm:py-28 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block bg-primary/10 text-primary text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider">Features</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">What We Offer</h2>
            <p className="text-gray-500 max-w-lg mx-auto">Providing families a dignified and well-cared-for resting place for their loved ones.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {features.map((f, i) => (
              <div key={i} className="group relative bg-surface rounded-2xl p-7 border border-gray-100 card-hover">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform duration-300">{f.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">{f.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CEMETERY MAP SECTION ==================== */}
      <section id="map" className="py-20 sm:py-28 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-primary/10 text-primary text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider">Location</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">Find a Burial Lot</h2>
            <p className="text-gray-500 max-w-lg mx-auto">Browse available lots on our interactive map and find the perfect resting place for your loved ones.</p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <span className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-full text-sm">
              <span className="w-3 h-3 bg-available rounded-full shadow-sm shadow-available/50"></span> Available
            </span>
            <span className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-full text-sm">
              <span className="w-3 h-3 bg-reserved rounded-full shadow-sm shadow-reserved/50"></span> Reserved
            </span>
            <span className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-full text-sm">
              <span className="w-3 h-3 bg-occupied rounded-full shadow-sm shadow-occupied/50"></span> Occupied
            </span>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
            <CemeteryMap lots={lots} height="500px" />
          </div>
        </div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <section id="login" className="py-20 sm:py-28 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary-mid to-primary"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50"></div>

        <div className="relative max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
            <span className="text-lg">🔐</span>
            <span className="text-green-100 text-sm font-medium">Get Started</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-green-100/80 max-w-md mx-auto mb-10 text-lg leading-relaxed">
            Create your account or log in to manage burial lot reservations and track your status.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button onClick={() => setShowLogin(true)} className="w-full sm:w-auto bg-white text-primary-dark px-8 py-4 rounded-2xl font-semibold hover:bg-green-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-center">
              Login to Account
            </button>
            <button onClick={() => setShowRegister(true)} className="w-full sm:w-auto border-2 border-white/30 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white/10 backdrop-blur-sm transition-all text-center">
              Create Account
            </button>
          </div>
          <p className="text-xs text-green-200/50 mt-8">Free registration · Email verification required</p>
        </div>
      </section>

      {/* Modals */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} onSwitchToRegister={() => { setShowLogin(false); setShowRegister(true); }} />}
      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} onSwitchToLogin={() => { setShowRegister(false); setShowLogin(true); }} />}
    </div>
  );
}
