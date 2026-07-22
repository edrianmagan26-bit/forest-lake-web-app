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
      // Small delay to ensure state propagates before navigation
      setTimeout(() => {
        navigate(userData.role === 'admin' ? '/admin/dashboard' : '/client/dashboard');
      }, 50);
    } catch { /* handled */ }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl" aria-label="Close">&times;</button>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-primary-dark">Forest Lake Sum-ag</h2>
          <p className="text-gray-500 mt-1">Welcome Back</p>
        </div>
        <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
          <button type="button" onClick={() => setRole('admin')} className={`flex-1 py-2 rounded-md text-sm font-medium transition ${role === 'admin' ? 'bg-primary text-white shadow' : 'text-gray-600'}`}>Administrator</button>
          <button type="button" onClick={() => setRole('client')} className={`flex-1 py-2 rounded-md text-sm font-medium transition ${role === 'client' ? 'bg-primary text-white shadow' : 'text-gray-600'}`}>Client</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none" placeholder="Enter your email" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none" placeholder="Enter your password" />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary-dark text-white py-2.5 rounded-lg font-medium transition disabled:opacity-50">
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">
          Don&apos;t have an account?{' '}
          <button onClick={onSwitchToRegister} className="text-primary font-medium hover:underline">Register</button>
        </p>
      </div>
    </div>
  );
}
