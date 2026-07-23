import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

import h1 from '../../assets/home/h1.jpg';
import h2 from '../../assets/home/h2.jpg';
import h3 from '../../assets/home/h3.jpg';
import h4 from '../../assets/home/h4.jpg';
import h5 from '../../assets/home/h5.jpg';
import h6 from '../../assets/home/h6.jpg';
import h7 from '../../assets/home/h7.jpg';
import h8 from '../../assets/home/h8.jpg';
import h9 from '../../assets/home/h9.jpg';
import forestLakeLogo from '../../assets/global/forest-lake-logo-white.png';

const images = [h1, h2, h3, h4, h5, h6, h7, h8, h9];

export default function LandingPage() {
  const [current, setCurrent] = useState(0);

  const nextImage = useCallback(() => {
    setCurrent(i => (i + 1) % images.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextImage, 18000);
    return () => clearInterval(timer);
  }, [nextImage]);

  return (
    <div className="h-screen overflow-y-auto snap-y snap-mandatory">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden snap-start">
        {/* Background images with slow zoom then transition */}
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt=""
            className={`absolute inset-0 w-full h-full object-cover ${i === current ? 'opacity-100 animate-[slowZoom_18s_ease-in-out_forwards]' : 'opacity-0'}`}
            style={{
              transition: 'opacity 3s ease-in-out',
              willChange: 'transform, opacity',
            }}
          />
        ))}
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Content */}
        <div className="relative text-center px-4">
          <img src={forestLakeLogo} alt="Forest Lake" className="h-64 sm:h-80 md:h-[400px] lg:h-[500px] w-auto mx-auto drop-shadow-2xl" />
        </div>
      </section>

      {/* Reserve a Lot Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden snap-start">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" style={{ minWidth: '100%', minHeight: '100%' }} onTimeUpdate={(e) => { if (e.target.currentTime >= 18) e.target.currentTime = 0; }}>
          <source src="/src/assets/home/add.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/70 via-black/40 to-black/30"></div>
        <div className="relative max-w-6xl mx-auto px-8 sm:px-16 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Logo & Text */}
          <div>
            <img src={forestLakeLogo} alt="Forest Lake" className="h-32 sm:h-40 w-auto mb-8 drop-shadow-lg" />
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">I want to <span className="text-primary-light italic">RESERVE</span> a lot</h2>
            <p className="text-lg sm:text-xl text-white/80 max-w-lg leading-relaxed mb-8">
              Invest in a lot from Forest Lake Memorial Parks, the country's top neighborhood memorial park.
            </p>
            <a href="/map-preview" className="inline-block bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 hover:bg-gray-100 border border-gray-200">
              View Cemetery Map
            </a>
          </div>
          {/* Right - empty for video visibility */}
          <div></div>
        </div>
      </section>

      {/* Customer Portal Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden snap-start">
        <img src="/src/assets/home/customer.png" alt="Customer Portal" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
        <div className="relative max-w-6xl mx-auto px-8 sm:px-16 w-full">
          <div className="max-w-lg">
            <span className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-6">
              <span className="text-white/90 text-sm font-medium">Online Services</span>
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">Customer Portal</h2>
            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              Access your account to manage your burial lot reservations, track status, and more — all in one convenient platform.
            </p>
            <ul className="space-y-3 mb-10">
              <li className="flex items-center gap-3 text-white/90">
                <svg className="w-5 h-5 text-primary-light shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                <span className="text-lg">Reserve a Burial Lot</span>
              </li>
              <li className="flex items-center gap-3 text-white/90">
                <svg className="w-5 h-5 text-primary-light shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                <span className="text-lg">Manage Reservations</span>
              </li>
              <li className="flex items-center gap-3 text-white/90">
                <svg className="w-5 h-5 text-primary-light shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                <span className="text-lg">Track Reservation Status</span>
              </li>
              <li className="flex items-center gap-3 text-white/90">
                <svg className="w-5 h-5 text-primary-light shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                <span className="text-lg">View Cemetery Map</span>
              </li>
              <li className="flex items-center gap-3 text-white/90">
                <svg className="w-5 h-5 text-primary-light shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                <span className="text-lg">Manage Your Profile</span>
              </li>
            </ul>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/login" className="bg-white text-primary-dark px-8 py-4 rounded-2xl font-semibold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 hover:bg-green-50 text-center">
                Login
              </Link>
              <Link to="/register" className="border-2 border-white/40 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white/10 transition-all text-center">
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
