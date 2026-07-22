import { useEffect, useState } from 'react';
import api from '../../utils/api';
import SearchBar from '../../components/SearchBar';
import FilterDropdown from '../../components/FilterDropdown';
import StatusBadge from '../../components/StatusBadge';
import { TableSkeleton } from '../../components/LoadingSkeleton';
import toast from 'react-hot-toast';

export default function AdminClients() {
  const [clients, setClients] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const fetchClients = () => {
    api.get('/admin/users.php')
      .then(res => { setClients(res.data.data || []); setFiltered(res.data.data || []); })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchClients(); }, []);

  useEffect(() => {
    let result = clients;
    if (search) result = result.filter(c => `${c.first_name} ${c.last_name} ${c.email}`.toLowerCase().includes(search.toLowerCase()));
    if (statusFilter) result = result.filter(c => c.status === statusFilter);
    setFiltered(result);
  }, [search, statusFilter, clients]);

  const toggleStatus = async (userId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    try {
      await api.put('/admin/user-status.php', { user_id: userId, status: newStatus });
      toast.success(`Account ${newStatus === 'active' ? 'activated' : 'deactivated'}`);
      fetchClients();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update status');
    }
  };

  if (loading) return <TableSkeleton />;

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary-dark mb-6">Client Management</h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1"><SearchBar onSearch={setSearch} placeholder="Search clients..." /></div>
        <FilterDropdown label="All Statuses" value={statusFilter} onChange={setStatusFilter} options={[
          { value: 'active', label: 'Active' },
          { value: 'inactive', label: 'Inactive' },
          { value: 'unverified', label: 'Unverified' },
        ]} />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Name</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Email</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Contact</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Verified</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(c => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{c.first_name} {c.last_name}</td>
                  <td className="px-4 py-3 text-gray-600">{c.email}</td>
                  <td className="px-4 py-3 text-gray-600">{c.contact_number}</td>
                  <td className="px-4 py-3"><StatusBadge status={c.status} /></td>
                  <td className="px-4 py-3">{c.email_verified ? '✅' : '❌'}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleStatus(c.user_id || c.id, c.status)}
                      className={`text-xs px-3 py-1 rounded-lg font-medium transition ${c.status === 'active' ? 'bg-red-100 text-red-700 hover:bg-red-200' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}
                    >
                      {c.status === 'active' ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <p className="text-center text-gray-500 py-8">No clients found.</p>}
      </div>
    </div>
  );
}
