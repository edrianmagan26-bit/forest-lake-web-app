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
  const [form, setForm] = useState({ lot_number: '', section: '', block: '', square_meter: '', latitude: '', longitude: '', status: 'available', description: '' });
  const [saving, setSaving] = useState(false);
  const [coordMode, setCoordMode] = useState(false);
  const [coords, setCoords] = useState([]);

  const fetchLots = () => {
    api.get('/burial-lots/list.php').then(r => setLots(r.data.data || [])).catch(() => {}).finally(() => setLoading(false));
  };
  useEffect(fetchLots, []);

  const onMapClick = (clickCoords) => {
    if (coordMode) {
      setCoords(prev => [...prev, { lat: clickCoords.lat.toFixed(6), lng: clickCoords.lng.toFixed(6) }]);
      toast.success(`Point ${coords.length + 1}: ${clickCoords.lat.toFixed(6)}, ${clickCoords.lng.toFixed(6)}`);
      return;
    }
    setForm({ lot_number: '', section: '', block: '', square_meter: '', latitude: clickCoords.lat.toFixed(6), longitude: clickCoords.lng.toFixed(6), status: 'available', description: '' });
    setShowModal(true);
  };

  const handleSave = async (e) => {
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
    <div className="animate-fade-in-up">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Cemetery Map</h1>
        <p className="text-gray-500 mt-1">Click the map to add a new burial lot at that location.</p>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <span className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-full text-sm">
          <span className="w-3 h-3 bg-available rounded-full shadow-sm shadow-available/50"></span> Available
        </span>
        <span className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-full text-sm">
          <span className="w-3 h-3 bg-reserved rounded-full shadow-sm shadow-reserved/50"></span> Reserved
        </span>
        <span className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-full text-sm">
          <span className="w-3 h-3 bg-occupied rounded-full shadow-sm shadow-occupied/50"></span> Occupied
        </span>
        <button
          onClick={() => { setCoordMode(!coordMode); setCoords([]); }}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition ${coordMode ? 'bg-red-100 text-red-700 border border-red-300' : 'bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100'}`}
        >
          📐 {coordMode ? 'Exit Coord Picker' : 'Coord Picker'}
        </button>
      </div>

      {/* Coordinate picker results */}
      {coordMode && coords.length > 0 && (
        <div className="mb-4 bg-gray-900 text-green-400 rounded-xl p-4 font-mono text-xs overflow-x-auto">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400">Clicked coordinates ({coords.length} points):</span>
            <button onClick={() => { navigator.clipboard.writeText(coords.map(c => `{ lat: ${c.lat}, lng: ${c.lng} }`).join(',\n')); toast.success('Copied!'); }} className="text-blue-400 hover:text-blue-300 text-xs">Copy All</button>
          </div>
          {coords.map((c, i) => (
            <div key={i}>{'{ lat: '}{c.lat}{', lng: '}{c.lng}{' },'}</div>
          ))}
        </div>
      )}

      <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
        <CemeteryMap lots={lots} height="550px" onMapClick={onMapClick} />
      </div>

      {showModal && (
        <Modal title="Add Burial Lot" onClose={() => setShowModal(false)}>
          <div className="bg-gray-50 rounded-xl p-3 mb-4 flex items-center gap-2 text-xs text-gray-600">
            <span>📍</span> Lat: {form.latitude}, Lng: {form.longitude}
          </div>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Lot Number</label>
              <input type="text" value={form.lot_number} onChange={e => setForm({...form, lot_number: e.target.value})} required className="input-modern" placeholder="Enter lot number" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Section</label>
                <input type="text" value={form.section} onChange={e => setForm({...form, section: e.target.value})} required className="input-modern" placeholder="Section" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Block</label>
                <input type="text" value={form.block} onChange={e => setForm({...form, block: e.target.value})} required className="input-modern" placeholder="Block" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
              <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="input-modern resize-none" rows="2" placeholder="Optional description" />
            </div>
            <button type="submit" disabled={saving} className="btn-primary w-full">
              {saving ? 'Creating...' : 'Create Lot'}
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
}
