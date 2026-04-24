import { Shield, ScanLine, Award, ArrowRight, Lock, Globe, Zap, CheckCircle2 } from 'lucide-react';
import Button from '../components/Button';

const features = [
  {
    icon: Lock,
    title: 'Cryptographic Proof',
    desc: 'Every certificate is anchored to an immutable blockchain ledger using cryptographic hashing.',
  },
  {
    icon: Globe,
    title: 'Global Verification',
    desc: 'Verify any credential from anywhere in the world with instant on-chain lookups.',
  },
  {
    icon: Zap,
    title: 'Instant Issuance',
    desc: 'Mint certificates in seconds with our streamlined institutional portal.',
  },
];

const stats = [
  { value: '12,450+', label: 'Certificates Issued' },
  { value: '48', label: 'Active Courses' },
  { value: '99.9%', label: 'Uptime Guarantee' },
  { value: '3,210', label: 'Monthly Verifications' },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-24 md:gap-32">
      {/* Hero Section */}
      <section className="relative pt-12 md:pt-20">
        {/* Background Gradients */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-400/10 rounded-full blur-3xl" />
        </div>

        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-blue-600 text-xs font-bold tracking-wide mb-8 animate-fade-in">
            <CheckCircle2 size={16} />
            Trusted by 200+ Institutions Worldwide
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6 animate-fade-in stagger-1">
            Secure Certificate{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Verification
            </span>{' '}
            on Blockchain
          </h1>

          <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed mb-10 max-w-2xl mx-auto animate-fade-in stagger-2">
            Issue and verify certificates instantly and securely. Our cryptographic transparency ensures high-stakes verification environments remain reliable and immutable.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in stagger-3">
            <Button variant="primary" size="lg" to="/verify" icon={ScanLine} className="w-full sm:w-auto">
              Verify Certificate
            </Button>
            <Button variant="secondary" size="lg" to="/issue" icon={Award} className="w-full sm:w-auto">
              Issue Certificate
            </Button>
          </div>
        </div>

        {/* Hero Visual Node Graph */}
        <div className="mt-20 relative max-w-4xl mx-auto animate-fade-in stagger-4">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-slate-200/60 p-6 md:p-8 shadow-2xl shadow-slate-200/50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((block) => (
                <div key={block} className="bg-slate-50 rounded-2xl p-5 border border-slate-200 shadow-sm relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/5 to-blue-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      Block #{18236670 + block}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-slate-600 mb-2 truncate">
                    0x{Math.random().toString(16).slice(2, 14)}...
                  </p>
                  <div className="flex items-center gap-1.5 text-[10px] text-green-600 font-bold uppercase tracking-wider">
                    <CheckCircle2 size={12} />
                    Confirmed
                  </div>
                </div>
              ))}
            </div>
            {/* Chain connectors */}
            <div className="hidden md:flex absolute top-1/2 left-0 w-full -translate-y-1/2 items-center justify-evenly pointer-events-none px-20">
               <ArrowRight className="text-slate-300" />
               <ArrowRight className="text-slate-300" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-slate-900 rounded-3xl p-8 md:p-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 relative z-10">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <p className="text-3xl md:text-5xl font-extrabold text-white mb-2">
                {stat.value}
              </p>
              <p className="text-xs md:text-sm font-semibold uppercase tracking-widest text-slate-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Institutional-Grade Security
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-16">
          Built for universities, certification bodies, and enterprise HR departments who demand cryptographic verification.
        </p>

        <div className="grid md:grid-cols-3 gap-8 text-left">
          {features.map((feature, idx) => {
            const IconComp = feature.icon;
            return (
              <div key={idx} className="bg-white rounded-3xl border border-slate-200 p-8 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                  <IconComp size={28} className="text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-3xl p-10 md:p-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Ready to get started?
        </h2>
        <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto">
          Join hundreds of institutions already using CertiChain for tamper-proof credential management.
        </p>
        <Button variant="primary" size="lg" to="/dashboard" icon={ArrowRight}>
          Access Admin Portal
        </Button>
      </section>
    </div>
  );
}
