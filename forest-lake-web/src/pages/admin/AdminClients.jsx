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
    <div className="animate-fade-in-up">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Client Management</h1>
        <p className="text-gray-500 mt-1">Manage all registered client accounts.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1"><SearchBar onSearch={setSearch} placeholder="Search clients..." /></div>
        <FilterDropdown label="All Statuses" value={statusFilter} onChange={setStatusFilter} options={[
          { value: 'active', label: 'Active' },
          { value: 'inactive', label: 'Inactive' },
          { value: 'unverified', label: 'Unverified' },
        ]} />
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50/80">
              <tr>
                <th className="text-left px-5 py-4 font-semibold text-gray-600 text-xs uppercase tracking-wider">Name</th>
                <th className="text-left px-5 py-4 font-semibold text-gray-600 text-xs uppercase tracking-wider">Email</th>
                <th className="text-left px-5 py-4 font-semibold text-gray-600 text-xs uppercase tracking-wider">Contact</th>
                <th className="text-left px-5 py-4 font-semibold text-gray-600 text-xs uppercase tracking-wider">Status</th>
                <th className="text-left px-5 py-4 font-semibold text-gray-600 text-xs uppercase tracking-wider">Verified</th>
                <th className="text-left px-5 py-4 font-semibold text-gray-600 text-xs uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(c => (
                <tr key={c.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-4 font-medium text-gray-900">{c.first_name} {c.last_name}</td>
                  <td className="px-5 py-4 text-gray-600">{c.email}</td>
                  <td className="px-5 py-4 text-gray-600">{c.contact_number}</td>
                  <td className="px-5 py-4"><StatusBadge status={c.status} /></td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1 text-xs font-medium ${c.email_verified ? 'text-green-600' : 'text-gray-400'}`}>
                      {c.email_verified ? '✓ Verified' : '✗ No'}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => toggleStatus(c.user_id || c.id, c.status)}
                      className={`text-xs px-3.5 py-1.5 rounded-lg font-medium transition-all ${c.status === 'active' ? 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-100' : 'bg-green-50 text-green-600 hover:bg-green-100 border border-green-100'}`}
                    >
                      {c.status === 'active' ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-sm">No clients found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
