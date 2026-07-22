import { useEffect, useRef, useState } from 'react';
import StatusBadge from './StatusBadge';

export default function LotImageViewer({ lot, onClose }) {
  const is360 = lot.image_type === '360';
  const containerRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const lastPos = useRef({ x: 0, y: 0 });

  // Simple 360 pan via CSS transform on a sphere-mapped image
  const handleMouseDown = (e) => {
    if (!is360) return;
    setDragging(true);
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    if (!dragging || !is360) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    setRotation(prev => ({ x: prev.x - dy * 0.3, y: prev.y + dx * 0.3 }));
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => setDragging(false);

  // Touch support for mobile
  const handleTouchStart = (e) => {
    if (!is360) return;
    setDragging(true);
    lastPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchMove = (e) => {
    if (!dragging || !is360) return;
    const dx = e.touches[0].clientX - lastPos.current.x;
    const dy = e.touches[0].clientY - lastPos.current.y;
    setRotation(prev => ({ x: prev.x - dy * 0.3, y: prev.y + dx * 0.3 }));
    lastPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  useEffect(() => {
    const handleUp = () => setDragging(false);
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('touchend', handleUp);
    return () => {
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchend', handleUp);
    };
  }, []);

  const imageUrl = lot.image.startsWith('http') ? lot.image : `http://localhost/ForestLake/forest-lake-api${lot.image}`;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl relative overflow-hidden" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div>
            <h3 className="font-bold text-primary-dark">Lot {lot.lot_number}</h3>
            <p className="text-xs text-gray-500">Section: {lot.section} | Block: {lot.block} | <StatusBadge status={lot.status} /></p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none" aria-label="Close">&times;</button>
        </div>

        {/* Image viewer */}
        <div
          ref={containerRef}
          className="relative w-full h-[300px] sm:h-[400px] md:h-[450px] overflow-hidden bg-gray-900 select-none"
          style={{ cursor: is360 ? (dragging ? 'grabbing' : 'grab') : 'default' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          {is360 ? (
            <div
              className="absolute inset-0 w-[200%] h-full bg-cover bg-center transition-none"
              style={{
                backgroundImage: `url(${imageUrl})`,
                transform: `translate(${-rotation.y % 100}%, ${Math.max(-30, Math.min(30, rotation.x))}%)`,
                backgroundSize: 'cover',
              }}
            />
          ) : (
            <img
              src={imageUrl}
              alt={`Lot ${lot.lot_number}`}
              className="w-full h-full object-cover"
            />
          )}

          {is360 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full">
              🌐 Drag to look around (360° View)
            </div>
          )}
        </div>

        {/* Info footer */}
        <div className="p-4 bg-gray-50 text-sm text-gray-600">
          <div className="flex items-center gap-4 flex-wrap">
            <span>📍 Lat: {lot.latitude}</span>
            <span>📍 Lng: {lot.longitude}</span>
            {lot.description && <span className="text-gray-500">— {lot.description}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
