import { CheckCircle2, Copy, ArrowRight, User, Award, Calendar, Hash, QrCode, ExternalLink } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import StatusBadge from '../components/StatusBadge';

export default function Success() {
  const cert = {
    id: 'CERT-2024-009',
    name: 'Eleanor Vance',
    course: 'Master of Science in Cryptography',
    date: 'October 24, 2023',
    txHash: '0x8fB3c9A...4d2E1aB9f',
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-160px)] py-8">
      <div className="max-w-2xl w-full mx-auto">
        <Card className="rounded-3xl border-slate-200 overflow-hidden relative shadow-2xl shadow-blue-500/10">
          {/* Confetti Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-blue-50 opacity-50" />
          
          <div className="relative p-8 md:p-12">
            {/* Success Animation */}
            <div className="text-center mb-10 animate-fade-in">
              <div className="relative w-28 h-28 mx-auto mb-8">
                <div className="absolute inset-0 bg-emerald-400 rounded-full blur-xl opacity-40 animate-pulse" />
                <div className="relative w-full h-full bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30 animate-bounce-in">
                  <CheckCircle2 size={56} className="text-white" />
                </div>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
                Certificate Minted!
              </h1>
              <p className="text-lg text-slate-600">
                The credential has been securely anchored to the blockchain.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                {/* Certificate ID */}
                <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100 flex items-center justify-between group animate-fade-in stagger-1">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-1">
                      Certificate ID
                    </p>
                    <p className="text-xl font-bold font-mono text-slate-900">{cert.id}</p>
                  </div>
                  <button className="p-3 rounded-xl bg-white border border-blue-200 text-blue-600 shadow-sm hover:shadow-md hover:scale-105 transition-all cursor-pointer">
                    <Copy size={20} />
                  </button>
                </div>

                {/* Issuance Details */}
                <div className="space-y-5 animate-fade-in stagger-2 bg-slate-50 rounded-2xl p-6 border border-slate-200">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm border border-slate-200 shrink-0">
                      <User size={18} className="text-slate-500" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Recipient Name</p>
                      <p className="text-base font-bold text-slate-900">{cert.name}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm border border-slate-200 shrink-0">
                      <Award size={18} className="text-slate-500" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Credential</p>
                      <p className="text-base font-bold text-slate-900">{cert.course}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm border border-slate-200 shrink-0">
                      <Hash size={18} className="text-slate-500" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Transaction</p>
                      <div className="flex items-center gap-2 mt-1">
                        <code className="text-sm font-mono text-blue-600">{cert.txHash}</code>
                        <ExternalLink size={14} className="text-slate-400 hover:text-blue-600 cursor-pointer" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* QR Code */}
              <div className="flex flex-col items-center justify-center bg-slate-50 rounded-2xl p-8 border border-slate-200 animate-fade-in stagger-3">
                <div className="w-40 h-40 bg-white rounded-2xl shadow-sm border-2 border-slate-200 flex items-center justify-center mb-6 relative overflow-hidden">
                  <QrCode size={80} className="text-slate-800 relative z-10" />
                  <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] animate-shimmer" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">Scan to Verify</h3>
                <p className="text-sm text-slate-500 text-center">
                  Share this QR code with employers for instant verification.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mt-10 pt-8 border-t border-slate-200 animate-fade-in stagger-4">
              <Button variant="secondary" to="/dashboard" className="flex-1 h-14 text-base font-bold">
                Back to Dashboard
              </Button>
              <Button variant="primary" to="/issue" icon={ArrowRight} className="flex-1 h-14 text-base font-bold">
                Mint Another
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
