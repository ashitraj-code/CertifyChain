import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, QrCode, ArrowRight, Loader2 } from 'lucide-react';
import Button from '../components/Button';
import API_BASE from '../config/api';
import { parseTokenId } from '../utils/formatters';

export default function Verify() {
  const [certId, setCertId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!certId.trim()) return;

    setLoading(true);
    setError('');
    
    // Parse the token ID (e.g., CRT-0001 -> 1)
    const rawTokenId = parseTokenId(certId);

    try {
      const response = await fetch(`${API_BASE}/verify/${rawTokenId}`);
      const result = await response.json();

      if (result.success && result.status === 'VALID') {
        navigate('/result-valid', { state: { certificate: result.data, status: result.status } });
      } else {
        navigate('/result-invalid', {
          state: {
            error: result.error || 'Certificate verification failed',
            status: result.status,
            tokenId: certId,
          },
        });
      }
    } catch (err) {
      navigate('/result-invalid', {
        state: {
          error: 'Could not connect to the verification server',
          status: 'ERROR',
          tokenId: certId,
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pt-12 md:pt-24 relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-400/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute top-40 left-0 w-[400px] h-[400px] bg-indigo-400/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
      
      <div className="grid md:grid-cols-2 gap-16 items-center">
        {/* Left Side: Text & Input */}
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-light text-zinc-900 mb-6 tracking-tight">
            Verify Document
          </h1>
          <p className="text-lg text-zinc-500 font-light leading-relaxed mb-12">
            Enter a Token ID to verify the certificate authenticity against the blockchain ledger.
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700 mb-6 animate-fade-in">
              {error}
            </div>
          )}

          <form onSubmit={handleVerify} className="space-y-8 animate-fade-in stagger-1">
            <div className="relative group">
              <Search size={20} strokeWidth={1.5} className="absolute left-0 top-1/2 -translate-y-1/2 text-zinc-300 group-focus-within:text-indigo-600 transition-colors" />
              <input
                type="text"
                value={certId}
                onChange={(e) => setCertId(e.target.value)}
                placeholder="Token ID (e.g. CRT-0001 or 1)"
                className="w-full pl-10 pr-4 py-4 bg-transparent border-b border-zinc-200 text-xl font-light text-zinc-900 placeholder:text-zinc-300 focus:border-indigo-600 focus:outline-none transition-all"
              />
            </div>
            <Button type="submit" variant="primary" size="lg" icon={loading ? Loader2 : ArrowRight} disabled={loading}>
              {loading ? 'Verifying...' : 'Run Verification'}
            </Button>
          </form>
        </div>

        {/* Right Side: High Contrast Dark Scanner Block */}
        <div className="animate-fade-in stagger-2">
          <div className="bg-zinc-950 rounded-[2rem] p-12 text-center border border-zinc-800 shadow-2xl shadow-zinc-900/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-[60px] pointer-events-none" />
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-32 h-32 rounded-3xl border border-zinc-800 bg-zinc-900/50 flex items-center justify-center mb-8 group-hover:border-indigo-500/50 group-hover:bg-indigo-500/10 transition-all duration-500">
                <QrCode size={48} strokeWidth={1} className="text-indigo-400" />
              </div>
              <h3 className="text-xl font-light text-white tracking-tight mb-2">Scan Code</h3>
              <p className="text-sm text-zinc-500 font-light max-w-xs mx-auto">
                Use your device camera to scan the QR code printed on the physical credential.
              </p>
              
              <button className="mt-8 px-6 py-2.5 rounded-full border border-zinc-800 text-zinc-400 text-xs font-bold uppercase tracking-widest hover:text-white hover:border-zinc-700 transition-colors">
                Open Camera
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
