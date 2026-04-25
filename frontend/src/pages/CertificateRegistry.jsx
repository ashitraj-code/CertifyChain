import { useState, useEffect } from 'react';
import { Search, Filter, Download, Plus, ArrowUpRight, Loader2 } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import StatusBadge from '../components/StatusBadge';
import API_BASE from '../config/api';
import { formatTokenId, getPolygonscanUrl } from '../utils/formatters';
import QRCodeModule from 'react-qr-code';

const QRCode = typeof QRCodeModule === 'function' ? QRCodeModule : (QRCodeModule.QRCode || QRCodeModule.default || QRCodeModule);

export default function CertificateRegistry() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await fetch(`${API_BASE}/certificates`);
        const data = await response.json();
        if (data.success) {
          setCertificates(data.data);
        }
      } catch (err) {
        console.error('Failed to fetch certificates:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  const filtered = certificates.filter((cert) => {
    const matchesSearch =
      cert.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(cert.tokenId).includes(searchQuery);
    const matchesStatus = statusFilter === 'All' || cert.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const downloadQR = (tokenId) => {
    const svgId = `QRCode-Registry-${tokenId}`;
    const svg = document.getElementById(svgId);
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    
    img.onload = () => {
      const padding = 32;
      canvas.width = img.width + padding * 2;
      canvas.height = img.height + 50 + padding * 2;
      
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, padding, padding);
      
      ctx.fillStyle = "#000000";
      ctx.font = "bold 16px monospace";
      ctx.textAlign = "center";
      ctx.fillText(formatTokenId(tokenId), canvas.width / 2, canvas.height - 20);
      
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `Certificate_QR_${formatTokenId(tokenId)}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
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
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Token</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Recipient</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Course</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Status</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-zinc-400">
                      {certificates.length === 0 ? 'No certificates found.' : 'No matching certificates.'}
                    </td>
                  </tr>
                ) : (
                  filtered.map((cert) => (
                    <tr key={cert._id} className="hover:bg-zinc-50/50 transition-colors group">
                      <td className="px-6 py-4 font-mono text-xs font-medium text-indigo-600">{formatTokenId(cert.tokenId)}</td>
                      <td className="px-6 py-4 font-medium text-zinc-900">{cert.studentName}</td>
                      <td className="px-6 py-4 text-zinc-500">{cert.course}</td>
                      <td className="px-6 py-4"><StatusBadge status={cert.status} /></td>
                      <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                        <button 
                          onClick={() => downloadQR(cert.tokenId)}
                          className="p-1.5 text-zinc-400 hover:text-emerald-500 hover:bg-emerald-500/10 rounded-md transition-colors opacity-0 group-hover:opacity-100"
                          title="Generate & Download QR Code"
                        >
                          <Download size={16} />
                        </button>
                        <div style={{ display: 'none' }}>
                          <QRCode id={`QRCode-Registry-${cert.tokenId}`} value={formatTokenId(cert.tokenId)} size={120} />
                        </div>
                        <a
                          href={getPolygonscanUrl(cert.transactionHash)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-zinc-400 hover:text-indigo-600 hover:bg-indigo-500/10 rounded-md transition-colors opacity-0 group-hover:opacity-100"
                          title="View on Block Explorer"
                        >
                          <ArrowUpRight size={16} />
                        </a>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          {/* Minimal Pagination */}
          <div className="px-6 py-4 border-t border-zinc-100 flex items-center justify-between">
            <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">
              {filtered.length} of {certificates.length} records
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
