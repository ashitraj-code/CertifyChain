import { BarChart3, Award, ShieldCheck, TrendingUp, Plus, ArrowRight } from 'lucide-react';
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
    gradient: 'from-blue-500 to-indigo-600',
    shadow: 'shadow-blue-500/20',
  },
  {
    label: 'Active Courses',
    value: dashboardStats.activeCourses.toString(),
    icon: BarChart3,
    trend: '+3',
    trendUp: true,
    gradient: 'from-indigo-500 to-purple-600',
    shadow: 'shadow-indigo-500/20',
  },
  {
    label: 'Monthly Verifications',
    value: dashboardStats.verificationsThisMonth.toLocaleString(),
    icon: ShieldCheck,
    trend: '+28.3%',
    trendUp: true,
    gradient: 'from-emerald-500 to-teal-600',
    shadow: 'shadow-emerald-500/20',
  },
  {
    label: 'Revocations',
    value: dashboardStats.revocations.toString(),
    icon: TrendingUp,
    trend: '-5.2%',
    trendUp: false,
    gradient: 'from-rose-500 to-red-600',
    shadow: 'shadow-rose-500/20',
  },
];

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Overview</h1>
          <p className="text-sm md:text-base text-slate-500 mt-2">
            High-level institutional statistics and recent blockchain interactions.
          </p>
        </div>
        <Button variant="primary" to="/issue" icon={Plus} size="lg">
          Issue Certificate
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, idx) => {
          const IconComp = stat.icon;
          return (
            <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-shadow duration-300 relative overflow-hidden group">
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.gradient} opacity-5 rounded-full blur-2xl -mr-10 -mt-10 group-hover:opacity-10 transition-opacity`} />
              
              <div className="flex items-start justify-between mb-6">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg ${stat.shadow}`}>
                  <IconComp size={24} className="text-white" />
                </div>
                <span className={`text-sm font-bold px-2.5 py-1 rounded-full ${stat.trendUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                  {stat.trend}
                </span>
              </div>
              <p className="text-4xl font-extrabold text-slate-900 mb-2">{stat.value}</p>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Recent Issuance Table */}
      <Card className="!p-0 overflow-hidden border-slate-200 rounded-3xl">
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
          <h2 className="text-xl font-bold text-slate-900">Recent Issuance</h2>
          <Button variant="ghost" size="sm" to="/registry" icon={ArrowRight}>
            View All
          </Button>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">ID</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">Recipient</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">Course</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">Date</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentIssuances.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-blue-600 font-bold">{item.id}</td>
                  <td className="px-6 py-4 font-semibold text-slate-900">{item.name}</td>
                  <td className="px-6 py-4 text-slate-600">{item.course}</td>
                  <td className="px-6 py-4 text-slate-500 text-sm">{item.date}</td>
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
  );
}
