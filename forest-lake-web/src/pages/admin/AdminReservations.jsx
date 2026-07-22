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
    <div>
      <h1 className="text-2xl font-bold text-primary-dark mb-6">Reservation Management</h1>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1"><SearchBar onSearch={setSearch} placeholder="Search reservations..." /></div>
        <FilterDropdown label="All Statuses" value={statusFilter} onChange={setStatusFilter} options={[
          { value: 'pending', label: 'Pending' },
          { value: 'approved', label: 'Approved' },
          { value: 'declined', label: 'Declined' },
          { value: 'cancelled', label: 'Cancelled' },
        ]} />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">ID</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Client</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Lot</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Date</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(r => (
                <tr key={r.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">#{r.id}</td>
                  <td className="px-4 py-3">{r.client_name || 'N/A'}</td>
                  <td className="px-4 py-3">{r.lot_number} ({r.section})</td>
                  <td className="px-4 py-3 text-gray-500">{formatDate(r.reservation_date || r.created_at)}</td>
                  <td className="px-4 py-3"><StatusBadge status={r.status} /></td>
                  <td className="px-4 py-3">
                    {r.status === 'pending' && (
                      <button onClick={() => { setSelected(r); setRemarks(''); }} className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-200">Review</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <p className="text-center text-gray-500 py-8">No reservations found.</p>}
      </div>

      {selected && (
        <Modal title={`Review Reservation #${selected.id}`} onClose={() => setSelected(null)}>
          <div className="text-sm space-y-2 mb-4">
            <p><span className="font-medium">Client:</span> {selected.client_name}</p>
            <p><span className="font-medium">Lot:</span> {selected.lot_number} | Section: {selected.section} | Block: {selected.block}</p>
            <p><span className="font-medium">Requested:</span> {formatDate(selected.reservation_date || selected.created_at)}</p>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Admin Remarks</label>
            <textarea value={remarks} onChange={e => setRemarks(e.target.value)} rows="3" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" placeholder="Optional remarks..." />
          </div>
          <div className="flex gap-3">
            <button onClick={() => handleAction('decline')} disabled={processing} className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition disabled:opacity-50">Decline</button>
            <button onClick={() => handleAction('approve')} disabled={processing} className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition disabled:opacity-50">Approve</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
