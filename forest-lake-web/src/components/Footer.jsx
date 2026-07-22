import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-3">🌲 Forest Lake Sum-ag</h3>
            <p className="text-green-200 text-sm">
              Cemetery Client Management System with Geo-Tagging. Managing burial lot reservations, client records, and cemetery locations.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm text-green-200">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition">About</Link></li>
              <li><Link to="/features" className="hover:text-white transition">Features</Link></li>
              <li><Link to="/map-preview" className="hover:text-white transition">Cemetery Map</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Contact</h4>
            <ul className="space-y-2 text-sm text-green-200">
              <li>Forest Lake Memorial Park</li>
              <li>Sum-ag, Bacolod City</li>
              <li>forestlake@example.com</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-green-800 mt-8 pt-6 text-center text-sm text-green-300">
          © {new Date().getFullYear()} Forest Lake Sum-ag. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
