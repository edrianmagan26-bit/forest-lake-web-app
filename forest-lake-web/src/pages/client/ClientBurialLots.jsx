import { useEffect, useState } from 'react';
import api from '../../utils/api';
import StatusBadge from '../../components/StatusBadge';
import SearchBar from '../../components/SearchBar';
import FilterDropdown from '../../components/FilterDropdown';
import Modal from '../../components/Modal';
import LotImageViewer from '../../components/LotImageViewer';
import { TableSkeleton } from '../../components/LoadingSkeleton';
import toast from 'react-hot-toast';

export default function ClientBurialLots() {
  const [lots, setLots] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedLot, setSelectedLot] = useState(null);
  const [reserving, setReserving] = useState(false);
  const [viewingLot, setViewingLot] = useState(null);

  useEffect(() => {
    api.get('/burial-lots/list.php')
      .then(res => { setLots(res.data.data || []); setFiltered(res.data.data || []); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let result = lots;
    if (search) result = result.filter(l => l.lot_number.toLowerCase().includes(search.toLowerCase()) || l.section.toLowerCase().includes(search.toLowerCase()));
    if (statusFilter) result = result.filter(l => l.status === statusFilter);
    setFiltered(result);
  }, [search, statusFilter, lots]);

  const handleReservation = async () => {
    if (!selectedLot) return;
    setReserving(true);
    try {
      await api.post('/reservations/create.php', { burial_lot_id: selectedLot.id });
      toast.success('Reservation request submitted!');
      setSelectedLot(null);
      // Refresh lots
      const res = await api.get('/burial-lots/list.php');
      setLots(res.data.data || []);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Reservation failed');
    } finally {
      setReserving(false);
    }
  };

  if (loading) return <TableSkeleton />;

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary-dark mb-6">Available Burial Lots</h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1"><SearchBar onSearch={setSearch} placeholder="Search by lot number or section..." /></div>
        <FilterDropdown label="All Statuses" value={statusFilter} onChange={setStatusFilter} options={[
          { value: 'available', label: 'Available' },
          { value: 'reserved', label: 'Reserved' },
          { value: 'occupied', label: 'Occupied' },
        ]} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(lot => (
          <div key={lot.id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold text-gray-800">Lot {lot.lot_number}</h3>
              <StatusBadge status={lot.status} />
            </div>
            <p className="text-sm text-gray-600">Section: {lot.section}</p>
            <p className="text-sm text-gray-600">Block: {lot.block}</p>
            {lot.description && <p className="text-sm text-gray-500 mt-2">{lot.description}</p>}
            {lot.image && (
              <button onClick={() => setViewingLot(lot)} className="mt-3 w-full bg-blue-50 text-blue-600 py-1.5 rounded-lg text-xs font-medium hover:bg-blue-100 transition">
                {lot.image_type === '360' ? '🌐 View 360°' : '📷 View Photo'}
              </button>
            )}
            {lot.status === 'available' && (
              <button onClick={() => setSelectedLot(lot)} className="mt-2 w-full bg-primary hover:bg-primary-dark text-white py-2 rounded-lg text-sm font-medium transition">
                Request Reservation
              </button>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && <p className="text-center text-gray-500 py-12">No burial lots found.</p>}

      {selectedLot && (
        <Modal title="Confirm Reservation" onClose={() => setSelectedLot(null)}>
          <div className="space-y-3 text-sm">
            <p><span className="font-medium">Lot Number:</span> {selectedLot.lot_number}</p>
            <p><span className="font-medium">Section:</span> {selectedLot.section}</p>
            <p><span className="font-medium">Block:</span> {selectedLot.block}</p>
            <p className="text-gray-600 mt-4">Are you sure you want to request a reservation for this burial lot?</p>
          </div>
          <div className="flex gap-3 mt-6">
            <button onClick={() => setSelectedLot(null)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">Cancel</button>
            <button onClick={handleReservation} disabled={reserving} className="flex-1 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition disabled:opacity-50">
              {reserving ? 'Submitting...' : 'Confirm'}
            </button>
          </div>
        </Modal>
      )}

      {viewingLot && <LotImageViewer lot={viewingLot} onClose={() => setViewingLot(null)} />}
    </div>
  );
}
