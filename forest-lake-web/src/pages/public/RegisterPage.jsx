import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const { register, loading } = useAuth();
  const [form, setForm] = useState({
    first_name: '', middle_name: '', last_name: '',
    contact_number: '', email: '', address: '',
    password: '', confirm_password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm_password) { toast.error('Passwords do not match'); return; }
    if (form.password.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    try {
      await register(form);
      setSuccess(true);
    } catch { /* handled */ }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-10 max-w-md text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Account Created!</h2>
          <p className="text-gray-600 mb-6">We've sent a verification email to your inbox. Please verify your email address to activate your account.</p>
          <Link to="/login" className="inline-block bg-gradient-to-r from-primary to-primary-accent text-white px-8 py-3 rounded-2xl font-semibold transition-all hover:shadow-lg">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left - Brand Panel */}
      <div className="hidden lg:flex lg:w-2/5 relative bg-gradient-to-br from-primary-dark via-primary-mid to-primary items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50"></div>
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary-light/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="relative text-center max-w-sm">
          <img src="/src/assets/global/forest-lake-logo-white.png" alt="Forest Lake" className="h-40 w-auto mx-auto mb-10" />
          <h2 className="text-3xl font-bold text-white mb-4">Join Our Community</h2>
          <p className="text-green-100/70 text-lg leading-relaxed">Create your account to reserve burial lots, manage your records, and access all our services online.</p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <span className="bg-white/10 text-white/80 text-xs px-3 py-1.5 rounded-full border border-white/20">✓ Free Registration</span>
            <span className="bg-white/10 text-white/80 text-xs px-3 py-1.5 rounded-full border border-white/20">✓ Email Verification</span>
            <span className="bg-white/10 text-white/80 text-xs px-3 py-1.5 rounded-full border border-white/20">✓ Secure Account</span>
          </div>
        </div>
      </div>

      {/* Right - Register Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 bg-gray-50">
        <div className="w-full max-w-lg">
          <div className="lg:hidden text-center mb-8">
            <img src="/src/assets/global/forest-lake-logo.png" alt="Forest Lake" className="h-16 w-auto mx-auto" />
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sm:p-10">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
              <p className="text-gray-500">Fill in your details to get started</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">First Name <span className="text-red-400">*</span></label>
                  <input type="text" name="first_name" value={form.first_name} onChange={handleChange} required placeholder="Juan" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white outline-none transition text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Last Name <span className="text-red-400">*</span></label>
                  <input type="text" name="last_name" value={form.last_name} onChange={handleChange} required placeholder="Dela Cruz" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white outline-none transition text-sm" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Middle Name</label>
                <input type="text" name="middle_name" value={form.middle_name} onChange={handleChange} placeholder="Santos" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white outline-none transition text-sm" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Contact Number <span className="text-red-400">*</span></label>
                <input type="tel" name="contact_number" value={form.contact_number} onChange={handleChange} required placeholder="09XX XXX XXXX" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white outline-none transition text-sm" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address <span className="text-red-400">*</span></label>
                <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="you@example.com" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white outline-none transition text-sm" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Address <span className="text-red-400">*</span></label>
                <input type="text" name="address" value={form.address} onChange={handleChange} required placeholder="Complete address" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white outline-none transition text-sm" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Password <span className="text-red-400">*</span></label>
                  <div className="relative">
                    <input type={showPassword ? 'text' : 'password'} name="password" value={form.password} onChange={handleChange} required placeholder="Min. 6 characters" className="w-full px-4 pr-11 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white outline-none transition text-sm" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password <span className="text-red-400">*</span></label>
                  <input type="password" name="confirm_password" value={form.confirm_password} onChange={handleChange} required placeholder="••••••••" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white outline-none transition text-sm" />
                </div>
              </div>

              <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-primary to-primary-accent text-white py-4 rounded-2xl font-semibold text-base transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 mt-2">
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Creating Account...
                  </span>
                ) : 'Create Account'}
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
              Already have an account?{' '}
              <Link to="/login" className="text-primary font-semibold hover:underline">Sign in</Link>
            </p>
          </div>

          <Link to="/" className="block text-center text-sm text-gray-400 mt-6 hover:text-gray-600 transition">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
