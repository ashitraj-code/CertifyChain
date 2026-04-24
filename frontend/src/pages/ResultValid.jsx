import { ArrowLeft, CheckCircle2, ExternalLink, Shield, Calendar, User, Award, Hash, Copy } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';

export default function ResultValid() {
  const cert = {
    id: 'CERT-2023-001',
    name: 'Eleanor Vance',
    course: 'Master of Science in Cryptography',
    date: 'October 24, 2023',
    issuer: 'Stanford University',
    txHash: '0x8fB3c9A7e2B4d1C5f6...4d2E1aB9f',
    blockNumber: 18234567,
  };

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-12">
      {/* Back link */}
      <Button variant="ghost" to="/verify" icon={ArrowLeft} className="mb-8">
        Back to Verification
      </Button>

      <div className="max-w-2xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-10 animate-fade-in">
          {/* Success Icon with pulse ring */}
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 bg-success/20 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
            <div className="relative w-20 h-20 bg-success rounded-full flex items-center justify-center animate-bounce-in">
              <CheckCircle2 size={36} className="text-white" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-on-surface mb-3 tracking-tight">
            Verified Certificate
          </h1>
          <p className="text-base text-on-surface-variant max-w-lg mx-auto">
            This document has been cryptographically validated and matches the immutable record on the CertiChain network.
          </p>
        </div>

        {/* Verification badge card */}
        <Card className="mb-6 border-success/30 bg-success/5 animate-fade-in stagger-1">
          <div className="flex items-center gap-3">
            <Shield size={20} className="text-success" />
            <div>
              <p className="text-sm font-bold text-success">Blockchain Verified</p>
              <p className="text-xs text-success/70">
                Cryptographic signature confirmed at block #{cert.blockNumber.toLocaleString()}
              </p>
            </div>
          </div>
        </Card>

        {/* Certificate Details */}
        <Card className="animate-fade-in stagger-2">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant mb-5">
            Certificate Details
          </h2>

          <div className="space-y-5">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 bg-primary-container/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <Hash size={16} className="text-primary-container" />
              </div>
              <div>
                <p className="text-xs text-on-surface-variant font-semibold uppercase tracking-wider">Certificate ID</p>
                <p className="text-sm font-bold text-on-surface font-mono">{cert.id}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 bg-primary-container/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <User size={16} className="text-primary-container" />
              </div>
              <div>
                <p className="text-xs text-on-surface-variant font-semibold uppercase tracking-wider">Recipient Name</p>
                <p className="text-sm font-bold text-on-surface">{cert.name}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 bg-primary-container/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <Award size={16} className="text-primary-container" />
              </div>
              <div>
                <p className="text-xs text-on-surface-variant font-semibold uppercase tracking-wider">Credential</p>
                <p className="text-sm font-bold text-on-surface">{cert.course}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 bg-primary-container/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <Calendar size={16} className="text-primary-container" />
              </div>
              <div>
                <p className="text-xs text-on-surface-variant font-semibold uppercase tracking-wider">Issue Date</p>
                <p className="text-sm font-bold text-on-surface">{cert.date}</p>
              </div>
            </div>

            <hr className="border-surface-container-high" />

            {/* Transaction Hash */}
            <div>
              <p className="text-xs text-on-surface-variant font-semibold uppercase tracking-wider mb-2">
                Transaction Hash
              </p>
              <div className="flex items-center gap-2 bg-surface-container-low rounded-lg px-4 py-3">
                <code className="text-xs font-mono text-primary-container flex-1 truncate">
                  {cert.txHash}
                </code>
                <button className="p-1.5 rounded-md hover:bg-surface-container-high text-outline hover:text-on-surface transition-colors cursor-pointer">
                  <Copy size={14} />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-surface-container-high">
            <Button variant="primary" className="w-full" icon={ExternalLink}>
              View on Blockchain
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
