import { useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({ title, children, onClose }) {
  useEffect(() => {
    const scrollableMain = document.querySelector('main');
    if (scrollableMain) scrollableMain.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    return () => {
      if (scrollableMain) scrollableMain.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, []);

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-start justify-center bg-black/60 backdrop-blur-sm overflow-y-auto py-8 px-4 animate-fade-in" onClick={onClose}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-7 relative my-auto shrink-0 animate-scale-in" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all" aria-label="Close">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        {title && <h3 className="text-xl font-bold text-gray-900 mb-5 pr-8">{title}</h3>}
        {children}
      </div>
    </div>,
    document.body
  );
}
