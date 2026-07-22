import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function RegisterModal({ onClose, onSwitchToLogin }) {
  const { register, loading } = useAuth();
  const [form, setForm] = useState({
    first_name: '', middle_name: '', last_name: '',
    contact_number: '', email: '', address: '',
    password: '', confirm_password: '',
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm_password) { toast.error('Passwords do not match'); return; }
    if (form.password.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    try { await register(form); onClose(); } catch { /* handled */ }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in" onClick={onClose}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 relative max-h-[90vh] overflow-y-auto animate-scale-in" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all" aria-label="Close">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🌲</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
          <p className="text-gray-500 mt-1 text-sm">Join Forest Lake Sum-ag</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">First Name<span className="text-red-400 ml-0.5">*</span></label>
              <input type="text" name="first_name" value={form.first_name} onChange={handleChange} required className="input-modern" placeholder="First Name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Last Name<span className="text-red-400 ml-0.5">*</span></label>
              <input type="text" name="last_name" value={form.last_name} onChange={handleChange} required className="input-modern" placeholder="Last Name" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Middle Name</label>
            <input type="text" name="middle_name" value={form.middle_name} onChange={handleChange} className="input-modern" placeholder="Middle Name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Contact Number<span className="text-red-400 ml-0.5">*</span></label>
            <input type="tel" name="contact_number" value={form.contact_number} onChange={handleChange} required className="input-modern" placeholder="Contact Number" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address<span className="text-red-400 ml-0.5">*</span></label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required className="input-modern" placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Address<span className="text-red-400 ml-0.5">*</span></label>
            <input type="text" name="address" value={form.address} onChange={handleChange} required className="input-modern" placeholder="Address" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password<span className="text-red-400 ml-0.5">*</span></label>
              <input type="password" name="password" value={form.password} onChange={handleChange} required className="input-modern" placeholder="••••••••" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm<span className="text-red-400 ml-0.5">*</span></label>
              <input type="password" name="confirm_password" value={form.confirm_password} onChange={handleChange} required className="input-modern" placeholder="••••••••" />
            </div>
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full mt-2">
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{' '}
          <button onClick={onSwitchToLogin} className="text-primary font-semibold hover:underline">Sign in</button>
        </p>
      </div>
    </div>
  );
}
