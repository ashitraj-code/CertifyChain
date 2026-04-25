import { useState, useEffect } from 'react';
import { LayoutDashboard, Award, ShieldCheck, TrendingUp, Plus, ArrowRight, Loader2 } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import StatusBadge from '../components/StatusBadge';
import API_BASE from '../config/api';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, certsRes] = await Promise.all([
          fetch(`${API_BASE}/dashboard/stats`),
          fetch(`${API_BASE}/certificates`),
        ]);

        const statsData = await statsRes.json();
        const certsData = await certsRes.json();

        if (statsData.success) setStats(statsData.data);
        if (certsData.success) setCertificates(certsData.data.slice(0, 5));
      } catch (err) {
        console.error('Dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const statCards = [
    {
      label: 'Total Issued',
      value: stats?.totalCertificates?.toLocaleString() || '0',
      icon: Award,
      trend: '+' + (stats?.totalCertificates || 0),
      trendUp: true,
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10 border-indigo-500/20',
    },
    {
      label: 'Active Courses',
      value: stats?.activeCourses?.toString() || '0',
      icon: LayoutDashboard,
      trend: '+' + (stats?.activeCourses || 0),
      trendUp: true,
      color: 'text-sky-400',
      bg: 'bg-sky-500/10 border-sky-500/20',
    },
    {
      label: 'Verifications',
      value: stats?.verificationsThisMonth?.toLocaleString() || '0',
      icon: ShieldCheck,
      trend: stats?.verificationsThisMonth?.toString() || '0',
      trendUp: true,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
    },
    {
      label: 'Revocations',
      value: stats?.revocations?.toString() || '0',
      icon: TrendingUp,
      trend: stats?.revocations?.toString() || '0',
      trendUp: false,
      color: 'text-rose-400',
      bg: 'bg-rose-500/10 border-rose-500/20',
    },
  ];

  const formatTimeAgo = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHrs = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHrs / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHrs < 24) return `${diffHrs} hours ago`;
    return `${diffDays} days ago`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 size={32} className="animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-12 animate-fade-in relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-400/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-5xl font-light text-zinc-900 tracking-tight mb-2">Overview</h1>
          <p className="text-zinc-500 font-light">Institutional statistics and recent network activity.</p>
        </div>
        <Button variant="primary" to="/issue" icon={Plus}>
          New Document
        </Button>
      </div>

      {/* High Contrast Dark KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, idx) => {
          const IconComp = stat.icon;
          return (
            <div key={idx} className="bg-zinc-950 rounded-2xl border border-zinc-800 p-6 sm:p-8 flex flex-col gap-6 group hover:border-zinc-700 transition-colors shadow-xl shadow-zinc-900/10">
              <div className="flex items-start justify-between">
                <div className={`p-2 border rounded-lg transition-colors duration-300 ${stat.bg}`}>
                  <IconComp size={16} strokeWidth={2} className={stat.color} />
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${stat.trendUp ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'}`}>
                  {stat.trend}
                </span>
              </div>
              <div>
                <p className="text-3xl font-light text-white tracking-tight group-hover:scale-[1.02] transition-transform origin-left">{stat.value}</p>
                <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-widest mt-1">
                  {stat.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Issuance Table */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-light text-zinc-900 tracking-tight">Recent Issuance</h2>
          <Button variant="ghost" size="sm" to="/registry" icon={ArrowRight}>
            View All
          </Button>
        </div>

        <Card className="!p-0 overflow-hidden">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50/50">
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Token</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Recipient</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Course</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Date</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {certificates.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-zinc-400">
                      No certificates issued yet. Click "New Document" to get started.
                    </td>
                  </tr>
                ) : (
                  certificates.map((item) => (
                    <tr key={item._id} className="hover:bg-zinc-50/50 transition-colors">
                      <td className="px-6 py-4 font-mono text-xs font-medium text-indigo-600">#{item.tokenId}</td>
                      <td className="px-6 py-4 font-medium text-zinc-900">{item.studentName}</td>
                      <td className="px-6 py-4 text-zinc-500">{item.course}</td>
                      <td className="px-6 py-4 text-zinc-400 text-xs">{formatTimeAgo(item.createdAt)}</td>
                      <td className="px-6 py-4">
                        <StatusBadge status={item.status === 'Active' ? 'Minted' : item.status} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
