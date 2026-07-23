import { useEffect, useState } from 'react';
import api from '../../utils/api';
import CemeteryMap from '../../components/CemeteryMap';
import { findSectionAtPoint } from '../../components/CemeteryMap';
import { MapSkeleton } from '../../components/LoadingSkeleton';
import toast from 'react-hot-toast';

export default function AdminBurialLotsMap() {
  const [lots, setLots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);
  const [closing, setClosing] = useState(false);
  const [form, setForm] = useState({ lot_number: '', section: '', block: '', square_meter: '', lot_type: 'lawn', latitude: '', longitude: '', status: 'available', description: '' });
  const [saving, setSaving] = useState(false);
  const [coordMode, setCoordMode] = useState(false);
  const [coords, setCoords] = useState([]);

  const fetchLots = () => {
    api.get('/burial-lots/list.php').then(r => setLots(r.data.data || [])).catch(() => {}).finally(() => setLoading(false));
  };
  useEffect(fetchLots, []);

  const openSidebar = (formData) => {
    setForm(formData);
    setShowSidebar(true);
    setClosing(false);
  };

  const closeSidebar = () => {
    setClosing(true);
    setTimeout(() => {
      setShowSidebar(false);
      setClosing(false);
    }, 500);
  };

  const onMapClick = (clickCoords) => {
    if (coordMode) {
      setCoords(prev => [...prev, { lat: clickCoords.lat.toFixed(6), lng: clickCoords.lng.toFixed(6) }]);
      toast.success(`Point ${coords.length + 1}: ${clickCoords.lat.toFixed(6)}, ${clickCoords.lng.toFixed(6)}`);
      return;
    }
    const result = findSectionAtPoint(clickCoords.lat, clickCoords.lng);
    if (!result) {
      toast.error('Please click inside a section to add a lot.');
      return;
    }
    openSidebar({
      lot_number: '',
      section: result.section,
      block: result.block,
      square_meter: '',
      lot_type: 'lawn',
      latitude: clickCoords.lat.toFixed(6),
      longitude: clickCoords.lng.toFixed(6),
      status: 'available',
      description: '',
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post('/burial-lots/create.php', form);
      toast.success('Burial lot created!');
      closeSidebar();
      fetchLots();
    } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
    finally { setSaving(false); }
  };

  if (loading) return <MapSkeleton />;

  return (
    <div className="animate-fade-in-up">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Cemetery Map</h1>
        <p className="text-gray-500 mt-1">Click inside a section to add a new burial lot.</p>
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

      <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
        <CemeteryMap lots={lots} height="550px" onMapClick={onMapClick} isAdmin={true} />

        {/* Add Lot Sidebar */}
        {showSidebar && (
          <div className={`absolute top-0 right-0 h-full w-80 max-w-[85%] bg-white shadow-2xl z-50 flex flex-col overflow-hidden transition-transform duration-500 ease-out ${closing ? 'translate-x-full' : 'translate-x-0'}`}>
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50 shrink-0">
              <h3 className="font-bold text-primary-dark text-sm">Add Burial Lot</h3>
              <button onClick={closeSidebar} className="text-gray-400 hover:text-gray-600 text-xl leading-none" aria-label="Close">&times;</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <div className="bg-primary/5 border border-primary/10 rounded-xl p-3 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  <span className="text-xs font-semibold text-primary-dark">Pin Location</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white rounded-lg px-2.5 py-1.5 border border-gray-100">
                    <span className="text-[10px] text-gray-400 block">Latitude</span>
                    <span className="text-xs font-mono text-gray-800">{form.latitude}</span>
                  </div>
                  <div className="bg-white rounded-lg px-2.5 py-1.5 border border-gray-100">
                    <span className="text-[10px] text-gray-400 block">Longitude</span>
                    <span className="text-xs font-mono text-gray-800">{form.longitude}</span>
                  </div>
                </div>
              </div>
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Lot Number</label>
                  <input type="text" value={form.lot_number} onChange={e => setForm({...form, lot_number: e.target.value})} required className="input-modern" placeholder="Enter lot number" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Block</label>
                    <input type="text" value={form.block} readOnly className="input-modern bg-gray-100 cursor-not-allowed text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Section</label>
                    <input type="text" value={form.section} readOnly className="input-modern bg-gray-100 cursor-not-allowed text-sm" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Area (m²)</label>
                  <input type="number" step="0.01" min="0" value={form.square_meter} onChange={e => setForm({...form, square_meter: e.target.value})} className="input-modern" placeholder="e.g. 2.5" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Lot Type</label>
                  <select value={form.lot_type} onChange={e => setForm({...form, lot_type: e.target.value})} className="input-modern">
                    <option value="lawn">Lawn Lot</option>
                    <option value="mini_mausoleum">Mini-Mausoleum</option>
                    <option value="estate">Estate Lot</option>
                    <option value="legacy">Legacy Lot</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
                  <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="input-modern resize-none" rows="2" placeholder="Optional description" />
                </div>
                <button type="submit" disabled={saving} className="btn-primary w-full text-sm">
                  {saving ? 'Creating...' : 'Create Lot'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
