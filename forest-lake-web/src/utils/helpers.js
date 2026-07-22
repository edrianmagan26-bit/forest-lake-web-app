// Debounce utility
export function debounce(fn, delay = 400) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// Status color mapping
export function getStatusColor(status) {
  switch (status?.toLowerCase()) {
    case 'available': return 'bg-available text-white';
    case 'reserved': return 'bg-reserved text-white';
    case 'occupied': return 'bg-occupied text-white';
    case 'pending': return 'bg-yellow-500 text-white';
    case 'approved': return 'bg-green-500 text-white';
    case 'declined': return 'bg-red-500 text-white';
    case 'cancelled': return 'bg-gray-500 text-white';
    case 'active': return 'bg-green-500 text-white';
    case 'inactive': return 'bg-gray-500 text-white';
    case 'unverified': return 'bg-yellow-500 text-white';
    default: return 'bg-gray-400 text-white';
  }
}

// Format date
export function formatDate(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  });
}
