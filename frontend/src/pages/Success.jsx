import { Check, Copy, ArrowRight, ArrowUpRight } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';

export default function Success() {
  const cert = {
    id: 'CERT-2024-009',
    name: 'Eleanor Vance',
    course: 'Master of Science in Cryptography',
    date: 'October 24, 2023',
    txHash: '0x8fB3c9A...4d2E1aB9f',
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] py-12 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-100/40 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <div className="max-w-xl w-full mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <div className="relative w-16 h-16 mx-auto mb-6">
            <div className="absolute inset-0 bg-emerald-400 rounded-full blur-xl opacity-40 animate-pulse" />
            <div className="relative w-full h-full rounded-full border border-emerald-200 flex items-center justify-center bg-white shadow-sm shadow-emerald-500/20 animate-bounce-in">
              <Check size={24} strokeWidth={2} className="text-emerald-500" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-light text-zinc-900 mb-4 tracking-tight">
            Successfully Minted
          </h1>
          <p className="text-emerald-600/80 font-medium">
            Document anchored to block #18236674
          </p>
        </div>

        <Card className="animate-fade-in stagger-1 border-emerald-100/50">
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between p-4 bg-emerald-50/50 rounded-lg border border-emerald-100">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 mb-1">Hash ID</p>
                <p className="text-sm font-mono font-medium text-zinc-900">{cert.id}</p>
              </div>
              <button className="p-2 rounded text-emerald-600 hover:text-emerald-700 hover:bg-emerald-100 transition-colors">
                <Copy size={16} strokeWidth={1.5} />
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-end border-b border-zinc-100 pb-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Recipient</p>
                <p className="text-sm font-bold text-zinc-900">{cert.name}</p>
              </div>
              <div className="flex justify-between items-end border-b border-zinc-100 pb-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Credential</p>
                <p className="text-sm font-bold text-zinc-900">{cert.course}</p>
              </div>
              <div className="flex justify-between items-end border-b border-zinc-100 pb-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Transaction</p>
                <a href="#" className="flex items-center gap-1 text-sm font-mono text-indigo-600 hover:text-indigo-800 transition-colors">
                  {cert.txHash}
                  <ArrowUpRight size={14} strokeWidth={1.5} />
                </a>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <Button variant="secondary" to="/dashboard" className="w-full sm:flex-1">
                Dashboard
              </Button>
              <Button variant="primary" to="/issue" className="w-full sm:flex-1">
                Mint Next
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
