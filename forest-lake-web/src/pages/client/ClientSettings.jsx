import { useState } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';

export default function ClientSettings() {
  const [form, setForm] = useState({ current_password: '', new_password: '', confirm_password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.new_password !== form.confirm_password) {
      toast.error('Passwords do not match');
      return;
    }
    if (form.new_password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      await api.put('/users/change-password.php', { current_password: form.current_password, new_password: form.new_password });
      toast.success('Password changed successfully!');
      setForm({ current_password: '', new_password: '', confirm_password: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md">
      <h1 className="text-2xl font-bold text-primary-dark mb-6">Settings</h1>
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="font-semibold text-gray-800 mb-4">Change Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
            <input type="password" value={form.current_password} onChange={e => setForm({ ...form, current_password: e.target.value })} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <input type="password" value={form.new_password} onChange={e => setForm({ ...form, new_password: e.target.value })} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
            <input type="password" value={form.confirm_password} onChange={e => setForm({ ...form, confirm_password: e.target.value })} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
          </div>
          <button type="submit" disabled={loading} className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg font-medium transition disabled:opacity-50">
            {loading ? 'Changing...' : 'Change Password'}
          </button>
        </form>
      </div>
    </div>
  );
}
