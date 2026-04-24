import { LayoutDashboard, Award, ShieldCheck, TrendingUp, Plus, ArrowRight } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import StatusBadge from '../components/StatusBadge';
import { dashboardStats, recentIssuances } from '../data/certificates';

const statCards = [
  {
    label: 'Total Issued',
    value: dashboardStats.totalCertificates.toLocaleString(),
    icon: Award,
    trend: '+12.5%',
    trendUp: true,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50 border-indigo-100',
  },
  {
    label: 'Active Courses',
    value: dashboardStats.activeCourses.toString(),
    icon: LayoutDashboard,
    trend: '+3',
    trendUp: true,
    color: 'text-sky-600',
    bg: 'bg-sky-50 border-sky-100',
  },
  {
    label: 'Verifications',
    value: dashboardStats.verificationsThisMonth.toLocaleString(),
    icon: ShieldCheck,
    trend: '+28.3%',
    trendUp: true,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50 border-emerald-100',
  },
  {
    label: 'Revocations',
    value: dashboardStats.revocations.toString(),
    icon: TrendingUp,
    trend: '-5.2%',
    trendUp: false,
    color: 'text-rose-600',
    bg: 'bg-rose-50 border-rose-100',
  },
];

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-100/50 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div>
          <h1 className="text-3xl md:text-5xl font-light text-zinc-900 tracking-tight mb-2">Overview</h1>
          <p className="text-zinc-500 font-light">Institutional statistics and recent network activity.</p>
        </div>
        <Button variant="primary" to="/issue" icon={Plus}>
          New Document
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, idx) => {
          const IconComp = stat.icon;
          return (
            <Card key={idx} className="flex flex-col gap-6 group">
              <div className="flex items-start justify-between">
                <div className={`p-2 border rounded-lg transition-colors duration-300 ${stat.bg}`}>
                  <IconComp size={16} strokeWidth={2} className={stat.color} />
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${stat.trendUp ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-rose-50 border-rose-200 text-rose-700'}`}>
                  {stat.trend}
                </span>
              </div>
              <div>
                <p className="text-3xl font-light text-zinc-900 tracking-tight group-hover:scale-[1.02] transition-transform origin-left">{stat.value}</p>
                <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mt-1">
                  {stat.label}
                </p>
              </div>
            </Card>
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
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">ID</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Recipient</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Course</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Date</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {recentIssuances.map((item) => (
                  <tr key={item.id} className="hover:bg-zinc-50/50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs font-medium text-indigo-600">{item.id}</td>
                    <td className="px-6 py-4 font-medium text-zinc-900">{item.name}</td>
                    <td className="px-6 py-4 text-zinc-500">{item.course}</td>
                    <td className="px-6 py-4 text-zinc-400 text-xs">{item.date}</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={item.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
