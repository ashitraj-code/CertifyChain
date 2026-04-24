import { useState } from 'react';
import { Search, Filter, Download, Plus, ArrowUpRight } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import StatusBadge from '../components/StatusBadge';
import { certificates } from '../data/certificates';

export default function CertificateRegistry() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = certificates.filter((cert) => {
    const matchesSearch =
      cert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.course.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || cert.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col gap-12 animate-fade-in relative">
      <div className="absolute top-20 right-20 w-[400px] h-[400px] bg-indigo-100/40 rounded-full blur-[100px] -z-10 pointer-events-none" />
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-5xl font-light text-zinc-900 tracking-tight mb-2">Registry</h1>
          <p className="text-zinc-500 font-light">Manage and verify issued institutional credentials.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" icon={Download}>Export</Button>
          <Button variant="primary" to="/issue" icon={Plus}>New Document</Button>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="relative w-full lg:w-96 group">
            <Search size={16} strokeWidth={1.5} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-indigo-600 transition-colors" />
            <input 
              type="text" 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search registry..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-zinc-200 bg-white text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 focus:outline-none transition-all" 
            />
          </div>
          <div className="flex items-center gap-1 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0">
            <div className="flex items-center justify-center w-8 h-8 rounded shrink-0 mr-2 bg-indigo-50 border border-indigo-100">
              <Filter size={14} className="text-indigo-600" />
            </div>
            {['All', 'Active', 'Revoked'].map((s) => (
              <button 
                key={s} 
                onClick={() => setStatusFilter(s)}
                className={`px-4 py-1.5 rounded-md text-[11px] font-bold uppercase tracking-widest transition-all shrink-0
                  ${statusFilter === s 
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/20' 
                    : 'bg-transparent text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900'
                  }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <Card className="!p-0 overflow-hidden">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50/50">
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">ID</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Recipient</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Course</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Status</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {filtered.map((cert) => (
                  <tr key={cert.id} className="hover:bg-zinc-50/50 transition-colors group">
                    <td className="px-6 py-4 font-mono text-xs font-medium text-indigo-600">{cert.id}</td>
                    <td className="px-6 py-4 font-medium text-zinc-900">{cert.name}</td>
                    <td className="px-6 py-4 text-zinc-500">{cert.course}</td>
                    <td className="px-6 py-4"><StatusBadge status={cert.status} /></td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-zinc-400 hover:text-indigo-600 transition-colors opacity-0 group-hover:opacity-100">
                        <ArrowUpRight size={16} strokeWidth={1.5} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Minimal Pagination */}
          <div className="px-6 py-4 border-t border-zinc-100 flex items-center justify-between">
            <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">
              {filtered.length} of {certificates.length} records
            </p>
            <div className="flex gap-1">
              {[1, 2, 3].map((p) => (
                <button 
                  key={p} 
                  className={`w-8 h-8 rounded text-xs font-bold flex items-center justify-center transition-all
                    ${p === 1 
                      ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' 
                      : 'text-zinc-400 hover:bg-zinc-50 hover:text-zinc-900'
                    }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
