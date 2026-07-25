import { useEffect, useState } from 'react';
import api from '../../utils/api';
import usePolling, { updateIfChanged } from '../../hooks/usePolling';
import StatusBadge from '../../components/StatusBadge';
import Modal from '../../components/Modal';
import { CardSkeleton } from '../../components/LoadingSkeleton';
import toast from 'react-hot-toast';

export default function ClientManageLots() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deceasedModal, setDeceasedModal] = useState(null);
  const [deceasedList, setDeceasedList] = useState([]);
  const [deceasedForm, setDeceasedForm] = useState({ name: '', date_of_birth: '', date_of_death: '', relationship_to_client: '', burial_date: '' });
  const [savingDeceased, setSavingDeceased] = useState(false);
  const [editingDeceased, setEditingDeceased] = useState(null);

  useEffect(() => {
    api.get('/reservations/list.php')
      .then(res => {
        const data = res.data.data || [];
        setReservations(data.filter(r => r.status === 'approved' || r.status === 'occupied'));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  usePolling(() => {
    api.get('/reservations/list.php')
      .then(res => {
        const data = res.data.data || [];
        updateIfChanged(setReservations, data.filter(r => r.status === 'approved' || r.status === 'occupied'));
      })
      .catch(() => {});
  });

  const openDeceasedModal = async (reservation) => {
    setDeceasedModal(reservation);
    setEditingDeceased(null);
    try {
      const res = await api.get(`/deceased/list.php?reservation_id=${reservation.id}`);
      const records = res.data.data || [];
      setDeceasedList(records);
      if (records.length > 0) {
        const d = records[0];
        setEditingDeceased(d);
        setDeceasedForm({ name: d.name || '', date_of_birth: d.date_of_birth || '', date_of_death: d.date_of_death || '', relationship_to_client: d.relationship_to_client || '', burial_date: d.burial_date || '' });
      } else {
        setDeceasedForm({ name: '', date_of_birth: '', date_of_death: '', relationship_to_client: '', burial_date: '' });
      }
    } catch {
      setDeceasedList([]);
      setDeceasedForm({ name: '', date_of_birth: '', date_of_death: '', relationship_to_client: '', burial_date: '' });
    }
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
      toast.error(err.response?.data?.message || 'Failed to save');
    } finally { setSavingDeceased(false); }
  };

  const startEditDeceased = (d) => {
    setEditingDeceased(d);
    setDeceasedForm({ name: d.name || '', date_of_birth: d.date_of_birth || '', date_of_death: d.date_of_death || '', relationship_to_client: d.relationship_to_client || '', burial_date: d.burial_date || '' });
  };

  if (loading) return <CardSkeleton count={4} />;

  return (
    <div className="animate-fade-in-up">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Manage My Lots</h1>
        <p className="text-gray-500 mt-1">View and manage deceased information for your reserved lots.</p>
      </div>

      {reservations.length === 0 ? (
        <div className="bg-white rounded-2xl p-16 text-center border border-gray-100">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📦</span>
          </div>
          <p className="text-gray-500 font-medium">No active lots</p>
          <p className="text-sm text-gray-400 mt-1">Your approved reservations will appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 stagger-children">
          {reservations.map(r => (
            <div key={r.id} className="bg-white rounded-2xl p-6 border border-gray-100 card-hover">
              <div className="flex items-center justify-between mb-3">
                <StatusBadge status={r.status} />
                <span className="text-xs font-mono text-gray-400">{r.serial_number || `#${r.id}`}</span>
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-1">Lot {r.lot_number}</h3>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 mb-4">
                <span>Section: <span className="text-gray-700 font-medium">{r.section}</span></span>
                <span>Block: <span className="text-gray-700 font-medium">{r.block}</span></span>
              </div>
              <button onClick={() => openDeceasedModal(r)} className="w-full text-sm bg-purple-50 text-purple-600 px-4 py-2.5 rounded-xl font-medium hover:bg-purple-100 border border-purple-100 transition flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                Manage Deceased Info
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Deceased Information Modal */}
      {deceasedModal && (
        <Modal title={`Deceased Information — Lot ${deceasedModal.lot_number}`} onClose={() => setDeceasedModal(null)}>
          <p className="text-xs text-gray-400 mb-4">Serial: {deceasedModal.serial_number || `#${deceasedModal.id}`}</p>
          {deceasedList.length > 0 && (
            <div className="mb-6 space-y-3">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Your Deceased Record</p>
              {deceasedList.map(d => (
                <div key={d.id} className="bg-gray-50 rounded-xl p-4 text-sm space-y-1.5">
                  <div className="flex justify-between items-start">
                    <p className="font-semibold text-gray-900">{d.name}</p>
                    <button onClick={() => startEditDeceased(d)} className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition" title="Edit">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    </button>
                  </div>
                  {d.relationship_to_client && <p className="text-gray-500">Relationship: <span className="text-gray-700">{d.relationship_to_client}</span></p>}
                  {d.date_of_birth && <p className="text-gray-500">Born: <span className="text-gray-700">{d.date_of_birth}</span></p>}
                  {d.date_of_death && <p className="text-gray-500">Died: <span className="text-gray-700">{d.date_of_death}</span></p>}
                  {d.burial_date && <p className="text-gray-500">Burial Date: <span className="text-gray-700">{d.burial_date}</span></p>}
                </div>
              ))}
            </div>
          )}

          {(editingDeceased || deceasedList.length < 1) ? (
            <form onSubmit={handleSaveDeceased} className="space-y-3">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{editingDeceased ? 'Edit Record' : 'Add Deceased Information'}</p>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Relationship</label>
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
                  {savingDeceased ? 'Saving...' : (editingDeceased ? 'Update Info' : 'Add Deceased Info')}
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-4 bg-green-50 rounded-xl border border-green-100">
              <p className="text-sm text-green-700 font-medium">Deceased record submitted</p>
              <p className="text-xs text-green-600 mt-1">You can edit the record above if you need to make changes.</p>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}
