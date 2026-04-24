import { useState } from 'react';
import { Search, Filter, Download, Plus, Eye } from 'lucide-react';
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
    <div className="flex flex-col gap-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Certificate Registry</h1>
          <p className="text-sm md:text-base text-slate-500 mt-2">Manage and verify issued institutional credentials.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" size="md" icon={Download}>Export</Button>
          <Button variant="primary" size="md" to="/issue" icon={Plus}>New Certificate</Button>
        </div>
      </div>

      <Card className="p-4 md:p-6 rounded-3xl border-slate-200">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, ID, or course..."
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all focus:bg-white" 
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100 shrink-0">
              <Filter size={16} className="text-slate-500" />
            </div>
            {['All', 'Active', 'Revoked'].map((s) => (
              <button 
                key={s} 
                onClick={() => setStatusFilter(s)}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all shrink-0
                  ${statusFilter === s 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                    : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                  }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </Card>

      <Card className="!p-0 overflow-hidden rounded-3xl border-slate-200">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">ID</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">Recipient</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">Course</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">Status</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((cert) => (
                <tr key={cert.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-blue-600 font-bold">{cert.id}</td>
                  <td className="px-6 py-4 font-semibold text-slate-900">{cert.name}</td>
                  <td className="px-6 py-4 text-slate-600">{cert.course}</td>
                  <td className="px-6 py-4"><StatusBadge status={cert.status} /></td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition-all">
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm font-medium text-slate-500">
            Showing <span className="font-bold text-slate-900">{filtered.length}</span> of <span className="font-bold text-slate-900">{certificates.length}</span> certificates
          </p>
          <div className="flex gap-2">
            {[1, 2, 3].map((p) => (
              <button 
                key={p} 
                className={`w-10 h-10 rounded-xl text-sm font-bold flex items-center justify-center transition-all
                  ${p === 1 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900'
                  }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
