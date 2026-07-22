import { useEffect, useState } from 'react';
import api from '../../utils/api';
import SearchBar from '../../components/SearchBar';
import FilterDropdown from '../../components/FilterDropdown';
import StatusBadge from '../../components/StatusBadge';
import Modal from '../../components/Modal';
import { TableSkeleton } from '../../components/LoadingSkeleton';
import { formatDate } from '../../utils/helpers';
import toast from 'react-hot-toast';

export default function AdminReservations() {
  const [reservations, setReservations] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selected, setSelected] = useState(null);
  const [remarks, setRemarks] = useState('');
  const [processing, setProcessing] = useState(false);

  const fetchData = () => {
    api.get('/reservations/list.php?role=admin')
      .then(res => { setReservations(res.data.data || []); setFiltered(res.data.data || []); })
      .catch(() => {})
      .finally(() => setLoading(false));
  };
  useEffect(fetchData, []);

  useEffect(() => {
    let result = reservations;
    if (search) result = result.filter(r => `${r.client_name || ''} ${r.lot_number || ''}`.toLowerCase().includes(search.toLowerCase()));
    if (statusFilter) result = result.filter(r => r.status === statusFilter);
    setFiltered(result);
  }, [search, statusFilter, reservations]);

  const handleAction = async (action) => {
    if (!selected) return;
    setProcessing(true);
    const endpoint = action === 'approve' ? '/reservations/approve.php' : '/reservations/decline.php';
    try {
      await api.put(endpoint, { id: selected.id, admin_remarks: remarks });
      toast.success(`Reservation ${action}d!`);
      setSelected(null);
      setRemarks('');
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Action failed');
    } finally { setProcessing(false); }
  };

  if (loading) return <TableSkeleton />;

  return (
    <div className="animate-fade-in-up">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Reservations</h1>
        <p className="text-gray-500 mt-1">Review and manage reservation requests.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1"><SearchBar onSearch={setSearch} placeholder="Search reservations..." /></div>
        <FilterDropdown label="All Statuses" value={statusFilter} onChange={setStatusFilter} options={[
          { value: 'pending', label: 'Pending' },
          { value: 'approved', label: 'Approved' },
          { value: 'declined', label: 'Declined' },
          { value: 'cancelled', label: 'Cancelled' },
        ]} />
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50/80">
              <tr>
                <th className="text-left px-5 py-4 font-semibold text-gray-600 text-xs uppercase tracking-wider">ID</th>
                <th className="text-left px-5 py-4 font-semibold text-gray-600 text-xs uppercase tracking-wider">Client</th>
                <th className="text-left px-5 py-4 font-semibold text-gray-600 text-xs uppercase tracking-wider">Lot</th>
                <th className="text-left px-5 py-4 font-semibold text-gray-600 text-xs uppercase tracking-wider">Date</th>
                <th className="text-left px-5 py-4 font-semibold text-gray-600 text-xs uppercase tracking-wider">Status</th>
                <th className="text-left px-5 py-4 font-semibold text-gray-600 text-xs uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(r => (
                <tr key={r.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-4 font-mono text-gray-500">#{r.id}</td>
                  <td className="px-5 py-4 font-medium text-gray-900">{r.client_name || 'N/A'}</td>
                  <td className="px-5 py-4 text-gray-600">{r.lot_number} <span className="text-gray-400">({r.section})</span></td>
                  <td className="px-5 py-4 text-gray-500">{formatDate(r.reservation_date || r.created_at)}</td>
                  <td className="px-5 py-4"><StatusBadge status={r.status} /></td>
                  <td className="px-5 py-4">
                    {r.status === 'pending' && (
                      <button onClick={() => { setSelected(r); setRemarks(''); }} className="text-xs bg-blue-50 text-blue-600 px-3.5 py-1.5 rounded-lg font-medium hover:bg-blue-100 border border-blue-100 transition">
                        Review
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <div className="text-center py-16"><p className="text-gray-400 text-sm">No reservations found.</p></div>}
      </div>

      {selected && (
        <Modal title={`Review Reservation #${selected.id}`} onClose={() => setSelected(null)}>
          <div className="bg-gray-50 rounded-xl p-4 mb-5 space-y-2">
            <div className="flex justify-between text-sm"><span className="text-gray-500">Client</span><span className="font-medium text-gray-900">{selected.client_name}</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-500">Lot</span><span className="font-medium">{selected.lot_number} · {selected.section} · {selected.block}</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-500">Requested</span><span className="font-medium">{formatDate(selected.reservation_date || selected.created_at)}</span></div>
          </div>
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Admin Remarks</label>
            <textarea value={remarks} onChange={e => setRemarks(e.target.value)} rows="3" className="input-modern resize-none" placeholder="Optional remarks..." />
          </div>
          <div className="flex gap-3">
            <button onClick={() => handleAction('decline')} disabled={processing} className="flex-1 bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 py-3 rounded-xl font-semibold transition disabled:opacity-50">Decline</button>
            <button onClick={() => handleAction('approve')} disabled={processing} className="flex-1 btn-primary">Approve</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
