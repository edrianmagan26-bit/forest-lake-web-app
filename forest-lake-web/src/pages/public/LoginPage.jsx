import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ReCAPTCHA from 'react-google-recaptcha';
import toast from 'react-hot-toast';

const RECAPTCHA_SITE_KEY = '6LeoGGEtAAAAAIJsVDCAR9V9SxzzLE9Hqc46Fetz';

export default function LoginPage() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);
  const recaptchaRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!captchaValue) { toast.error('Please complete the reCAPTCHA verification.'); return; }
    try {
      const userData = await login(email, password);
      navigate(userData.role === 'admin' ? '/admin/dashboard' : '/client/dashboard');
    } catch { /* handled */ }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        {/* Left - Image */}
        <div className="hidden lg:block relative">
          <img src="/src/assets/home/h2.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/90 to-primary/70"></div>
          <div className="relative h-full flex flex-col items-center justify-center p-10 text-center">
            <img src="/src/assets/global/forest-lake-logo-white.png" alt="Forest Lake" className="h-28 w-auto mb-6" />
            <p className="text-white/70 text-sm leading-relaxed max-w-xs">Where generations of family memories are treasured and immortalized by the living.</p>
          </div>
        </div>

        {/* Right - Form */}
        <div className="p-8 sm:p-10">
          <div className="lg:hidden mb-6 text-center">
            <img src="/src/assets/global/forest-lake-logo.png" alt="Forest Lake" className="h-12 w-auto mx-auto" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome back</h1>
          <p className="text-gray-400 text-sm mb-6">Sign in to your account</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@example.com" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition text-sm hover:border-gray-300" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Password</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" className="w-full px-4 py-3 pr-11 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition text-sm hover:border-gray-300" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </button>
              </div>
            </div>

            <div className="flex justify-center pt-2">
              <ReCAPTCHA ref={recaptchaRef} sitekey={RECAPTCHA_SITE_KEY} onChange={setCaptchaValue} onExpired={() => setCaptchaValue(null)} size="normal" />
            </div>

            <button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary-accent text-white py-3 rounded-xl font-semibold transition-all active:scale-[0.98] disabled:opacity-50">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-5">
            Don't have an account? <Link to="/register" className="text-primary font-semibold hover:underline">Sign up</Link>
          </p>
          <Link to="/" className="block text-center text-xs text-gray-400 mt-3 hover:text-gray-600">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
