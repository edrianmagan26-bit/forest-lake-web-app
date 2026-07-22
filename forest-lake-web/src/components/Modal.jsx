export default function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl" aria-label="Close">&times;</button>
        {title && <h3 className="text-xl font-bold text-primary-dark mb-4">{title}</h3>}
        {children}
      </div>
    </div>
  );
}
