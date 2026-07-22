import { useState, useEffect } from 'react';
import api from '../../utils/api';
import CemeteryMap from '../../components/CemeteryMap';
import LoginModal from '../../components/LoginModal';
import RegisterModal from '../../components/RegisterModal';

const features = [
  { icon: '📂', title: 'Digital Client Records', desc: 'Centralized and organized client information management.' },
  { icon: '🗺️', title: 'Burial Lot Management', desc: 'Monitor available, reserved, and occupied burial lots in real-time.' },
  { icon: '📍', title: 'Geo-Tagged Cemetery Map', desc: 'Locate burial lots using an interactive map with coordinates.' },
  { icon: '📋', title: 'Reservation Management', desc: 'Submit and monitor burial lot reservation requests online.' },
  { icon: '🔒', title: 'Secure Account Management', desc: 'Role-based access with email verification and secure auth.' },
  { icon: '👥', title: 'User Management', desc: 'Admin tools to manage client accounts and system access.' },
];

const steps = [
  { num: '01', title: 'Create an Account', desc: 'Register with your personal information' },
  { num: '02', title: 'Verify Your Email', desc: 'Confirm your email to activate' },
  { num: '03', title: 'Explore Burial Lots', desc: 'Browse available lots on the map' },
  { num: '04', title: 'Select a Lot', desc: 'Choose your preferred burial lot' },
  { num: '05', title: 'Request Reservation', desc: 'Submit your reservation request' },
  { num: '06', title: 'Track Status', desc: 'Monitor your reservation progress' },
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
      <section id="home" className="relative bg-gradient-to-br from-primary-dark via-primary to-primary-mid text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-72 sm:h-72 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-28 lg:py-36">
          <div className="text-center">
            <span className="inline-block text-4xl sm:text-5xl mb-4">🌲</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 leading-tight">
              Forest Lake Sum-ag
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-green-100 mb-2 sm:mb-3 font-medium">
              Cemetery Client Management System with Geo-Tagging
            </p>
            <p className="text-sm sm:text-base text-green-200/80 max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2">
              Manage burial lot reservations, client records, and cemetery locations in one organized platform for Forest Lake Memorial Park, Sum-ag, Bacolod City.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
              <a href="#map" className="w-full sm:w-auto bg-white text-primary-dark px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-semibold hover:bg-green-50 transition shadow-lg text-center">
                Explore Burial Lots
              </a>
              <button onClick={() => setShowLogin(true)} className="w-full sm:w-auto border-2 border-white/80 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-semibold hover:bg-white/10 transition text-center">
                Client Login
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60L48 55C96 50 192 40 288 35C384 30 480 30 576 33.3C672 36.7 768 43.3 864 45C960 46.7 1056 43.3 1152 40C1248 36.7 1344 33.3 1392 31.7L1440 30V60H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* ==================== ABOUT SECTION ==================== */}
      <section id="about" className="py-14 sm:py-16 md:py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-10">
            <span className="inline-block bg-primary/10 text-primary text-xs sm:text-sm font-semibold px-3 py-1 rounded-full mb-3">About Us</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-dark mb-4">About the System</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
            <div className="space-y-4 text-sm sm:text-base text-gray-600 leading-relaxed">
              <p>
                The Forest Lake Sum-ag Cemetery Client Management System provides a centralized digital platform
                for managing client information, burial lot availability, reservations, and Geo-Tagged cemetery locations.
              </p>
              <p>
                This system addresses common problems with manual cemetery record management including difficult record
                searching, data redundancy, delayed updates, and difficulty locating burial lots.
              </p>
              <p>
                It combines client management, reservation management, burial lot monitoring, and Geo-Tagging into one
                integrated platform for Forest Lake Memorial Park.
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-primary/5 rounded-2xl p-6 sm:p-8 border border-green-100">
              <h3 className="font-semibold text-primary-dark mb-4 text-base sm:text-lg">System Objectives</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-2"><span className="text-primary mt-0.5">✓</span> Centralized digital client database</li>
                <li className="flex items-start gap-2"><span className="text-primary mt-0.5">✓</span> Real-time burial lot status monitoring</li>
                <li className="flex items-start gap-2"><span className="text-primary mt-0.5">✓</span> Map-based Geo-Tagging for lot location</li>
                <li className="flex items-start gap-2"><span className="text-primary mt-0.5">✓</span> Reduce manual errors and improve efficiency</li>
                <li className="flex items-start gap-2"><span className="text-primary mt-0.5">✓</span> Easy-to-use reservation platform</li>
                <li className="flex items-start gap-2"><span className="text-primary mt-0.5">✓</span> Efficient admin management tools</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FEATURES SECTION ==================== */}
      <section id="features" className="py-14 sm:py-16 md:py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <span className="inline-block bg-primary/10 text-primary text-xs sm:text-sm font-semibold px-3 py-1 rounded-full mb-3">Features</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-dark mb-3">System Features</h2>
            <p className="text-sm sm:text-base text-gray-500 max-w-lg mx-auto">Comprehensive tools to streamline cemetery management operations.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {features.map((f, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-primary/20 group">
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">{f.icon}</div>
                <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">{f.title}</h3>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== HOW IT WORKS SECTION ==================== */}
      <section className="py-14 sm:py-16 md:py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <span className="inline-block bg-primary/10 text-primary text-xs sm:text-sm font-semibold px-3 py-1 rounded-full mb-3">Process</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-dark mb-3">How It Works</h2>
            <p className="text-sm sm:text-base text-gray-500">Simple steps to get started with the system.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {steps.map((s, i) => (
              <div key={i} className="relative bg-gradient-to-br from-white to-green-50/50 rounded-2xl p-5 sm:p-6 border border-gray-100 hover:border-primary/30 transition-all group">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl sm:text-3xl font-bold text-primary/30 group-hover:text-primary/60 transition">{s.num}</span>
                  <div className="h-px flex-1 bg-gradient-to-r from-primary/20 to-transparent"></div>
                </div>
                <h3 className="font-semibold text-gray-800 text-sm sm:text-base mb-1">{s.title}</h3>
                <p className="text-xs sm:text-sm text-gray-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CEMETERY MAP SECTION ==================== */}
      <section id="map" className="py-14 sm:py-16 md:py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-10">
            <span className="inline-block bg-primary/10 text-primary text-xs sm:text-sm font-semibold px-3 py-1 rounded-full mb-3">Cemetery Map</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-dark mb-3">Geo-Tagged Burial Lots</h2>
            <p className="text-sm sm:text-base text-gray-500 max-w-lg mx-auto">Explore burial lot locations on our interactive map.</p>
            <p className="text-xs text-gray-400 mt-2">Note: Geo-Tagging is for map-based visual location only. It does not provide real-time GPS navigation.</p>
          </div>

          <div className="flex flex-wrap gap-3 sm:gap-5 justify-center mb-5 sm:mb-6 text-xs sm:text-sm">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-available rounded-full"></span> Available</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-reserved rounded-full"></span> Reserved</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-occupied rounded-full"></span> Occupied</span>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200">
            <CemeteryMap lots={lots} height="500px" />
          </div>
        </div>
      </section>

      {/* ==================== LOGIN / REGISTER CTA SECTION ==================== */}
      <section id="login" className="py-14 sm:py-16 md:py-20 px-4 bg-gradient-to-br from-primary-dark via-primary-accent to-primary-mid text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-40 h-40 sm:w-64 sm:h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-56 h-56 sm:w-80 sm:h-80 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3"></div>

        <div className="relative max-w-3xl mx-auto text-center">
          <span className="inline-block text-3xl sm:text-4xl mb-3">🔐</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Get Started Today</h2>
          <p className="text-sm sm:text-base text-green-100/80 max-w-md mx-auto mb-8 sm:mb-10 leading-relaxed">
            Create your account or log in to manage burial lot reservations, view available lots, and track your reservation status.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
            <button onClick={() => setShowLogin(true)} className="w-full sm:w-auto bg-white text-primary-dark px-8 py-3.5 rounded-xl font-semibold hover:bg-green-50 transition shadow-lg text-center">
              Login to Account
            </button>
            <button onClick={() => setShowRegister(true)} className="w-full sm:w-auto border-2 border-white/80 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-white/10 transition text-center">
              Create Account
            </button>
          </div>
          <p className="text-xs text-green-200/60 mt-6">Free registration. Email verification required.</p>
        </div>
      </section>

      {/* Modals */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} onSwitchToRegister={() => { setShowLogin(false); setShowRegister(true); }} />}
      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} onSwitchToLogin={() => { setShowRegister(false); setShowLogin(true); }} />}
    </div>
  );
}
