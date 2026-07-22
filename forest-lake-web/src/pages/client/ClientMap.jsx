import { useEffect, useState } from 'react';
import api from '../../utils/api';
import CemeteryMap from '../../components/CemeteryMap';
import { MapSkeleton } from '../../components/LoadingSkeleton';

export default function ClientMap() {
  const [lots, setLots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/burial-lots/list.php')
      .then(res => setLots(res.data.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <MapSkeleton />;

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary-dark mb-2">Cemetery Map</h1>
      <p className="text-gray-500 text-sm mb-4">View Geo-Tagged burial lot locations. This is for visual location only, not real-time GPS navigation.</p>

      <div className="flex gap-4 mb-4 text-sm">
        <span className="flex items-center gap-1"><span className="w-3 h-3 bg-available rounded-full"></span> Available</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 bg-reserved rounded-full"></span> Reserved</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 bg-occupied rounded-full"></span> Occupied</span>
      </div>

      <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200">
        <CemeteryMap lots={lots} height="500px" />
      </div>
    </div>
  );
}
