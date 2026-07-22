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
    <div className="animate-fade-in-up">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Cemetery Map</h1>
        <p className="text-gray-500 mt-1">View Geo-Tagged burial lot locations. This is for visual location only.</p>
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
      </div>

      <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
        <CemeteryMap lots={lots} height="500px" />
      </div>
    </div>
  );
}
