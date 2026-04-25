import { useLocation } from 'react-router-dom';
import { Check, Copy, ArrowRight, ArrowUpRight } from 'lucide-react';
import Button from '../components/Button';

export default function Success() {
  const location = useLocation();
  const certData = location.state?.certificate;

  const cert = {
    id: certData?.tokenId ?? 'N/A',
    name: certData?.studentName || 'N/A',
    course: certData?.course || 'N/A',
    txHash: certData?.transactionHash || 'N/A',
    ipfsHash: certData?.ipfsHash || 'N/A',
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] py-12 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-400/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

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
            Certificate NFT minted • Token #{cert.id}
          </p>
        </div>

        {/* High Contrast Dark Details Card */}
        <div className="animate-fade-in stagger-1 bg-zinc-950 rounded-3xl p-8 border border-zinc-800 shadow-2xl shadow-zinc-900/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[60px] pointer-events-none" />

          <div className="flex flex-col gap-8 relative z-10">
            <div className="flex items-center justify-between p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1">Token ID</p>
                <p className="text-sm font-mono font-medium text-emerald-400">#{cert.id}</p>
              </div>
              <button onClick={() => copyToClipboard(String(cert.id))} className="p-2 rounded text-zinc-400 hover:text-emerald-400 hover:bg-zinc-800 transition-colors">
                <Copy size={16} strokeWidth={1.5} />
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-end border-b border-zinc-800 pb-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Recipient</p>
                <p className="text-sm font-bold text-white">{cert.name}</p>
              </div>
              <div className="flex justify-between items-end border-b border-zinc-800 pb-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Credential</p>
                <p className="text-sm font-bold text-white">{cert.course}</p>
              </div>
              <div className="flex justify-between items-end border-b border-zinc-800 pb-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">IPFS</p>
                <p className="text-sm font-mono text-emerald-500 truncate max-w-[200px]">{cert.ipfsHash}</p>
              </div>
              <div className="flex justify-between items-end border-b border-zinc-800 pb-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Transaction</p>
                <a
                  href={`https://amoy.polygonscan.com/tx/${cert.txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm font-mono text-emerald-500 hover:text-emerald-400 transition-colors truncate max-w-[200px]"
                >
                  {cert.txHash.substring(0, 10)}...{cert.txHash.substring(cert.txHash.length - 8)}
                  <ArrowUpRight size={14} strokeWidth={1.5} />
                </a>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-zinc-800">
              <Button variant="ghost" to="/dashboard" className="w-full sm:flex-1 text-zinc-300 hover:text-white">
                Dashboard
              </Button>
              <Button variant="primary" to="/issue" className="w-full sm:flex-1">
                Mint Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
