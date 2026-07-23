import { APIProvider, Map, AdvancedMarker, Polygon } from '@vis.gl/react-google-maps';
import { useState, useEffect } from 'react';
import StatusBadge from './StatusBadge';
import api from '../utils/api';

const API_KEY = 'AIzaSyAZlAn5fIIkQobmGUpV0207KVn--oIhhZg';
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

function LotSidebar({ lot, onClose, closing }) {
  const [images, setImages] = useState([]);
  const [activeImg, setActiveImg] = useState(0);
  const [loadingImages, setLoadingImages] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    setLoadingImages(true);
    setActiveImg(0);
    api.get(`/burial-lots/images.php?lot_id=${lot.id}`)
      .then(res => setImages(res.data.data || []))
      .catch(() => setImages([]))
      .finally(() => setLoadingImages(false));
  }, [lot.id]);

  const currentImage = images[activeImg];
  const imageUrl = currentImage ? (currentImage.image_path.startsWith('http') ? currentImage.image_path : `${IMAGE_BASE}${currentImage.image_path}`) : null;

  return (
    <>
    <div className={`absolute top-0 right-0 h-full w-80 max-w-[85%] bg-white shadow-2xl z-50 flex flex-col overflow-hidden transition-transform duration-250 ease-out ${closing ? 'translate-x-full' : 'translate-x-0 animate-[slideIn_0.25s_ease-out]'}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50 shrink-0">
        <h3 className="font-bold text-primary-dark text-sm">Lot Details</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none" aria-label="Close">&times;</button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Image gallery */}
        {loadingImages ? (
          <div className="rounded-xl bg-gray-100 h-44 flex items-center justify-center animate-pulse">
            <span className="text-gray-400 text-sm">Loading...</span>
          </div>
        ) : images.length > 0 ? (
          <div>
            {/* Main image — clickable for fullscreen */}
            <div className="rounded-xl overflow-hidden border border-gray-200 relative cursor-pointer" onClick={() => setFullscreen(true)}>
              <img src={imageUrl} alt={`Lot ${lot.lot_number}`} className="w-full h-44 object-cover hover:opacity-90 transition" />
              {currentImage?.image_type === '360' && (
                <span className="absolute top-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full">🌐 360°</span>
              )}
              {images.length > 1 && (
                <span className="absolute top-2 right-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full">
                  {activeImg + 1}/{images.length}
                </span>
              )}
              <span className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full">🔍 Click to enlarge</span>
            </div>
            {/* Prev/Next arrows */}
            {images.length > 1 && (
              <div className="flex justify-between mt-2">
                <button onClick={() => setActiveImg(i => (i - 1 + images.length) % images.length)} className="bg-gray-100 hover:bg-gray-200 text-gray-600 w-8 h-8 rounded-full text-sm transition">&lt;</button>
                <button onClick={() => setActiveImg(i => (i + 1) % images.length)} className="bg-gray-100 hover:bg-gray-200 text-gray-600 w-8 h-8 rounded-full text-sm transition">&gt;</button>
              </div>
            )}
            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-1.5 mt-2 overflow-x-auto pb-1">
                {images.map((img, i) => {
                  const thumbUrl = img.image_path.startsWith('http') ? img.image_path : `${IMAGE_BASE}${img.image_path}`;
                  return (
                    <button
                      key={img.id}
                      onClick={() => setActiveImg(i)}
                      className={`shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition ${i === activeImg ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'}`}
                    >
                      <img src={thumbUrl} alt="" className="w-full h-full object-cover" />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <div className="rounded-xl bg-gray-100 h-32 flex items-center justify-center text-gray-400 text-sm">
            No images available
          </div>
        )}

        {/* Status */}
        <div><StatusBadge status={lot.status} /></div>

        {/* Details */}
        <div className="space-y-3">
          <div className="bg-gray-50 rounded-lg p-3 space-y-2">
            <DetailRow label="Lot Number" value={lot.lot_number} />
            <DetailRow label="Block" value={lot.block} />
            <DetailRow label="Section" value={lot.section} />
            <DetailRow label="Area" value={lot.square_meter ? `${lot.square_meter} m²` : '—'} />
          </div>

          {lot.description && (
            <div>
              <p className="text-xs font-medium text-gray-500 mb-1">Description</p>
              <p className="text-sm text-gray-700">{lot.description}</p>
            </div>
          )}

          <div className="bg-gray-50 rounded-lg p-3 space-y-2">
            <DetailRow label="Latitude" value={lot.latitude} />
            <DetailRow label="Longitude" value={lot.longitude} />
          </div>
        </div>
      </div>
    </div>

    {/* Fullscreen Image Lightbox */}
    {fullscreen && imageUrl && (
      <div className="fixed inset-0 z-[300] bg-black/90 flex items-center justify-center p-4" onClick={() => setFullscreen(false)}>
        <button className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300 z-10" onClick={() => setFullscreen(false)}>&times;</button>

        {images.length > 1 && (
          <>
            <button onClick={(e) => { e.stopPropagation(); setActiveImg(i => (i - 1 + images.length) % images.length); }} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white w-10 h-10 rounded-full text-lg transition">&lt;</button>
            <button onClick={(e) => { e.stopPropagation(); setActiveImg(i => (i + 1) % images.length); }} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white w-10 h-10 rounded-full text-lg transition">&gt;</button>
          </>
        )}

        <img src={imageUrl} alt={`Lot ${lot.lot_number}`} className="max-w-full max-h-[90vh] object-contain rounded-lg" onClick={e => e.stopPropagation()} />

        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
            {activeImg + 1} / {images.length}
          </div>
        )}
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

export default function CemeteryMap({ lots = [], height = '500px', onMapClick, isAdmin = false }) {
  const [selectedLot, setSelectedLot] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const isEditMode = !!onMapClick;

  const openSidebar = (lot) => {
    setSelectedLot(lot);
    setSidebarVisible(true);
    setClosing(false);
  };

  const closeSidebar = () => {
    setClosing(true);
    setTimeout(() => {
      setSidebarVisible(false);
      setSelectedLot(null);
      setClosing(false);
    }, 250);
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
            if (!isEditMode) closeSidebar();
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
              <LotPin key={lot.id} lot={lot} onClick={openSidebar} clickable={!isEditMode} />
            )
          ))}
        </Map>
      </APIProvider>

      {sidebarVisible && selectedLot && !isEditMode && (
        <LotSidebar lot={selectedLot} onClose={closeSidebar} closing={closing} />
      )}
    </div>
  );
}
