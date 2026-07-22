import { useEffect, useState, useRef } from 'react';
import api from '../../utils/api';
import SearchBar from '../../components/SearchBar';
import FilterDropdown from '../../components/FilterDropdown';
import StatusBadge from '../../components/StatusBadge';
import Modal from '../../components/Modal';
import { TableSkeleton } from '../../components/LoadingSkeleton';
import toast from 'react-hot-toast';

const emptyLot = { lot_number: '', section: '', block: '', latitude: '', longitude: '', status: 'available', description: '' };

export default function AdminBurialLots() {
  const [lots, setLots] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingLot, setEditingLot] = useState(null);
  const [form, setForm] = useState(emptyLot);
  const [saving, setSaving] = useState(false);
  const [showUpload, setShowUpload] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageType, setImageType] = useState('photo');
  const fileRef = useRef(null);

  const fetchLots = () => {
    api.get('/burial-lots/list.php')
      .then(res => { setLots(res.data.data || []); setFiltered(res.data.data || []); })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchLots(); }, []);

  useEffect(() => {
    let result = lots;
    if (search) result = result.filter(l => l.lot_number.toLowerCase().includes(search.toLowerCase()) || l.section.toLowerCase().includes(search.toLowerCase()));
    if (statusFilter) result = result.filter(l => l.status === statusFilter);
    setFiltered(result);
  }, [search, statusFilter, lots]);

  const openAdd = () => { setEditingLot(null); setForm(emptyLot); setShowModal(true); };
  const openEdit = (lot) => { setEditingLot(lot); setForm({ ...lot }); setShowModal(true); };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingLot) {
        await api.put('/burial-lots/update.php', { id: editingLot.id, ...form });
        toast.success('Burial lot updated!');
      } else {
        await api.post('/burial-lots/create.php', form);
        toast.success('Burial lot created!');
      }
      setShowModal(false);
      fetchLots();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this burial lot?')) return;
    try {
      await api.delete(`/burial-lots/delete.php?id=${id}`);
      toast.success('Burial lot deleted');
      fetchLots();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed');
    }
  };

  const handleImageUpload = async () => {
    const files = fileRef.current?.files;
    if (!files?.length || !showUpload) return;
    setUploading(true);
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('images[]', files[i]);
    }
    formData.append('lot_id', showUpload.id);
    formData.append('image_type', imageType);
    try {
      const res = await api.post('/burial-lots/upload-images.php', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      toast.success(res.data.message || 'Images uploaded!');
      setShowUpload(null);
      fetchLots();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <TableSkeleton />;

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-primary-dark">Burial Lots</h1>
        <button onClick={openAdd} className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg text-sm font-medium transition">+ Add Burial Lot</button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1"><SearchBar onSearch={setSearch} placeholder="Search lots..." /></div>
        <FilterDropdown label="All Statuses" value={statusFilter} onChange={setStatusFilter} options={[
          { value: 'available', label: 'Available' },
          { value: 'reserved', label: 'Reserved' },
          { value: 'occupied', label: 'Occupied' },
        ]} />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Lot #</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Section</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Block</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Coordinates</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Image</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(lot => (
                <tr key={lot.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{lot.lot_number}</td>
                  <td className="px-4 py-3">{lot.section}</td>
                  <td className="px-4 py-3">{lot.block}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">{lot.latitude}, {lot.longitude}</td>
                  <td className="px-4 py-3">
                    {lot.image ? (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">{lot.image_type === '360' ? '360°' : '📷'}</span>
                    ) : (
                      <span className="text-xs text-gray-400">None</span>
                    )}
                  </td>
                  <td className="px-4 py-3"><StatusBadge status={lot.status} /></td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      <button onClick={() => openEdit(lot)} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-lg hover:bg-blue-200 transition">Edit</button>
                      <button onClick={() => { setShowUpload(lot); setImageType(lot.image_type || 'photo'); }} className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-lg hover:bg-purple-200 transition">📷</button>
                      <button onClick={() => handleDelete(lot.id)} className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-lg hover:bg-red-200 transition">Del</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <p className="text-center text-gray-500 py-8">No burial lots found.</p>}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <Modal title={editingLot ? 'Edit Burial Lot' : 'Add Burial Lot'} onClose={() => setShowModal(false)}>
          <form onSubmit={handleSave} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lot Number</label>
                <input type="text" value={form.lot_number} onChange={e => setForm({ ...form, lot_number: e.target.value })} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
                <input type="text" value={form.section} onChange={e => setForm({ ...form, section: e.target.value })} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Block</label>
                <input type="text" value={form.block} onChange={e => setForm({ ...form, block: e.target.value })} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none">
                  <option value="available">Available</option>
                  <option value="reserved">Reserved</option>
                  <option value="occupied">Occupied</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
                <input type="text" value={form.latitude} onChange={e => setForm({ ...form, latitude: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" placeholder="10.6025" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
                <input type="text" value={form.longitude} onChange={e => setForm({ ...form, longitude: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" placeholder="122.9345" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows="2" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"></textarea>
            </div>
            <button type="submit" disabled={saving} className="w-full bg-primary hover:bg-primary-dark text-white py-2.5 rounded-lg font-medium transition disabled:opacity-50">
              {saving ? 'Saving...' : (editingLot ? 'Update' : 'Create')}
            </button>
          </form>
        </Modal>
      )}

      {/* Image Upload Modal */}
      {showUpload && (
        <Modal title={`Upload Images — Lot ${showUpload.lot_number}`} onClose={() => setShowUpload(null)}>
          <div className="space-y-4">
            {showUpload.image && (
              <div className="bg-gray-100 rounded-lg p-3 text-sm">
                <p className="text-gray-600 mb-2">Current main image:</p>
                <img src={`http://localhost/ForestLake/forest-lake-api${showUpload.image}`} alt="Current" className="rounded-lg max-h-32 object-cover" />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image Type</label>
              <select value={imageType} onChange={e => setImageType(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none">
                <option value="photo">Regular Photo</option>
                <option value="360">360° Panoramic View</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Images</label>
              <input type="file" ref={fileRef} accept="image/jpeg,image/png,image/webp" multiple className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary/10 file:text-primary file:font-medium hover:file:bg-primary/20" />
              <p className="text-xs text-gray-400 mt-1">JPG, PNG, or WEBP. Max 10MB each. Select multiple files.</p>
            </div>
            <button onClick={handleImageUpload} disabled={uploading} className="w-full bg-primary hover:bg-primary-dark text-white py-2.5 rounded-lg font-medium transition disabled:opacity-50">
              {uploading ? 'Uploading...' : 'Upload Images'}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
