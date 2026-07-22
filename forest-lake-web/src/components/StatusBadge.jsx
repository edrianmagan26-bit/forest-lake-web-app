export default function StatusBadge({ status }) {
  const styles = {
    available: 'bg-green-50 text-green-700 border-green-200',
    reserved: 'bg-amber-50 text-amber-700 border-amber-200',
    occupied: 'bg-red-50 text-red-700 border-red-200',
    pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    approved: 'bg-green-50 text-green-700 border-green-200',
    declined: 'bg-red-50 text-red-700 border-red-200',
    cancelled: 'bg-gray-50 text-gray-600 border-gray-200',
    active: 'bg-green-50 text-green-700 border-green-200',
    inactive: 'bg-gray-50 text-gray-600 border-gray-200',
    unverified: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  };

  const style = styles[status?.toLowerCase()] || 'bg-gray-50 text-gray-600 border-gray-200';

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold capitalize border ${style}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${
        status === 'available' || status === 'approved' || status === 'active' ? 'bg-green-500' :
        status === 'reserved' || status === 'pending' || status === 'unverified' ? 'bg-amber-500' :
        status === 'occupied' || status === 'declined' ? 'bg-red-500' : 'bg-gray-400'
      }`}></span>
      {status}
    </span>
  );
}
