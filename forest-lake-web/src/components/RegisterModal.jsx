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
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState('');
  const [step, setStep] = useState(1);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm_password) { toast.error('Passwords do not match'); return; }
    if (form.password.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    try { await register(form); onClose(); } catch { /* handled */ }
  };

  const canProceed = form.first_name && form.last_name && form.contact_number && form.email && form.address;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in" onClick={onClose}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 relative max-h-[90vh] overflow-y-auto animate-scale-in" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200" aria-label="Close">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-4 ring-4 ring-primary/5">
            <img src="/src/assets/global/forest-lake-logo.png" alt="Forest Lake" className="h-9 w-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
          <p className="text-gray-500 mt-1 text-sm">
            {step === 1 ? 'Fill in your personal details' : 'Set up your password'}
          </p>
        </div>

        {/* Progress bar */}
        <div className="flex gap-2 mb-6">
          <div className="flex-1 h-1.5 rounded-full bg-primary transition-all duration-300"></div>
          <div className={`flex-1 h-1.5 rounded-full transition-all duration-300 ${step === 2 ? 'bg-primary' : 'bg-gray-200'}`}></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">First Name<span className="text-red-400 ml-0.5">*</span></label>
                  <div className={`rounded-xl transition-all duration-200 ${focused === 'first_name' ? 'ring-2 ring-primary/20' : ''}`}>
                    <input type="text" name="first_name" value={form.first_name} onChange={handleChange} onFocus={() => setFocused('first_name')} onBlur={() => setFocused('')} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:bg-white outline-none transition-all duration-200 text-sm" placeholder="First Name" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Last Name<span className="text-red-400 ml-0.5">*</span></label>
                  <div className={`rounded-xl transition-all duration-200 ${focused === 'last_name' ? 'ring-2 ring-primary/20' : ''}`}>
                    <input type="text" name="last_name" value={form.last_name} onChange={handleChange} onFocus={() => setFocused('last_name')} onBlur={() => setFocused('')} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:bg-white outline-none transition-all duration-200 text-sm" placeholder="Last Name" />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Middle Name</label>
                <div className={`rounded-xl transition-all duration-200 ${focused === 'middle_name' ? 'ring-2 ring-primary/20' : ''}`}>
                  <input type="text" name="middle_name" value={form.middle_name} onChange={handleChange} onFocus={() => setFocused('middle_name')} onBlur={() => setFocused('')} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:bg-white outline-none transition-all duration-200 text-sm" placeholder="Middle Name (optional)" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Contact Number<span className="text-red-400 ml-0.5">*</span></label>
                <div className={`relative rounded-xl transition-all duration-200 ${focused === 'contact_number' ? 'ring-2 ring-primary/20' : ''}`}>
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-200" style={{ color: focused === 'contact_number' ? 'var(--color-primary)' : undefined }}>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </span>
                  <input type="tel" name="contact_number" value={form.contact_number} onChange={handleChange} onFocus={() => setFocused('contact_number')} onBlur={() => setFocused('')} required className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:bg-white outline-none transition-all duration-200 text-sm" placeholder="09XX XXX XXXX" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address<span className="text-red-400 ml-0.5">*</span></label>
                <div className={`relative rounded-xl transition-all duration-200 ${focused === 'email' ? 'ring-2 ring-primary/20' : ''}`}>
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-200" style={{ color: focused === 'email' ? 'var(--color-primary)' : undefined }}>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </span>
                  <input type="email" name="email" value={form.email} onChange={handleChange} onFocus={() => setFocused('email')} onBlur={() => setFocused('')} required className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:bg-white outline-none transition-all duration-200 text-sm" placeholder="you@example.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Address<span className="text-red-400 ml-0.5">*</span></label>
                <div className={`relative rounded-xl transition-all duration-200 ${focused === 'address' ? 'ring-2 ring-primary/20' : ''}`}>
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-200" style={{ color: focused === 'address' ? 'var(--color-primary)' : undefined }}>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </span>
                  <input type="text" name="address" value={form.address} onChange={handleChange} onFocus={() => setFocused('address')} onBlur={() => setFocused('')} required className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:bg-white outline-none transition-all duration-200 text-sm" placeholder="Complete address" />
                </div>
              </div>
              <button type="button" onClick={() => setStep(2)} disabled={!canProceed} className="w-full bg-gradient-to-r from-primary to-primary-accent text-white py-3.5 rounded-2xl font-semibold text-sm transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:hover:translate-y-0 disabled:shadow-md mt-2 group">
                <span className="flex items-center justify-center gap-2">
                  Continue
                  <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </span>
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <div className="bg-gray-50 rounded-xl p-3.5 border border-gray-100">
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Password must be at least 6 characters.
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Password<span className="text-red-400 ml-0.5">*</span></label>
                <div className={`relative rounded-xl transition-all duration-200 ${focused === 'password' ? 'ring-2 ring-primary/20' : ''}`}>
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-200" style={{ color: focused === 'password' ? 'var(--color-primary)' : undefined }}>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  </span>
                  <input type={showPassword ? 'text' : 'password'} name="password" value={form.password} onChange={handleChange} onFocus={() => setFocused('password')} onBlur={() => setFocused('')} required className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:bg-white outline-none transition-all duration-200 text-sm" placeholder="••••••••" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200">
                    {showPassword ? (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    )}
                  </button>
                </div>
                {form.password && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 h-1 rounded-full bg-gray-200 overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-300 ${form.password.length >= 8 ? 'w-full bg-primary' : form.password.length >= 6 ? 'w-2/3 bg-yellow-400' : 'w-1/3 bg-red-400'}`}></div>
                    </div>
                    <span className={`text-xs font-medium ${form.password.length >= 8 ? 'text-primary' : form.password.length >= 6 ? 'text-yellow-600' : 'text-red-500'}`}>
                      {form.password.length >= 8 ? 'Strong' : form.password.length >= 6 ? 'Fair' : 'Weak'}
                    </span>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password<span className="text-red-400 ml-0.5">*</span></label>
                <div className={`relative rounded-xl transition-all duration-200 ${focused === 'confirm_password' ? 'ring-2 ring-primary/20' : ''}`}>
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-200" style={{ color: focused === 'confirm_password' ? 'var(--color-primary)' : undefined }}>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  </span>
                  <input type="password" name="confirm_password" value={form.confirm_password} onChange={handleChange} onFocus={() => setFocused('confirm_password')} onBlur={() => setFocused('')} required className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:bg-white outline-none transition-all duration-200 text-sm" placeholder="Re-enter password" />
                </div>
                {form.confirm_password && form.password !== form.confirm_password && (
                  <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Passwords do not match
                  </p>
                )}
                {form.confirm_password && form.password === form.confirm_password && (
                  <p className="mt-1.5 text-xs text-primary flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    Passwords match
                  </p>
                )}
              </div>
              <div className="flex gap-3 mt-2">
                <button type="button" onClick={() => setStep(1)} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3.5 rounded-2xl font-semibold text-sm transition-all duration-200">
                  <span className="flex items-center justify-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Back
                  </span>
                </button>
                <button type="submit" disabled={loading} className="flex-[2] bg-gradient-to-r from-primary to-primary-accent text-white py-3.5 rounded-2xl font-semibold text-sm transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:hover:translate-y-0 disabled:shadow-md">
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Creating...
                    </span>
                  ) : 'Create Account'}
                </button>
              </div>
            </div>
          )}
        </form>

        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
          <div className="relative flex justify-center text-xs"><span className="bg-white px-3 text-gray-400">or</span></div>
        </div>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{' '}
          <button onClick={onSwitchToLogin} className="text-primary font-semibold hover:underline">Sign in</button>
        </p>
      </div>
    </div>
  );
}
