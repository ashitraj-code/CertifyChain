import { useState } from 'react';
import { Search, Filter, Download, Shield } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import StatusBadge from '../components/StatusBadge';
import { auditLogs } from '../data/certificates';

export default function AuditLogs() {
  const [filterSeverity, setFilterSeverity] = useState('All');

  const filtered = filterSeverity === 'All' ? auditLogs : auditLogs.filter((l) => l.severity === filterSeverity);

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-on-surface tracking-tight">System Audit Logs</h1>
          <p className="text-sm text-on-surface-variant mt-1">Cryptographically verifiable record of all administrative and automated actions.</p>
        </div>
        <Button variant="secondary" size="sm" icon={Download}>Export Logs</Button>
      </div>

      <Card className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-outline" />
            <input type="text" placeholder="Search logs..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-outline-variant bg-white text-sm focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 focus:outline-none transition-all" />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-outline" />
            {['All', 'INFO', 'WARNING', 'CRITICAL'].map((s) => (
              <button key={s} onClick={() => setFilterSeverity(s)}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${filterSeverity === s ? 'bg-primary-container text-white' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'}`}>
                {s}
              </button>
            ))}
          </div>
        </div>
      </Card>

      <Card className="!p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface-container-low border-b border-surface-container-high">
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-on-surface-variant">Timestamp</th>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-on-surface-variant">Action</th>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-on-surface-variant hidden md:table-cell">Actor</th>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-on-surface-variant hidden lg:table-cell">Details</th>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-on-surface-variant">Severity</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((log) => (
                <tr key={log.id} className="border-b border-surface-container-high last:border-0 hover:bg-surface-container-low transition-colors">
                  <td className="px-5 py-4 font-mono text-xs text-on-surface-variant whitespace-nowrap">{log.timestamp}</td>
                  <td className="px-5 py-4 text-xs font-semibold text-on-surface">{log.action.replace(/_/g, ' ')}</td>
                  <td className="px-5 py-4 text-xs text-on-surface-variant hidden md:table-cell">{log.actor}</td>
                  <td className="px-5 py-4 text-xs text-on-surface-variant hidden lg:table-cell max-w-xs truncate">{log.details}</td>
                  <td className="px-5 py-4"><StatusBadge status={log.severity} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
