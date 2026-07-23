import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginModal({ onClose, onSwitchToRegister }) {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState('client');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await login(email, password, role);
      onClose();
      setTimeout(() => {
        navigate(userData.role === 'admin' ? '/admin/dashboard' : '/client/dashboard');
      }, 50);
    } catch { /* handled */ }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in" onClick={onClose}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative animate-scale-in" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all" aria-label="Close">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <img src="/src/assets/global/forest-lake-logo-white.png" alt="Forest Lake" className="h-8 w-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-500 mt-1 text-sm">Sign in to your account</p>
        </div>

        {/* Role Toggle */}
        <div className="flex mb-6 bg-gray-100 rounded-xl p-1">
          <button type="button" onClick={() => setRole('admin')} className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${role === 'admin' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>Administrator</button>
          <button type="button" onClick={() => setRole('client')} className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${role === 'client' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>Client</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="input-modern" placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="input-modern" placeholder="••••••••" />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full mt-2">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don&apos;t have an account?{' '}
          <button onClick={onSwitchToRegister} className="text-primary font-semibold hover:underline">Create one</button>
        </p>
      </div>
    </div>
  );
}
