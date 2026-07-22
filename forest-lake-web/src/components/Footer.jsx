import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
              <span className="text-2xl">🌲</span> Forest Lake Sum-ag
            </h3>
            <p className="text-green-200/70 text-sm leading-relaxed max-w-sm">
              Cemetery Client Management System with Geo-Tagging. A modern platform for managing burial lot reservations, client records, and cemetery locations.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-green-300">Quick Links</h4>
            <ul className="space-y-3 text-sm text-green-200/70">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link to="/features" className="hover:text-white transition-colors">Features</Link></li>
              <li><Link to="/map-preview" className="hover:text-white transition-colors">Cemetery Map</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-green-300">Contact</h4>
            <ul className="space-y-3 text-sm text-green-200/70">
              <li className="flex items-center gap-2"><span>📍</span> Forest Lake Memorial Park</li>
              <li className="flex items-center gap-2"><span>🏙️</span> Sum-ag, Bacolod City</li>
              <li className="flex items-center gap-2"><span>✉️</span> forestlake@example.com</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm text-green-300/50">
          © {new Date().getFullYear()} Forest Lake Sum-ag. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
