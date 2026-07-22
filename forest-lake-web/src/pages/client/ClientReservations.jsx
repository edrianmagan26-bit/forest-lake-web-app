import { useEffect, useState } from 'react';
import api from '../../utils/api';
import StatusBadge from '../../components/StatusBadge';
import { TableSkeleton } from '../../components/LoadingSkeleton';
import { formatDate } from '../../utils/helpers';

export default function ClientReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/reservations/list.php')
      .then(res => setReservations(res.data.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <TableSkeleton />;

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary-dark mb-6">My Reservations</h1>

      {reservations.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
          <p className="text-gray-500">You have no reservations yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reservations.map(r => (
            <div key={r.id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
                <div>
                  <p className="font-semibold text-gray-800">Reservation #{r.id}</p>
                  <p className="text-sm text-gray-600">Lot: {r.lot_number} | Section: {r.section} | Block: {r.block}</p>
                  <p className="text-sm text-gray-500">Requested: {formatDate(r.reservation_date || r.created_at)}</p>
                  {r.admin_remarks && <p className="text-sm text-gray-600 mt-1 italic">Remarks: {r.admin_remarks}</p>}
                </div>
                <StatusBadge status={r.status} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
