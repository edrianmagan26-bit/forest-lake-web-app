import { useEffect, useState } from 'react';
import api from '../../utils/api';
import { CardSkeleton } from '../../components/LoadingSkeleton';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const COLORS = ['#22c55e', '#f59e0b', '#ef4444'];

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

  const lotData = [
    { name: 'Available', value: stats?.available_lots || 0 },
    { name: 'Reserved', value: stats?.reserved_lots || 0 },
    { name: 'Occupied', value: stats?.occupied_lots || 0 },
  ];

  const clientData = [
    { name: 'Active', value: stats?.active_clients || 0 },
    { name: 'Inactive', value: stats?.inactive_clients || 0 },
    { name: 'Unverified', value: stats?.unverified_clients || 0 },
  ];

  const monthlyData = [
    { month: 'Jan', reservations: 3 },
    { month: 'Feb', reservations: 5 },
    { month: 'Mar', reservations: 2 },
    { month: 'Apr', reservations: 8 },
    { month: 'May', reservations: 6 },
    { month: 'Jun', reservations: 12 },
    { month: 'Jul', reservations: stats?.pending_reservations || 4 },
  ];

  return (
    <div className="animate-fade-in-up space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Overview of cemetery operations and key metrics.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats?.total_clients || 0}</p>
          <p className="text-xs text-gray-500 mt-1">Total Clients</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats?.total_lots || 0}</p>
          <p className="text-xs text-gray-500 mt-1">Total Burial Lots</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats?.pending_reservations || 0}</p>
          <p className="text-xs text-gray-500 mt-1">Pending Reservations</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats?.available_lots || 0}</p>
          <p className="text-xs text-gray-500 mt-1">Available Lots</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reservation Trends */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-1">Reservation Trends</h3>
          <p className="text-sm text-gray-500 mb-6">Monthly reservation activity</p>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="colorRes" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16a34a" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
              <Area type="monotone" dataKey="reservations" stroke="#16a34a" strokeWidth={2.5} fill="url(#colorRes)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Lot Status Bar */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-1">Lot Status</h3>
          <p className="text-sm text-gray-500 mb-4">Distribution overview</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={lotData} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
              <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                {lotData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-2">
            {lotData.map((item, i) => (
              <div key={i} className="flex items-center gap-1.5 text-xs text-gray-600">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }}></span>
                {item.name} ({item.value})
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Client Overview */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-1">Client Overview</h3>
          <p className="text-sm text-gray-500 mb-6">Account status breakdown</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={clientData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
              <Bar dataKey="value" fill="#16a34a" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-1">Quick Summary</h3>
          <p className="text-sm text-gray-500 mb-6">Key performance indicators</p>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Available Lots</span>
              </div>
              <span className="text-sm font-bold text-gray-900">{stats?.available_lots || 0}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-amber-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Reserved Lots</span>
              </div>
              <span className="text-sm font-bold text-gray-900">{stats?.reserved_lots || 0}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Occupied Lots</span>
              </div>
              <span className="text-sm font-bold text-gray-900">{stats?.occupied_lots || 0}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Active Clients</span>
              </div>
              <span className="text-sm font-bold text-gray-900">{stats?.active_clients || 0}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Pending Reservations</span>
              </div>
              <span className="text-sm font-bold text-gray-900">{stats?.pending_reservations || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
