import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';
import usePolling, { updateIfChanged } from '../../hooks/usePolling';
import StatusBadge from '../../components/StatusBadge';
import { CardSkeleton } from '../../components/LoadingSkeleton';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#f59e0b', '#22c55e', '#ef4444', '#6b7280'];

export default function ClientDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = () => {
    api.get('/dashboard/client.php')
      .then(res => setStats(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchStats(); }, []);
  usePolling(() => {
    api.get('/dashboard/client.php')
      .then(res => updateIfChanged(setStats, res.data))
      .catch(() => {});
  });

  if (loading) return <CardSkeleton count={6} />;

  const chartData = [
    { name: 'Pending', value: stats?.pending_reservations || 0 },
    { name: 'Approved', value: stats?.approved_reservations || 0 },
    { name: 'Occupied', value: stats?.occupied_lots || 0 },
    { name: 'Declined', value: stats?.declined_reservations || 0 },
  ].filter(d => d.value > 0);

  return (
    <div className="animate-fade-in-up space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Welcome back, {user?.first_name || 'Client'}!</h1>
        <p className="text-gray-500 mt-1">Here's an overview of your account activity.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-3">
            <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats?.total_reservations || 0}</p>
          <p className="text-xs text-gray-500 mt-1">Total Reservations</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center mb-3">
            <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats?.pending_reservations || 0}</p>
          <p className="text-xs text-gray-500 mt-1">Pending</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center mb-3">
            <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats?.approved_reservations || 0}</p>
          <p className="text-xs text-gray-500 mt-1">Approved</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center mb-3">
            <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats?.occupied_lots || 0}</p>
          <p className="text-xs text-gray-500 mt-1">Occupied Lots</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-1">Reservation Status</h3>
          <p className="text-sm text-gray-500 mb-4">Your reservations breakdown</p>
          {chartData.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={chartData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={4} dataKey="value">
                    {chartData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap justify-center gap-3 mt-2">
                {chartData.map((item, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs text-gray-600">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }}></span>
                    {item.name} ({item.value})
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-[180px] text-gray-400 text-sm">No data yet</div>
          )}
        </div>

        {/* Recent Reservations */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-1">Recent Activity</h3>
          <p className="text-sm text-gray-500 mb-4">Your latest reservation updates</p>
          {stats?.recent_reservations?.length > 0 ? (
            <div className="space-y-3">
              {stats.recent_reservations.map(r => (
                <div key={r.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Lot {r.lot_number}</p>
                      <p className="text-xs text-gray-500">Section {r.section} · {r.serial_number || `#${r.id}`}</p>
                    </div>
                  </div>
                  <StatusBadge status={r.status} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-[180px] text-gray-400 text-sm">No reservations yet</div>
          )}
        </div>
      </div>

      {/* Account Info */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Account Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Email', value: user?.email },
            { label: 'Name', value: `${user?.first_name || ''} ${user?.last_name || ''}`.trim() || 'N/A' },
            { label: 'Status', value: user?.status },
            { label: 'Verified', value: user?.email_verified ? 'Yes' : 'No' },
          ].map((item, i) => (
            <div key={i} className="bg-gray-50 rounded-xl px-4 py-3">
              <p className="text-xs text-gray-500 mb-0.5">{item.label}</p>
              <p className="font-medium text-gray-900 capitalize text-sm truncate">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
