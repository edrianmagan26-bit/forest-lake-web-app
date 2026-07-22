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
    } finally { setLoading(false); }
  };

  return (
    <div className="max-w-2xl animate-fade-in-up">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-500 mt-1">Update your personal information.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-7 border border-gray-100 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">First Name</label>
            <input type="text" value={form.first_name} onChange={e => setForm({ ...form, first_name: e.target.value })} className="input-modern" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Middle Name</label>
            <input type="text" value={form.middle_name} onChange={e => setForm({ ...form, middle_name: e.target.value })} className="input-modern" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Last Name</label>
          <input type="text" value={form.last_name} onChange={e => setForm({ ...form, last_name: e.target.value })} className="input-modern" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Contact Number</label>
          <input type="tel" value={form.contact_number} onChange={e => setForm({ ...form, contact_number: e.target.value })} className="input-modern" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Address</label>
          <input type="text" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} className="input-modern" />
        </div>
        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? 'Saving...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
}
