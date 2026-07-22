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
    <div className="animate-fade-in-up">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Welcome back, {user?.first_name || 'Client'}!</h1>
        <p className="text-gray-500 mt-1">Here's an overview of your account activity.</p>
      </div>

      {loading ? <CardSkeleton count={3} /> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8 stagger-children">
          <DashboardCard title="Total Reservations" value={stats?.total_reservations || 0} icon="📋" color="bg-primary" />
          <DashboardCard title="Pending" value={stats?.pending_reservations || 0} icon="⏳" color="bg-yellow-500" />
          <DashboardCard title="Approved" value={stats?.approved_reservations || 0} icon="✅" color="bg-green-500" />
        </div>
      )}

      <div className="bg-white rounded-2xl p-7 border border-gray-100">
        <h2 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
          <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          Account Information
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: 'Email', value: user?.email },
            { label: 'Role', value: user?.role },
            { label: 'Status', value: user?.status },
            { label: 'Email Verified', value: user?.email_verified ? 'Yes' : 'No' },
          ].map((item, i) => (
            <div key={i} className="bg-gray-50 rounded-xl px-4 py-3">
              <p className="text-xs text-gray-500 mb-0.5">{item.label}</p>
              <p className="font-medium text-gray-900 capitalize">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
