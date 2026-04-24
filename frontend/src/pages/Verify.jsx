import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, QrCode, ArrowRight, ShieldCheck, ScanLine } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';

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
    <div className="max-w-3xl mx-auto pt-8 md:pt-16">
      <div className="text-center mb-12 animate-fade-in">
        <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner border border-blue-100">
          <ShieldCheck size={36} className="text-blue-600" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
          Verify Certificate
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed max-w-lg mx-auto">
          Enter the Certificate ID or scan the QR code to cryptographically verify authenticity on the blockchain.
        </p>
      </div>

      <div className="space-y-6">
        <Card className="animate-fade-in stagger-1 !p-8 border-2 border-slate-100">
          <form onSubmit={handleVerify}>
            <label className="text-sm font-bold uppercase tracking-wider text-slate-500 block mb-3">
              Certificate ID
            </label>
            <div className="relative mb-5 group">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="text"
                value={certId}
                onChange={(e) => setCertId(e.target.value)}
                placeholder="e.g., CERT-2023-001"
                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-slate-200 bg-slate-50 text-lg font-mono text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all"
              />
            </div>
            <Button type="submit" variant="primary" size="lg" className="w-full text-lg" icon={ArrowRight}>
              Verify on Blockchain
            </Button>
          </form>
        </Card>

        <div className="flex items-center gap-4 py-4 animate-fade-in stagger-2">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="text-xs font-bold uppercase text-slate-400 tracking-widest">OR</span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        <Card className="animate-fade-in stagger-3 bg-slate-50 border-dashed border-2 hover:bg-slate-100 transition-colors cursor-pointer group">
          <div className="flex flex-col items-center text-center py-8">
            <div className="w-24 h-24 bg-white rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
              <div className="relative">
                <QrCode size={40} className="text-slate-700" />
                <ScanLine size={40} className="absolute inset-0 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Scan QR Code</h3>
            <p className="text-sm text-slate-500 max-w-xs">
              Use your device camera to scan the certificate QR code for instant mobile verification.
            </p>
          </div>
        </Card>
      </div>

      <p className="text-sm text-slate-400 text-center mt-8">
        Certificate IDs are printed on every CertiChain credential. Look for the alphanumeric code starting with "CERT-".
      </p>
    </div>
  );
}
