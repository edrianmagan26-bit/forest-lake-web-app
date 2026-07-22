import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';
import DashboardCard from '../../components/DashboardCard';
import { CardSkeleton } from '../../components/LoadingSkeleton';

export default function ClientDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/dashboard/client.php')
      .then(res => setStats(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary-dark mb-2">Welcome back, {user?.first_name || 'Client'}!</h1>
      <p className="text-gray-500 mb-8">Here's an overview of your account.</p>

      {loading ? <CardSkeleton count={3} /> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <DashboardCard title="Total Reservations" value={stats?.total_reservations || 0} icon="📋" color="bg-primary" />
          <DashboardCard title="Pending Reservations" value={stats?.pending_reservations || 0} icon="⏳" color="bg-yellow-500" />
          <DashboardCard title="Approved Reservations" value={stats?.approved_reservations || 0} icon="✅" color="bg-green-500" />
        </div>
      )}

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="font-semibold text-gray-800 mb-3">Account Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div><span className="text-gray-500">Email:</span> <span className="font-medium">{user?.email}</span></div>
          <div><span className="text-gray-500">Role:</span> <span className="font-medium capitalize">{user?.role}</span></div>
          <div><span className="text-gray-500">Status:</span> <span className="font-medium capitalize">{user?.status}</span></div>
          <div><span className="text-gray-500">Email Verified:</span> <span className="font-medium">{user?.email_verified ? 'Yes' : 'No'}</span></div>
        </div>
      </div>
    </div>
  );
}
