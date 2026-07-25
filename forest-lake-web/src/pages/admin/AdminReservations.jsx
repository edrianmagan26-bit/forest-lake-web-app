import { useEffect, useState } from 'react';
import api from '../../utils/api';
import usePolling, { updateIfChanged } from '../../hooks/usePolling';
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
  const [statusFilter, setStatusFilter] = useState('pending');
  const [selected, setSelected] = useState(null);
  const [remarks, setRemarks] = useState('');
  const [processing, setProcessing] = useState(false);
  const [occupyModal, setOccupyModal] = useState(null);
  const [deceasedModal, setDeceasedModal] = useState(null);
  const [deceasedList, setDeceasedList] = useState([]);
  const [deceasedForm, setDeceasedForm] = useState({ name: '', date_of_birth: '', date_of_death: '', relationship_to_client: '', burial_date: '' });
  const [savingDeceased, setSavingDeceased] = useState(false);
  const [editingDeceased, setEditingDeceased] = useState(null);

  const fetchData = () => {
    api.get('/reservations/list.php?role=admin')
      .then(res => {
        const data = (res.data.data || []).filter(r => r.status !== 'occupied');
        setReservations(data);
        setFiltered(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };
  useEffect(fetchData, []);
  usePolling(() => {
    api.get('/reservations/list.php?role=admin')
      .then(res => {
        const data = (res.data.data || []).filter(r => r.status !== 'occupied');
        updateIfChanged(setReservations, data);
      })
      .catch(() => {});
  });

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

  const handleOccupy = async () => {
    if (!occupyModal) return;
    setProcessing(true);
    try {
      await api.put('/reservations/occupy.php', { id: occupyModal.id, admin_remarks: remarks });
      toast.success('Lot marked as occupied!');
      setOccupyModal(null);
      setRemarks('');
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed');
    } finally { setProcessing(false); }
  };

  const openDeceasedModal = async (reservation) => {
    setDeceasedModal(reservation);
    setDeceasedForm({ name: '', date_of_birth: '', date_of_death: '', relationship_to_client: '', burial_date: '' });
    setEditingDeceased(null);
    try {
      const res = await api.get(`/deceased/list.php?lot_id=${reservation.burial_lot_id}`);
      setDeceasedList(res.data.data || []);
    } catch { setDeceasedList([]); }
  };

  const handleSaveDeceased = async (e) => {
    e.preventDefault();
    if (!deceasedForm.name.trim()) { toast.error('Name is required'); return; }
    setSavingDeceased(true);
    try {
      if (editingDeceased) {
        await api.put('/deceased/update.php', { id: editingDeceased.id, ...deceasedForm });
        toast.success('Deceased info updated');
      } else {
        await api.post('/deceased/create.php', { burial_lot_id: deceasedModal.burial_lot_id, reservation_id: deceasedModal.id, ...deceasedForm });
        toast.success('Deceased info added');
      }
      setDeceasedForm({ name: '', date_of_birth: '', date_of_death: '', relationship_to_client: '', burial_date: '' });
      setEditingDeceased(null);
      setDeceasedModal(null);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed');
    } finally { setSavingDeceased(false); }
  };

  const handleDeleteDeceased = async (id) => {
    if (!confirm('Delete this deceased record?')) return;
    try {
      await api.delete(`/deceased/delete.php?id=${id}`);
      toast.success('Record deleted');
      const res = await api.get(`/deceased/list.php?lot_id=${deceasedModal.burial_lot_id}`);
      setDeceasedList(res.data.data || []);
    } catch { toast.error('Delete failed'); }
  };

  const startEditDeceased = (d) => {
    setEditingDeceased(d);
    setDeceasedForm({ name: d.name, date_of_birth: d.date_of_birth || '', date_of_death: d.date_of_death || '', relationship_to_client: d.relationship_to_client || '', burial_date: d.burial_date || '' });
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
                  <td className="px-5 py-4 font-mono text-gray-500">{r.serial_number || `#${r.id}`}</td>
                  <td className="px-5 py-4 font-medium text-gray-900">{r.client_name || 'N/A'}</td>
                  <td className="px-5 py-4 text-gray-600">{r.lot_number} <span className="text-gray-400">({r.section})</span></td>
                  <td className="px-5 py-4 text-gray-500">{formatDate(r.reservation_date || r.created_at)}</td>
                  <td className="px-5 py-4"><StatusBadge status={r.status} /></td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5">
                      {r.status === 'pending' && (
                        <button onClick={() => { setSelected(r); setRemarks(''); }} className="text-xs bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg font-medium hover:bg-blue-100 border border-blue-100 transition">
                          Review
                        </button>
                      )}
                      {r.status === 'approved' && (
                        <button onClick={() => { setOccupyModal(r); setRemarks(''); }} className="text-xs bg-amber-50 text-amber-700 px-3 py-1.5 rounded-lg font-medium hover:bg-amber-100 border border-amber-100 transition">
                          Mark Occupied
                        </button>
                      )}
                      {(r.status === 'occupied' || r.status === 'approved') && (
                        <button onClick={() => openDeceasedModal(r)} className="text-xs bg-purple-50 text-purple-600 px-3 py-1.5 rounded-lg font-medium hover:bg-purple-100 border border-purple-100 transition">
                          Deceased Info
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <div className="text-center py-16"><p className="text-gray-400 text-sm">No reservations found.</p></div>}
      </div>

      {/* Review Modal (pending) */}
      {selected && (
        <Modal title={`Review Reservation ${selected.serial_number || '#' + selected.id}`} onClose={() => setSelected(null)}>
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

      {/* Mark as Occupied Modal */}
      {occupyModal && (
        <Modal title={`Mark as Occupied — Lot ${occupyModal.lot_number}`} onClose={() => setOccupyModal(null)}>
          <div className="bg-gray-50 rounded-xl p-4 mb-5 space-y-2">
            <div className="flex justify-between text-sm"><span className="text-gray-500">Client</span><span className="font-medium text-gray-900">{occupyModal.client_name}</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-500">Lot</span><span className="font-medium">{occupyModal.lot_number} · {occupyModal.section}</span></div>
          </div>
          <p className="text-sm text-gray-600 mb-4">This will change the lot status from <span className="font-medium text-amber-600">Reserved</span> to <span className="font-medium text-red-600">Occupied</span>.</p>
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Remarks (optional)</label>
            <textarea value={remarks} onChange={e => setRemarks(e.target.value)} rows="2" className="input-modern resize-none" placeholder="Optional remarks..." />
          </div>
          <button onClick={handleOccupy} disabled={processing} className="btn-primary w-full">
            {processing ? 'Processing...' : 'Confirm Occupation'}
          </button>
        </Modal>
      )}

      {/* Deceased Information Modal */}
      {deceasedModal && (
        <Modal title={`Deceased Information — Lot ${deceasedModal.lot_number}`} onClose={() => setDeceasedModal(null)}>
          {/* Existing records */}
          {deceasedList.length > 0 && (
            <div className="mb-6 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Records</p>
                <p className="text-xs text-gray-400">{deceasedList.length}/{deceasedModal.max_slots || 8} slots used</p>
              </div>
              {deceasedList.map(d => (
                <div key={d.id} className="bg-gray-50 rounded-xl p-4 text-sm space-y-1.5">
                  <div className="flex justify-between items-start">
                    <p className="font-semibold text-gray-900">{d.name}</p>
                    <div className="flex gap-1">
                      <button onClick={() => startEditDeceased(d)} className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                      </button>
                      <button onClick={() => handleDeleteDeceased(d.id)} className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </div>
                  {d.relationship_to_client && <p className="text-gray-500">Relationship: {d.relationship_to_client}</p>}
                  {d.date_of_birth && <p className="text-gray-500">Born: {d.date_of_birth}</p>}
                  {d.date_of_death && <p className="text-gray-500">Died: {d.date_of_death}</p>}
                  {d.burial_date && <p className="text-gray-500">Buried: {d.burial_date}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Add/Edit form — hide add form if at max and not editing */}
          {(editingDeceased || deceasedList.length < (deceasedModal.max_slots || 8)) ? (
            <form onSubmit={handleSaveDeceased} className="space-y-3">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{editingDeceased ? 'Edit Record' : 'Add New Record'}</p>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input type="text" value={deceasedForm.name} onChange={e => setDeceasedForm({...deceasedForm, name: e.target.value})} required className="input-modern" placeholder="Full name of deceased" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  <input type="date" value={deceasedForm.date_of_birth} onChange={e => setDeceasedForm({...deceasedForm, date_of_birth: e.target.value})} className="input-modern" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Death</label>
                  <input type="date" value={deceasedForm.date_of_death} onChange={e => setDeceasedForm({...deceasedForm, date_of_death: e.target.value})} className="input-modern" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Relationship to Client</label>
                  <input type="text" value={deceasedForm.relationship_to_client} onChange={e => setDeceasedForm({...deceasedForm, relationship_to_client: e.target.value})} className="input-modern" placeholder="e.g. Father, Mother" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Burial Date</label>
                  <input type="date" value={deceasedForm.burial_date} onChange={e => setDeceasedForm({...deceasedForm, burial_date: e.target.value})} className="input-modern" />
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                {editingDeceased && (
                  <button type="button" onClick={() => { setEditingDeceased(null); setDeceasedForm({ name: '', date_of_birth: '', date_of_death: '', relationship_to_client: '', burial_date: '' }); }} className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold transition hover:bg-gray-200">
                    Cancel
                  </button>
                )}
                <button type="submit" disabled={savingDeceased} className="flex-1 btn-primary">
                  {savingDeceased ? 'Saving...' : (editingDeceased ? 'Update' : 'Add Deceased Info')}
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-4 bg-amber-50 rounded-xl border border-amber-100">
              <p className="text-sm text-amber-700 font-medium">Maximum capacity reached ({deceasedModal.max_slots || 8}/{deceasedModal.max_slots || 8})</p>
              <p className="text-xs text-amber-600 mt-1">This lot has reached the maximum number of deceased records.</p>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}
