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
    if (form.password !== form.confirm_password) {
      toast.error('Passwords do not match');
      return;
    }
    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    try {
      await register(form);
      onClose();
    } catch { /* handled */ }
  };

  const fields = [
    { name: 'first_name', label: 'First Name', type: 'text', required: true },
    { name: 'middle_name', label: 'Middle Name', type: 'text', required: false },
    { name: 'last_name', label: 'Last Name', type: 'text', required: true },
    { name: 'contact_number', label: 'Contact Number', type: 'tel', required: true },
    { name: 'email', label: 'Email Address', type: 'email', required: true },
    { name: 'address', label: 'Address', type: 'text', required: true },
    { name: 'password', label: 'Password', type: 'password', required: true },
    { name: 'confirm_password', label: 'Confirm Password', type: 'password', required: true },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 relative max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl" aria-label="Close">&times;</button>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-primary-dark">Create Account</h2>
          <p className="text-gray-500 mt-1">Join Forest Lake Sum-ag</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          {fields.map(f => (
            <div key={f.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}{f.required && <span className="text-red-500">*</span>}</label>
              <input type={f.type} name={f.name} value={form[f.name]} onChange={handleChange} required={f.required} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none" placeholder={f.label} />
            </div>
          ))}
          <button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary-dark text-white py-2.5 rounded-lg font-medium transition disabled:opacity-50 mt-4">
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{' '}
          <button onClick={onSwitchToLogin} className="text-primary font-medium hover:underline">Login</button>
        </p>
      </div>
    </div>
  );
}
