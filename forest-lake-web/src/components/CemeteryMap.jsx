import { APIProvider, Map, AdvancedMarker, Polygon } from '@vis.gl/react-google-maps';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import StatusBadge from './StatusBadge';
import api from '../utils/api';

const API_KEY = 'AIzaSyCLGxMoMLeYHTe35Los_gEPNMEBMp0W6UU';
const CENTER = { lat: 10.602369, lng: 122.935156 };
const MAP_ID = 'forest_lake_map';

const RESTRICTION = {
  north: 10.604334,
  south: 10.600404,
  east: 122.937550,
  west: 122.932761,
};

const pinColors = {
  available: '#22c55e',
  reserved: '#f59e0b',
  occupied: '#ef4444',
};

// Block and Section boundaries traced from actual road coordinates
// Grid intersection points (5 rows × 3 columns):
// Row 0: (10.602855,122.933668) (10.603024,122.933954) (10.603202,122.934230)
// Row 1: (10.602651,122.933834) (10.602848,122.934086) (10.603053,122.934348)
// Row 2: (10.602389,122.934037) (10.602589,122.934297) (10.602791,122.934561)
// Row 3: (10.602129,122.934249) (10.602334,122.934504) (10.602535,122.934765)
// Row 4: (10.601831,122.934577) (10.602054,122.934740) (10.602324,122.934940)

const BLOCK_BOUNDARIES = [
  { name: 'Aster Estate A',
    paths: [
      { lat: 10.602855, lng: 122.933668 },
      { lat: 10.603024, lng: 122.933954 },
      { lat: 10.603202, lng: 122.934230 },
      { lat: 10.603053, lng: 122.934348 },
      { lat: 10.602791, lng: 122.934561 },
      { lat: 10.602535, lng: 122.934765 },
      { lat: 10.602324, lng: 122.934940 },
      { lat: 10.602054, lng: 122.934740 },
      { lat: 10.601831, lng: 122.934577 },
      { lat: 10.601920, lng: 122.934416 },
      { lat: 10.602129, lng: 122.934249 },
      { lat: 10.602389, lng: 122.934037 },
      { lat: 10.602651, lng: 122.933834 },
    ],
  },
  { name: 'Aster Estate B',
    paths: [
      { lat: 10.603251, lng: 122.934306 },
      { lat: 10.603534, lng: 122.934750 },
      { lat: 10.603806, lng: 122.935208 },
      { lat: 10.603479, lng: 122.935378 },
      { lat: 10.603145, lng: 122.935542 },
      { lat: 10.603138, lng: 122.935544 },
      { lat: 10.602749, lng: 122.935259 },
      { lat: 10.602397, lng: 122.934993 },
      { lat: 10.602665, lng: 122.934780 },
      { lat: 10.602954, lng: 122.934542 },
    ],
  },
  { name: 'Aster Estate C',
    paths: [
      { lat: 10.603091, lng: 122.935621 },
      { lat: 10.602897, lng: 122.935943 },
      { lat: 10.602697, lng: 122.936258 },
      { lat: 10.602687, lng: 122.936267 },
      { lat: 10.602092, lng: 122.936206 },
      { lat: 10.601830, lng: 122.936176 },
      { lat: 10.602015, lng: 122.935757 },
      { lat: 10.602170, lng: 122.935403 },
      { lat: 10.602336, lng: 122.935053 },
      { lat: 10.602707, lng: 122.935327 },
    ],
  },
  { name: 'Aster Estate D',
    paths: [
      { lat: 10.601958, lng: 122.935683 },
      { lat: 10.601808, lng: 122.935660 },
      { lat: 10.601612, lng: 122.936097 },
      { lat: 10.601746, lng: 122.936152 },
    ],
  },
  { name: 'Aster Estate E',
    paths: [
      { lat: 10.601736, lng: 122.935642 },
      { lat: 10.601197, lng: 122.935556 },
      { lat: 10.601182, lng: 122.935922 },
      { lat: 10.601552, lng: 122.936074 },
    ],
  },
];

const SECTION_BOUNDARIES = [
  // Section A (top-left)
  { name: 'A', paths: [
    { lat: 10.602855, lng: 122.933668 },
    { lat: 10.603024, lng: 122.933954 },
    { lat: 10.602848, lng: 122.934086 },
    { lat: 10.602651, lng: 122.933834 },
  ]},
  // Section B (top-right)
  { name: 'B', paths: [
    { lat: 10.603024, lng: 122.933954 },
    { lat: 10.603202, lng: 122.934230 },
    { lat: 10.603053, lng: 122.934348 },
    { lat: 10.602848, lng: 122.934086 },
  ]},
  // Section D (row2-left)
  { name: 'D', paths: [
    { lat: 10.602651, lng: 122.933834 },
    { lat: 10.602848, lng: 122.934086 },
    { lat: 10.602589, lng: 122.934297 },
    { lat: 10.602389, lng: 122.934037 },
  ]},
  // Section C (row2-right)
  { name: 'C', paths: [
    { lat: 10.602848, lng: 122.934086 },
    { lat: 10.603053, lng: 122.934348 },
    { lat: 10.602791, lng: 122.934561 },
    { lat: 10.602589, lng: 122.934297 },
  ]},
  // Section E (row3-left)
  { name: 'E', paths: [
    { lat: 10.602389, lng: 122.934037 },
    { lat: 10.602589, lng: 122.934297 },
    { lat: 10.602334, lng: 122.934504 },
    { lat: 10.602129, lng: 122.934249 },
  ]},
  // Section F (row3-right)
  { name: 'F', paths: [
    { lat: 10.602589, lng: 122.934297 },
    { lat: 10.602791, lng: 122.934561 },
    { lat: 10.602535, lng: 122.934765 },
    { lat: 10.602334, lng: 122.934504 },
  ]},
  // Section H (bottom-left)
  { name: 'H', paths: [
    { lat: 10.602129, lng: 122.934249 },
    { lat: 10.602334, lng: 122.934504 },
    { lat: 10.602054, lng: 122.934740 },
    { lat: 10.601831, lng: 122.934577 },
    { lat: 10.601920, lng: 122.934416 },
  ]},
  // Section G (bottom-right)
  { name: 'G', paths: [
    { lat: 10.602334, lng: 122.934504 },
    { lat: 10.602535, lng: 122.934765 },
    { lat: 10.602324, lng: 122.934940 },
    { lat: 10.602054, lng: 122.934740 },
  ]},
  // === Aster Estate B (Right area) - 2 columns × 3 rows ===
  // Section I (top-left)
  { name: 'I', paths: [
    { lat: 10.603251, lng: 122.934306 },
    { lat: 10.603534, lng: 122.934750 },
    { lat: 10.603212, lng: 122.934951 },
    { lat: 10.602954, lng: 122.934542 },
  ]},
  // Section J (top-right)
  { name: 'J', paths: [
    { lat: 10.603534, lng: 122.934750 },
    { lat: 10.603806, lng: 122.935208 },
    { lat: 10.603479, lng: 122.935378 },
    { lat: 10.603212, lng: 122.934951 },
  ]},
  // Section K (middle-left)
  { name: 'K', paths: [
    { lat: 10.602954, lng: 122.934542 },
    { lat: 10.603212, lng: 122.934951 },
    { lat: 10.602907, lng: 122.935155 },
    { lat: 10.602665, lng: 122.934780 },
  ]},
  // Section L (middle-right)
  { name: 'L', paths: [
    { lat: 10.603212, lng: 122.934951 },
    { lat: 10.603479, lng: 122.935378 },
    { lat: 10.603145, lng: 122.935542 },
    { lat: 10.602907, lng: 122.935155 },
  ]},
  // Section M (bottom-left)
  { name: 'M', paths: [
    { lat: 10.602665, lng: 122.934780 },
    { lat: 10.602907, lng: 122.935155 },
    { lat: 10.602749, lng: 122.935259 },
    { lat: 10.602397, lng: 122.934993 },
  ]},
  // Section N (bottom-right)
  { name: 'N', paths: [
    { lat: 10.602907, lng: 122.935155 },
    { lat: 10.603145, lng: 122.935542 },
    { lat: 10.603138, lng: 122.935544 },
    { lat: 10.602749, lng: 122.935259 },
  ]},
  // === Aster Estate C (Far right area) - 2 columns × 3 rows ===
  // Section O (top-left)
  { name: 'O', paths: [
    { lat: 10.603091, lng: 122.935621 },
    { lat: 10.602707, lng: 122.935327 },
    { lat: 10.602492, lng: 122.935637 },
    { lat: 10.602897, lng: 122.935943 },
  ]},
  // Section P (top-right)
  { name: 'P', paths: [
    { lat: 10.602707, lng: 122.935327 },
    { lat: 10.602336, lng: 122.935053 },
    { lat: 10.602170, lng: 122.935403 },
    { lat: 10.602492, lng: 122.935637 },
  ]},
  // Section Q (middle-left)
  { name: 'Q', paths: [
    { lat: 10.602897, lng: 122.935943 },
    { lat: 10.602492, lng: 122.935637 },
    { lat: 10.602276, lng: 122.935947 },
    { lat: 10.602697, lng: 122.936258 },
  ]},
  // Section R (middle-right)
  { name: 'R', paths: [
    { lat: 10.602492, lng: 122.935637 },
    { lat: 10.602170, lng: 122.935403 },
    { lat: 10.602015, lng: 122.935757 },
    { lat: 10.602276, lng: 122.935947 },
  ]},
  // Section S (bottom-left)
  { name: 'S', paths: [
    { lat: 10.602697, lng: 122.936258 },
    { lat: 10.602276, lng: 122.935947 },
    { lat: 10.602092, lng: 122.936206 },
    { lat: 10.602687, lng: 122.936267 },
  ]},
  // Section T (bottom-right)
  { name: 'T', paths: [
    { lat: 10.602276, lng: 122.935947 },
    { lat: 10.602015, lng: 122.935757 },
    { lat: 10.601830, lng: 122.936176 },
    { lat: 10.602092, lng: 122.936206 },
  ]},
  // === Aster Estate D (small bottom section) ===
  { name: 'U', paths: [
    { lat: 10.601958, lng: 122.935683 },
    { lat: 10.601746, lng: 122.936152 },
    { lat: 10.601612, lng: 122.936097 },
    { lat: 10.601808, lng: 122.935660 },
  ]},
  // === Aster Estate E (bottom rectangular lots) ===
  // Section V (top)
  { name: 'V', paths: [
    { lat: 10.601736, lng: 122.935642 },
    { lat: 10.601197, lng: 122.935556 },
    { lat: 10.601187, lng: 122.935772 },
    { lat: 10.601648, lng: 122.935854 },
  ]},
  // Section W (bottom)
  { name: 'W', paths: [
    { lat: 10.601648, lng: 122.935854 },
    { lat: 10.601187, lng: 122.935772 },
    { lat: 10.601182, lng: 122.935922 },
    { lat: 10.601552, lng: 122.936074 },
  ]},
];

const IMAGE_BASE = 'http://localhost/ForestLake/forest-lake-api';

// Point-in-polygon ray casting algorithm
function isPointInPolygon(point, polygon) {
  let inside = false;
  const { lat, lng } = point;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].lat, yi = polygon[i].lng;
    const xj = polygon[j].lat, yj = polygon[j].lng;
    const intersect = ((yi > lng) !== (yj > lng)) && (lat < (xj - xi) * (lng - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

// Find which section and block a coordinate falls within
export function findSectionAtPoint(lat, lng) {
  const point = { lat, lng };
  // Find section
  const section = SECTION_BOUNDARIES.find(s => isPointInPolygon(point, s.paths));
  if (!section) return null;
  // Find block
  const block = BLOCK_BOUNDARIES.find(b => isPointInPolygon(point, b.paths));
  return {
    section: section.name,
    block: block ? block.name : '',
  };
}

export { SECTION_BOUNDARIES, BLOCK_BOUNDARIES };

function LotPin({ lot, onClick, clickable = true }) {
  const color = pinColors[lot.status] || pinColors.available;
  return (
    <AdvancedMarker
      position={{ lat: parseFloat(lot.latitude), lng: parseFloat(lot.longitude) }}
      onClick={clickable ? () => onClick(lot) : undefined}
      zIndex={clickable ? 10 : 1}
    >
      <div className="flex flex-col items-center" style={{ pointerEvents: clickable ? 'auto' : 'none' }}>
        <div className="w-4 h-4 rounded-full border-2 border-white shadow-lg cursor-pointer hover:scale-125 transition-transform" style={{ backgroundColor: color }}></div>
        <div className="w-0.5 h-2 -mt-0.5" style={{ backgroundColor: color }}></div>
      </div>
    </AdvancedMarker>
  );
}

function OwnerCard({ owner, onViewDeceased }) {
  const o = owner;
  const deceased = o.deceased || [];

  return (
    <div className="bg-blue-50 rounded-lg border border-blue-100 overflow-hidden">
      <button onClick={() => onViewDeceased(o)} className="w-full flex items-center gap-3 p-3 hover:bg-blue-100/50 transition text-left">
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs shrink-0">
          {o.first_name?.[0]}{o.last_name?.[0]}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">{o.first_name} {o.last_name}</p>
          {o.serial_number && <p className="text-xs text-gray-500 font-mono">{o.serial_number}</p>}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {deceased.length > 0 && <span className="text-xs text-purple-600 bg-purple-100 px-1.5 py-0.5 rounded">{deceased.length}</span>}
          <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </div>
      </button>
    </div>
  );
}

function DeceasedModal({ owner, onClose }) {
  const deceased = owner.deceased || [];

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const calculateAge = (birthDate, deathDate) => {
    if (!birthDate || !deathDate) return null;
    const birth = new Date(birthDate);
    const death = new Date(deathDate);
    let age = death.getFullYear() - birth.getFullYear();
    const m = death.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && death.getDate() < birth.getDate())) age--;
    return age;
  };

  const timeSinceDeath = (deathDate) => {
    if (!deathDate) return null;
    const death = new Date(deathDate);
    const now = new Date();
    const diffMs = now - death;
    if (diffMs < 0) return null;

    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Today';
    if (days === 1) return '1 day ago';
    if (days < 30) return `${days} days ago`;

    const months = Math.floor(days / 30.44);
    if (months < 12) return `${months} month${months > 1 ? 's' : ''} ago`;

    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (remainingMonths === 0) return `${years} year${years > 1 ? 's' : ''} ago`;
    return `${years} year${years > 1 ? 's' : ''}, ${remainingMonths} month${remainingMonths > 1 ? 's' : ''} ago`;
  };

  return createPortal(
    <div className="fixed inset-0 z-[10001] flex items-start justify-center bg-black/60 backdrop-blur-sm overflow-y-auto py-8 px-4 animate-fade-in" onClick={onClose}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 relative my-auto shrink-0 animate-scale-in" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all" aria-label="Close">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">
            {owner.first_name?.[0]}{owner.last_name?.[0]}
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">{owner.first_name} {owner.last_name}</h3>
            {owner.serial_number && <p className="text-xs text-gray-500 font-mono">{owner.serial_number}</p>}
          </div>
        </div>

        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Deceased Information ({deceased.length})</p>

        {deceased.length > 0 ? (
          <div className="space-y-3">
            {deceased.map(d => {
              const age = calculateAge(d.date_of_birth, d.date_of_death);
              const sinceDeath = timeSinceDeath(d.date_of_death);
              return (
                <div key={d.id} className="bg-purple-50 rounded-xl p-4 border border-purple-100 space-y-1.5">
                  <p className="text-sm font-semibold text-gray-900">{d.name}</p>
                  {age !== null && (
                    <p className="text-xs text-purple-700 font-medium">Age at death: {age} years old</p>
                  )}
                  {sinceDeath && (
                    <p className="text-xs text-purple-700 font-medium">Passed: {sinceDeath}</p>
                  )}
                  {d.relationship_to_client && <p className="text-xs text-gray-500">Relationship: <span className="text-gray-700">{d.relationship_to_client}</span></p>}
                  {d.date_of_birth && <p className="text-xs text-gray-500">Born: <span className="text-gray-700">{d.date_of_birth}</span></p>}
                  {d.date_of_death && <p className="text-xs text-gray-500">Died: <span className="text-gray-700">{d.date_of_death}</span></p>}
                  {d.burial_date && <p className="text-xs text-gray-500">Burial Date: <span className="text-gray-700">{d.burial_date}</span></p>}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-400">No deceased information yet</p>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

function LotModal({ lot, onClose, onReserve }) {
  const [images, setImages] = useState([]);
  const [activeImg, setActiveImg] = useState(0);
  const [loadingImages, setLoadingImages] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [owners, setOwners] = useState([]);
  const [selectedOwner, setSelectedOwner] = useState(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    setLoadingImages(true);
    setActiveImg(0);
    api.get(`/burial-lots/images.php?lot_id=${lot.id}`)
      .then(res => setImages(res.data.data || []))
      .catch(() => setImages([]))
      .finally(() => setLoadingImages(false));

    // Fetch owners (includes deceased info per owner)
    api.get(`/burial-lots/owners.php?lot_id=${lot.id}`)
      .then(res => setOwners(res.data.data || []))
      .catch(() => setOwners([]));
  }, [lot.id]);

  const currentImage = images[activeImg];
  const imageUrl = currentImage ? (currentImage.image_path.startsWith('http') ? currentImage.image_path : `${IMAGE_BASE}${currentImage.image_path}`) : null;

  return (
    <>
      <div className="fixed inset-0 z-[9999] flex items-start justify-center bg-black/60 backdrop-blur-sm overflow-y-auto py-8 px-4 animate-fade-in" onClick={onClose}>
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-6 relative my-auto shrink-0 animate-scale-in" onClick={e => e.stopPropagation()}>
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all" aria-label="Close">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>

          <h3 className="text-lg font-bold text-gray-900 mb-4 pr-8">Lot {lot.lot_number} Details</h3>

          {/* Image gallery */}
          {loadingImages ? (
            <div className="rounded-xl bg-gray-100 h-48 flex items-center justify-center animate-pulse mb-4">
              <span className="text-gray-400 text-sm">Loading...</span>
            </div>
          ) : images.length > 0 ? (
            <div className="mb-4">
              <div className="rounded-xl overflow-hidden border border-gray-200 relative cursor-pointer" onClick={() => setFullscreen(true)}>
                <img src={imageUrl} alt={`Lot ${lot.lot_number}`} className="w-full h-48 object-cover hover:opacity-90 transition" />
                {currentImage?.image_type === '360' && (
                  <span className="absolute top-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full">🌐 360°</span>
                )}
                {images.length > 1 && (
                  <span className="absolute top-2 right-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full">{activeImg + 1}/{images.length}</span>
                )}
              </div>
              {images.length > 1 && (
                <div className="flex gap-1.5 mt-2 overflow-x-auto pb-1">
                  {images.map((img, i) => {
                    const thumbUrl = img.image_path.startsWith('http') ? img.image_path : `${IMAGE_BASE}${img.image_path}`;
                    return (
                      <button key={img.id} onClick={() => setActiveImg(i)} className={`shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition ${i === activeImg ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'}`}>
                        <img src={thumbUrl} alt="" className="w-full h-full object-cover" />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ) : null}

          {/* Status */}
          <div className="mb-4"><StatusBadge status={lot.status} /></div>

          {/* Lot Details */}
          <div className="bg-gray-50 rounded-xl p-4 space-y-2 mb-4">
            <DetailRow label="Lot Number" value={lot.lot_number} />
            <DetailRow label="Block" value={lot.block} />
            <DetailRow label="Section" value={lot.section} />
            <DetailRow label="Area" value={lot.square_meter ? `${lot.square_meter} m²` : '—'} />
            <DetailRow label="Slots" value={`${lot.max_slots || 8}`} />
          </div>

          {lot.description && (
            <div className="mb-4">
              <p className="text-xs font-medium text-gray-500 mb-1">Description</p>
              <p className="text-sm text-gray-700">{lot.description}</p>
            </div>
          )}

          {/* Owners */}
          {owners.length > 0 && (
            <div className="mb-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Lot Owners ({owners.length})</p>
              <div className="space-y-2">
                {owners.map(o => (
                  <OwnerCard key={o.reservation_id} owner={o} onViewDeceased={setSelectedOwner} />
                ))}
              </div>
            </div>
          )}

          {/* Deceased Information - removed, now shown per owner */}

          {/* Reserve Button */}
          {onReserve && lot.status === 'available' && (
            <button onClick={() => { onReserve(lot); onClose(); }} className="w-full btn-primary flex items-center justify-center gap-2 mt-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
              Reserve This Lot
            </button>
          )}
        </div>
      </div>

      {/* Deceased Info Modal for selected owner */}
      {selectedOwner && (
        <DeceasedModal owner={selectedOwner} onClose={() => setSelectedOwner(null)} />
      )}

      {/* Fullscreen Image Lightbox */}
      {fullscreen && imageUrl && (
        <div className="fixed inset-0 z-[10000] bg-black/90 flex items-center justify-center p-4" onClick={() => setFullscreen(false)}>
          <button className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300 z-10" onClick={() => setFullscreen(false)}>&times;</button>
          {images.length > 1 && (
            <>
              <button onClick={(e) => { e.stopPropagation(); setActiveImg(i => (i - 1 + images.length) % images.length); }} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white w-10 h-10 rounded-full text-lg transition">&lt;</button>
              <button onClick={(e) => { e.stopPropagation(); setActiveImg(i => (i + 1) % images.length); }} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white w-10 h-10 rounded-full text-lg transition">&gt;</button>
            </>
          )}
          <img src={imageUrl} alt={`Lot ${lot.lot_number}`} className="max-w-full max-h-[90vh] object-contain rounded-lg" onClick={e => e.stopPropagation()} />
        </div>
      )}
    </>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-xs text-gray-500">{label}</span>
      <span className="text-sm font-medium text-gray-800">{value || '—'}</span>
    </div>
  );
}

export default function CemeteryMap({ lots = [], height = '500px', onMapClick, isAdmin = false, onReserve, focusLotId }) {
  const [selectedLot, setSelectedLot] = useState(null);
  const isEditMode = !!onMapClick;

  // Auto-open modal for focused lot
  useEffect(() => {
    if (focusLotId && lots.length > 0) {
      const lot = lots.find(l => l.id == focusLotId);
      if (lot) setSelectedLot(lot);
    }
  }, [focusLotId, lots]);

  const openModal = (lot) => {
    setSelectedLot(lot);
  };

  const closeModal = () => {
    setSelectedLot(null);
  };

  return (
    <div className="relative overflow-hidden" style={{ height }}>
      <APIProvider apiKey={API_KEY}>
        <Map
          defaultCenter={CENTER}
          defaultZoom={17}
          mapId={MAP_ID}
          mapTypeId="satellite"
          style={{ width: '100%', height: '100%' }}
          gestureHandling="cooperative"
          disableDefaultUI={false}
          restriction={{ latLngBounds: RESTRICTION, strictBounds: true }}
          minZoom={17}
          maxZoom={21}
          styles={[
            { featureType: 'all', elementType: 'labels', stylers: [{ visibility: 'off' }] },
            { featureType: 'administrative', stylers: [{ visibility: 'off' }] },
            { featureType: 'administrative.land_parcel', stylers: [{ visibility: 'off' }] },
            { featureType: 'road', elementType: 'labels', stylers: [{ visibility: 'off' }] },
          ]}
          onClick={(e) => {
            if (onMapClick && e.detail?.latLng) {
              onMapClick({ lat: e.detail.latLng.lat, lng: e.detail.latLng.lng });
            }
          }}
        >
          {/* Block borders */}
          {BLOCK_BOUNDARIES.map((block) => (
            <Polygon
              key={block.name}
              paths={block.paths}
              fillColor={isAdmin ? "#ff0000" : "#ffffff"}
              fillOpacity={isAdmin ? 0.03 : 0.01}
              strokeColor={isAdmin ? "#ef4444" : "#ffffff"}
              strokeWeight={isAdmin ? 3 : 1.5}
              strokeOpacity={isAdmin ? 0.9 : 0.3}
            />
          ))}

          {/* Section borders */}
          {SECTION_BOUNDARIES.map((section) => (
            <Polygon
              key={section.name}
              paths={section.paths}
              fillColor={isAdmin ? "#ff0000" : "#ffffff"}
              fillOpacity={isAdmin ? 0.05 : 0.01}
              strokeColor={isAdmin ? "#ef4444" : "#ffffff"}
              strokeWeight={isAdmin ? 2 : 1}
              strokeOpacity={isAdmin ? 0.8 : 0.2}
            />
          ))}

          {/* Section and block labels */}
          {SECTION_BOUNDARIES.map((section) => {
            const centerLat = section.paths.reduce((sum, p) => sum + p.lat, 0) / section.paths.length;
            const centerLng = section.paths.reduce((sum, p) => sum + p.lng, 0) / section.paths.length;
            return (
              <AdvancedMarker key={`label-${section.name}`} position={{ lat: centerLat, lng: centerLng }} zIndex={5}>
                <div className={`font-bold pointer-events-none ${isAdmin ? 'text-sm bg-white/80 text-red-700 px-2 py-1 rounded shadow-sm border border-red-200' : 'text-lg text-white/60 drop-shadow-md'}`}>
                  {section.name}
                </div>
              </AdvancedMarker>
            );
          })}
          {BLOCK_BOUNDARIES.map((block) => {
            const centerLat = block.paths.reduce((sum, p) => sum + p.lat, 0) / block.paths.length;
            const centerLng = block.paths.reduce((sum, p) => sum + p.lng, 0) / block.paths.length;
            return (
              <AdvancedMarker key={`block-label-${block.name}`} position={{ lat: centerLat, lng: centerLng }} zIndex={4}>
                <div className={`font-bold pointer-events-none ${isAdmin ? 'text-xs bg-red-600 text-white px-2 py-0.5 rounded shadow' : 'text-xl text-white/50 drop-shadow-lg'}`}>
                  {block.name}
                </div>
              </AdvancedMarker>
            );
          })}

          {lots.map(lot => (
            lot.latitude && lot.longitude && (
              <LotPin key={lot.id} lot={lot} onClick={openModal} clickable={!isEditMode} />
            )
          ))}
        </Map>
      </APIProvider>

      {selectedLot && !isEditMode && createPortal(
        <LotModal lot={selectedLot} onClose={closeModal} onReserve={onReserve} />,
        document.body
      )}
    </div>
  );
}
