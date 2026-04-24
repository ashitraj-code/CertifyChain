import { Database, ArrowUpRight, Clock, Cpu } from 'lucide-react';
import Card from '../components/Card';
import StatusBadge from '../components/StatusBadge';
import { transactions } from '../data/certificates';

export default function BlockchainExplorer() {
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-on-surface tracking-tight">Blockchain Explorer</h1>
        <p className="text-sm text-on-surface-variant mt-1">Live view of CertiChain cryptographic events and verifications.</p>
      </div>

      {/* Network Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Latest Block', value: '#18,236,678', icon: Database },
          { label: 'Network', value: 'Ethereum', icon: Cpu },
          { label: 'Avg Block Time', value: '12.1s', icon: Clock },
          { label: 'Gas Price', value: '23 Gwei', icon: ArrowUpRight },
        ].map((stat, i) => {
          const I = stat.icon;
          return (
            <Card key={i}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-primary-container/10 rounded-lg flex items-center justify-center">
                  <I size={16} className="text-primary-container" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-semibold">{stat.label}</p>
                  <p className="text-sm font-bold text-on-surface">{stat.value}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Transactions */}
      <Card className="!p-0 overflow-hidden">
        <div className="px-5 py-4 border-b border-surface-container-high">
          <h2 className="text-lg font-bold text-on-surface flex items-center gap-2">
            <Database size={18} className="text-primary-container" /> Recent Transactions
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface-container-low border-b border-surface-container-high">
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-on-surface-variant">Tx Hash</th>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-on-surface-variant">Type</th>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-on-surface-variant hidden md:table-cell">From</th>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-on-surface-variant hidden lg:table-cell">Block</th>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-on-surface-variant hidden lg:table-cell">Gas</th>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-on-surface-variant">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, i) => (
                <tr key={i} className="border-b border-surface-container-high last:border-0 hover:bg-surface-container-low transition-colors">
                  <td className="px-5 py-4 font-mono text-xs text-primary-container font-semibold">{tx.hash}</td>
                  <td className="px-5 py-4"><StatusBadge status={tx.type} /></td>
                  <td className="px-5 py-4 font-mono text-xs text-on-surface-variant hidden md:table-cell">{tx.from}</td>
                  <td className="px-5 py-4 text-xs text-on-surface-variant hidden lg:table-cell">#{tx.block.toLocaleString()}</td>
                  <td className="px-5 py-4 text-xs text-on-surface-variant hidden lg:table-cell">{tx.gas}</td>
                  <td className="px-5 py-4"><StatusBadge status={tx.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
