import { useEffect, useState } from 'react';
import api from '../../utils/api';
import CemeteryMap from '../../components/CemeteryMap';
import Modal from '../../components/Modal';
import { MapSkeleton } from '../../components/LoadingSkeleton';
import toast from 'react-hot-toast';

export default function AdminBurialLotsMap() {
  const [lots, setLots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ lot_number: '', section: '', block: '', latitude: '', longitude: '', status: 'available', description: '' });
  const [saving, setSaving] = useState(false);

  const fetchLots = () => {
    api.get('/burial-lots/list.php').then(r => setLots(r.data.data || [])).catch(() => {}).finally(() => setLoading(false));
  };
  useEffect(fetchLots, []);

  const onMapClick = (coords) => {
    setForm({ lot_number: '', section: '', block: '', latitude: coords.lat.toFixed(6), longitude: coords.lng.toFixed(6), status: 'available', description: '' });
    setShowModal(true);
  };

  const handleSave = async (e) => {``
    e.preventDefault();
    setSaving(true);
    try {
      await api.post('/burial-lots/create.php', form);
      toast.success('Burial lot created!');
      setShowModal(false);
      fetchLots();
    } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
    finally { setSaving(false); }
  };

  if (loading) return <MapSkeleton />;

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary-dark mb-2">Cemetery Map</h1>
      <p className="text-sm text-gray-500 mb-4">Click the map to add a new burial lot at that location.</p>

      <div className="flex gap-4 mb-4 text-sm">
        <span className="flex items-center gap-1"><span className="w-3 h-3 bg-available rounded-full"></span> Available</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 bg-reserved rounded-full"></span> Reserved</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 bg-occupied rounded-full"></span> Occupied</span>
      </div>

      <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200">
        <CemeteryMap lots={lots} height="550px" onMapClick={onMapClick} />
      </div>

      {showModal && (
        <Modal title="Add Burial Lot" onClose={() => setShowModal(false)}>
          <p className="text-xs text-gray-500 mb-3">Lat: {form.latitude}, Lng: {form.longitude}</p>
          <form onSubmit={handleSave} className="space-y-3">
            <input type="text" placeholder="Lot Number" value={form.lot_number} onChange={e => setForm({...form, lot_number: e.target.value})} required className="w-full px-3 py-2 border rounded-lg" />
            <input type="text" placeholder="Section" value={form.section} onChange={e => setForm({...form, section: e.target.value})} required className="w-full px-3 py-2 border rounded-lg" />
            <input type="text" placeholder="Block" value={form.block} onChange={e => setForm({...form, block: e.target.value})} required className="w-full px-3 py-2 border rounded-lg" />
            <textarea placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full px-3 py-2 border rounded-lg" rows="2" />
            <button type="submit" disabled={saving} className="w-full bg-primary text-white py-2 rounded-lg disabled:opacity-50">{saving ? 'Saving...' : 'Create Lot'}</button>
          </form>
        </Modal>
      )}
    </div>
  );
}
