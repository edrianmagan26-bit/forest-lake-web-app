import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-primary-dark to-primary-mid text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo */}
          <div>
            <img src="/src/assets/global/forest-lake-logo-white.png" alt="Forest Lake" className="h-24 w-auto mb-6" />
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-5 text-lg text-white">Quick Links</h4>
            <ul className="space-y-3 text-sm text-green-100/70">
              <li><Link to="/" className="hover:text-white transition-colors flex items-center gap-2"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors flex items-center gap-2"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>About Us</Link></li>
              <li><Link to="/features" className="hover:text-white transition-colors flex items-center gap-2"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>Features & Amenities</Link></li>
              <li><Link to="/products" className="hover:text-white transition-colors flex items-center gap-2"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>Our Products</Link></li>
              <li><Link to="/map-preview" className="hover:text-white transition-colors flex items-center gap-2"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>Cemetery Map</Link></li>
            </ul>
          </div>

          {/* Park Details */}
          <div>
            <h4 className="font-bold mb-5 text-lg text-white">Park Details</h4>
            <ul className="space-y-4 text-sm text-green-100/70">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary-light shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                <div><span className="text-white font-medium block">Area</span>7.4 Hectares</div>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary-light shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <div><span className="text-white font-medium block">Launched</span>July 2019</div>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary-light shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <div><span className="text-white font-medium block">Sales Office</span>Units A04-A06, GF Annex Bldg., Negros First Cyber Center, Hernaez St., Bacolod City</div>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary-light shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <div><span className="text-white font-medium block">Contact Number</span>(034) 458-9408 / 700-0381<br/>0909 579 3984 / 0948 655 8636<br/>0947 722 4557 / 0999 805 9953</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Bottom bar */}
      <div className="bg-primary-dark/50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-green-200/50">
          © Copyright {new Date().getFullYear()} Forest Lake | All Rights Reserved
        </div>
      </div>
    </footer>
  );
}
