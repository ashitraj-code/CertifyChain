import { Hexagon, ScanLine, ArrowRight } from 'lucide-react';
import Button from '../components/Button';

export default function Home() {
  return (
    <div className="flex flex-col relative">
      {/* Enhanced Ethereal Glows - Removes stark whiteness */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-400/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute top-40 left-0 w-[500px] h-[500px] bg-sky-400/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

      {/* Minimal Hero */}
      <section className=" pb-32  md:pb-40">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-200/50 bg-indigo-50 mb-8 animate-fade-in shadow-sm shadow-indigo-500/5">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
            <span className="text-[11px] font-medium uppercase tracking-widest text-indigo-700">Institutional Grade Verification</span>
          </div>

          <h1 className="text-5xl md:text-8xl font-light text-zinc-900 tracking-tight leading-[1.1] mb-8 animate-fade-in stagger-1">
            Trust,<br />
            <span className="font-medium text-zinc-400">cryptographically</span><br />
            secured.
          </h1>

          <p className="text-lg md:text-xl text-zinc-500 font-light leading-relaxed max-w-xl mb-12 animate-fade-in stagger-2">
            A minimalist protocol for issuing and verifying academic and professional credentials on the blockchain. No fluff, just mathematical certainty.
          </p>

          <div className="flex items-center gap-6 animate-fade-in stagger-3">
            <Button variant="primary" size="lg" to="/verify" icon={ScanLine}>
              Verify Document
            </Button>
            <Button variant="ghost" size="lg" to="/dashboard" icon={ArrowRight}>
              Admin Portal
            </Button>
          </div>
        </div>
      </section>

      {/* High Contrast Dark Section - Breaks up the white */}
      <section className="py-24 bg-zinc-950 rounded-[2.5rem] relative overflow-hidden shadow-2xl shadow-zinc-900/20">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-500/10 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16 px-12 md:px-20 relative z-10">
          {[
            { v: '12.4k', l: 'Certificates', c: 'text-indigo-400' },
            { v: '48', l: 'Institutions', c: 'text-sky-400' },
            { v: '0ms', l: 'Latency', c: 'text-emerald-400' },
            { v: '100%', l: 'Immutable', c: 'text-purple-400' },
          ].map((stat, idx) => (
            <div key={idx} className="flex flex-col gap-2 border-l border-zinc-800 pl-6">
              <span className={`text-4xl md:text-5xl font-light tracking-tight ${stat.c}`}>{stat.v}</span>
              <span className="text-[10px] font-medium uppercase tracking-widest text-zinc-500">{stat.l}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-zinc-200 to-transparent my-20" />

      {/* Concept Section */}
      <section className="pb-24 grid md:grid-cols-2 gap-16 items-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-400/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
        
        <div>
          <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-8">
            <Hexagon size={24} strokeWidth={1.5} className="text-indigo-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-light text-zinc-900 tracking-tight mb-6">
            The end of credential fraud.
          </h2>
          <p className="text-zinc-500 font-light leading-relaxed mb-6 text-lg">
            By anchoring certificates to decentralized ledgers, we eliminate the need for manual verification processes, phone calls, and transcript requests. 
          </p>
          <p className="text-zinc-500 font-light leading-relaxed text-lg">
            The cryptographic hash serves as an eternal source of truth that anyone can verify instantly.
          </p>
        </div>
        
        <div className="bg-white/80 backdrop-blur-xl border border-zinc-200/60 rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-100/50 rounded-full blur-3xl" />
          <div className="flex flex-col gap-4 relative z-10">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-white bg-white/60 shadow-sm backdrop-blur-md">
                <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
                  <span className="text-xs font-medium text-indigo-600">{i}</span>
                </div>
                <div className="flex-1">
                  <div className="h-2 bg-zinc-200 rounded-full w-24 mb-2" />
                  <div className="h-2 bg-zinc-100 rounded-full w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
