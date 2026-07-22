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
    <div className="animate-fade-in-up">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Reservations</h1>
        <p className="text-gray-500 mt-1">Track the status of your reservation requests.</p>
      </div>

      {reservations.length === 0 ? (
        <div className="bg-white rounded-2xl p-16 text-center border border-gray-100">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📋</span>
          </div>
          <p className="text-gray-500 font-medium">No reservations yet</p>
          <p className="text-sm text-gray-400 mt-1">Your reservation history will appear here.</p>
        </div>
      ) : (
        <div className="space-y-4 stagger-children">
          {reservations.map(r => (
            <div key={r.id} className="bg-white rounded-2xl p-6 border border-gray-100 card-hover">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <p className="font-bold text-gray-900">Reservation #{r.id}</p>
                    <StatusBadge status={r.status} />
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
                    <span>Lot: <span className="text-gray-700 font-medium">{r.lot_number}</span></span>
                    <span>Section: <span className="text-gray-700 font-medium">{r.section}</span></span>
                    <span>Block: <span className="text-gray-700 font-medium">{r.block}</span></span>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">Requested: {formatDate(r.reservation_date || r.created_at)}</p>
                  {r.admin_remarks && (
                    <div className="mt-3 bg-gray-50 rounded-lg px-3 py-2 text-sm text-gray-600 border-l-2 border-primary/30">
                      <span className="font-medium text-gray-700">Remarks:</span> {r.admin_remarks}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
