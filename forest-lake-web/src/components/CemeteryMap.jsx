import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import { useState, useEffect } from 'react';
import StatusBadge from './StatusBadge';
import api from '../utils/api';

const API_KEY = 'AIzaSyAZlAn5fIIkQobmGUpV0207KVn--oIhhZg';
const CENTER = { lat: 10.602576, lng: 122.935151 };
const MAP_ID = 'forest_lake_map';

const RESTRICTION = {
  north: 10.6058,
  south: 10.5998,
  east: 122.9380,
  west: 122.9305,
};

const pinColors = {
  available: '#22c55e',
  reserved: '#f59e0b',
  occupied: '#ef4444',
};

const IMAGE_BASE = 'http://localhost/ForestLake/forest-lake-api';

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
            <DetailRow label="Section" value={lot.section} />
            <DetailRow label="Block" value={lot.block} />
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

export default function CemeteryMap({ lots = [], height = '500px', onMapClick }) {
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
          minZoom={16}
          maxZoom={21}
          onClick={(e) => {
            if (!isEditMode) closeSidebar();
            if (onMapClick && e.detail?.latLng) {
              onMapClick({ lat: e.detail.latLng.lat, lng: e.detail.latLng.lng });
            }
          }}
        >
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
