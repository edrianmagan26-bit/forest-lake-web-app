export default function DashboardCard({ title, value, icon, color = 'bg-primary' }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 card-hover group">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center text-white text-2xl shadow-sm group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
