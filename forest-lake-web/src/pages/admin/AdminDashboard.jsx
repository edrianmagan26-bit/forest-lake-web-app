import { useEffect, useState } from 'react';
import api from '../../utils/api';
import DashboardCard from '../../components/DashboardCard';
import { CardSkeleton } from '../../components/LoadingSkeleton';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/dashboard/admin.php')
      .then(res => setStats(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <CardSkeleton count={8} />;

  return (
    <div className="animate-fade-in-up">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Overview of cemetery operations and key metrics.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 stagger-children">
        <DashboardCard title="Total Clients" value={stats?.total_clients || 0} icon="👥" color="bg-primary" />
        <DashboardCard title="Active Clients" value={stats?.active_clients || 0} icon="✅" color="bg-green-500" />
        <DashboardCard title="Inactive Clients" value={stats?.inactive_clients || 0} icon="⛔" color="bg-gray-500" />
        <DashboardCard title="Total Burial Lots" value={stats?.total_lots || 0} icon="🗺️" color="bg-primary-mid" />
        <DashboardCard title="Available Lots" value={stats?.available_lots || 0} icon="🟢" color="bg-available" />
        <DashboardCard title="Reserved Lots" value={stats?.reserved_lots || 0} icon="🟡" color="bg-reserved" />
        <DashboardCard title="Occupied Lots" value={stats?.occupied_lots || 0} icon="🔴" color="bg-occupied" />
        <DashboardCard title="Pending Reservations" value={stats?.pending_reservations || 0} icon="⏳" color="bg-yellow-500" />
      </div>
    </div>
  );
}
