import { useEffect, useState } from 'react';
import api from '../../utils/api';
import CemeteryMap from '../../components/CemeteryMap';
import { MapSkeleton } from '../../components/LoadingSkeleton';

export default function MapPreviewPage() {
  const [lots, setLots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/burial-lots/list.php')
      .then(res => setLots(res.data.data || []))
      .catch(() => setLots([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="py-20 px-4 max-w-6xl mx-auto"><MapSkeleton /></div>;

  return (
    <div className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary-dark mb-2">Cemetery Map</h1>
          <p className="text-gray-600">Explore Geo-Tagged burial lot locations at Forest Lake Sum-ag.</p>
          <p className="text-xs text-gray-400 mt-1">Note: Geo-Tagging is for map-based visual location only. This does not provide real-time GPS navigation.</p>
        </div>

        <div className="flex gap-4 justify-center mb-4 text-sm">
          <span className="flex items-center gap-1"><span className="w-3 h-3 bg-available rounded-full"></span> Available</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 bg-reserved rounded-full"></span> Reserved</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 bg-occupied rounded-full"></span> Occupied</span>
        </div>

        <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200">
          <CemeteryMap lots={lots} height="500px" />
        </div>
      </div>
    </div>
  );
}
