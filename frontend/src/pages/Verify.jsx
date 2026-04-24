import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, QrCode, ArrowRight } from 'lucide-react';
import Button from '../components/Button';

export default function Verify() {
  const [certId, setCertId] = useState('');
  const navigate = useNavigate();

  const handleVerify = (e) => {
    e.preventDefault();
    if (certId.trim()) {
      if (certId.toLowerCase().includes('invalid')) {
        navigate('/result-invalid');
      } else {
        navigate('/result-valid');
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto pt-12 md:pt-32 relative">
      <div className="absolute top-0 right-10 w-[400px] h-[400px] bg-sky-100/40 rounded-full blur-[100px] -z-10 pointer-events-none" />
      
      <div className="mb-16 animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-light text-zinc-900 mb-6 tracking-tight">
          Verify Document
        </h1>
        <p className="text-lg text-zinc-500 font-light leading-relaxed">
          Enter a cryptographic ID or scan a document QR code to verify authenticity against the blockchain ledger.
        </p>
      </div>

      <div className="space-y-12">
        <form onSubmit={handleVerify} className="animate-fade-in stagger-1">
          <div className="relative mb-6 group">
            <Search size={20} strokeWidth={1.5} className="absolute left-0 top-1/2 -translate-y-1/2 text-zinc-300 group-focus-within:text-indigo-600 transition-colors" />
            <input
              type="text"
              value={certId}
              onChange={(e) => setCertId(e.target.value)}
              placeholder="Certificate ID (e.g., CERT-2026-001)"
              className="w-full pl-10 pr-4 py-4 bg-transparent border-b border-zinc-200 text-xl md:text-2xl font-light text-zinc-900 placeholder:text-zinc-300 focus:border-indigo-600 focus:outline-none transition-all"
            />
          </div>
          <Button type="submit" variant="primary" size="lg" icon={ArrowRight}>
            Run Verification
          </Button>
        </form>

        <div className="flex items-center gap-6 py-4 animate-fade-in stagger-2 opacity-50">
          <div className="flex-1 h-px bg-zinc-200" />
          <span className="text-[10px] font-bold uppercase text-zinc-400 tracking-widest">Or scan code</span>
          <div className="flex-1 h-px bg-zinc-200" />
        </div>

        <div className="animate-fade-in stagger-3 flex justify-center">
          <button className="flex flex-col items-center gap-4 group">
            <div className="w-24 h-24 rounded-2xl border border-indigo-100 bg-indigo-50/50 shadow-sm flex items-center justify-center group-hover:bg-indigo-100 group-hover:border-indigo-200 transition-all duration-300">
              <QrCode size={32} strokeWidth={1} className="text-indigo-600" />
            </div>
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest group-hover:text-indigo-700 transition-colors">
              Open Camera
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
