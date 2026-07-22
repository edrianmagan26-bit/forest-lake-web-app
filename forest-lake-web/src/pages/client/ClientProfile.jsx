import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';
import toast from 'react-hot-toast';

export default function ClientProfile() {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState({ first_name: '', middle_name: '', last_name: '', contact_number: '', address: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get('/users/profile.php').then(res => {
      const p = res.data.profile || res.data;
      setForm({ first_name: p.first_name || '', middle_name: p.middle_name || '', last_name: p.last_name || '', contact_number: p.contact_number || '', address: p.address || '' });
    }).catch(() => {});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put('/users/update.php', form);
      setUser({ ...user, first_name: form.first_name });
      toast.success('Profile updated!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-primary-dark mb-6">My Profile</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input type="text" value={form.first_name} onChange={e => setForm({ ...form, first_name: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
            <input type="text" value={form.middle_name} onChange={e => setForm({ ...form, middle_name: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
          <input type="text" value={form.last_name} onChange={e => setForm({ ...form, last_name: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
          <input type="tel" value={form.contact_number} onChange={e => setForm({ ...form, contact_number: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <input type="text" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
        </div>
        <button type="submit" disabled={loading} className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg font-medium transition disabled:opacity-50">
          {loading ? 'Saving...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
}
