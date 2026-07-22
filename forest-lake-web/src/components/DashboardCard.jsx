export default function DashboardCard({ title, value, icon, color = 'bg-primary' }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
        </div>
        <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center text-white text-xl`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
