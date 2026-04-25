import { useState, useEffect } from 'react';
import { Database, ArrowUpRight, Clock, Cpu, Loader2 } from 'lucide-react';
import Card from '../components/Card';
import StatusBadge from '../components/StatusBadge';
import API_BASE from '../config/api';
import { getPolygonscanUrl } from '../utils/formatters';

export default function BlockchainExplorer() {
  const [transactions, setTransactions] = useState([]);
  const [networkInfo, setNetworkInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(`${API_BASE}/blockchain/transactions`);
        const data = await response.json();
        if (data.success) {
          setTransactions(data.data);
          setNetworkInfo(data.networkInfo);
        }
      } catch (err) {
        console.error('Failed to fetch blockchain data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 size={32} className="animate-spin text-indigo-600" />
      </div>
    );
  }

  const stats = [
    { label: 'Latest Block', value: networkInfo?.latestBlock ? `#${networkInfo.latestBlock.toLocaleString()}` : 'N/A', icon: Database },
    { label: 'Network', value: networkInfo?.network || 'Polygon Amoy', icon: Cpu },
    { label: 'Avg Block Time', value: '2.0s', icon: Clock },
    { label: 'Gas Price', value: networkInfo?.gasPrice || 'N/A', icon: ArrowUpRight },
  ];

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleString();
  };

  const truncateHash = (hash) => {
    if (!hash || hash === 'N/A') return 'N/A';
    return `${hash.substring(0, 10)}...${hash.substring(hash.length - 8)}`;
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-on-surface tracking-tight">Blockchain Explorer</h1>
        <p className="text-sm text-on-surface-variant mt-1">Live view of CertiChain cryptographic events and verifications.</p>
      </div>

      {/* Network Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, i) => {
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
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-on-surface-variant hidden lg:table-cell">Time</th>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-on-surface-variant">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-5 py-8 text-center text-zinc-400">
                    No transactions recorded yet.
                  </td>
                </tr>
              ) : (
                transactions.map((tx, i) => (
                  <tr key={i} className="border-b border-surface-container-high last:border-0 hover:bg-surface-container-low transition-colors">
                    <td className="px-5 py-4 font-mono text-xs text-primary-container font-semibold">
                      {tx.hash !== 'N/A' ? (
                        <a href={getPolygonscanUrl(tx.hash)} target="_blank" rel="noopener noreferrer" className="hover:underline">
                          {truncateHash(tx.hash)}
                        </a>
                      ) : (
                        'N/A'
                      )}
                    </td>
                    <td className="px-5 py-4"><StatusBadge status={tx.type} /></td>
                    <td className="px-5 py-4 font-mono text-xs text-on-surface-variant hidden md:table-cell">
                      {tx.from !== 'N/A' ? truncateHash(tx.from) : 'N/A'}
                    </td>
                    <td className="px-5 py-4 text-xs text-on-surface-variant hidden lg:table-cell">{formatDate(tx.timestamp)}</td>
                    <td className="px-5 py-4"><StatusBadge status={tx.status} /></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
