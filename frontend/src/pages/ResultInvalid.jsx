import { ArrowLeft, XCircle, AlertTriangle, MessageCircle, RefreshCw } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';

export default function ResultInvalid() {
  return (
    <div className="max-w-[1280px] mx-auto px-6 py-12">
      {/* Back link */}
      <Button variant="ghost" to="/verify" icon={ArrowLeft} className="mb-8">
        Back to Verification
      </Button>

      <div className="max-w-2xl mx-auto">
        {/* Error Header */}
        <div className="text-center mb-10 animate-fade-in">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 bg-error/20 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
            <div className="relative w-20 h-20 bg-error rounded-full flex items-center justify-center animate-bounce-in">
              <XCircle size={36} className="text-white" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-on-surface mb-3 tracking-tight">
            Verification Failed
          </h1>
          <p className="text-base text-on-surface-variant max-w-lg mx-auto">
            This certificate could not be found on the cryptographic ledger, or its digital signature has been tampered with.
          </p>
        </div>

        {/* Error Detail Card */}
        <Card className="mb-6 border-error/30 bg-error/5 animate-fade-in stagger-1">
          <div className="flex items-start gap-3">
            <AlertTriangle size={20} className="text-error flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-error mb-1">Certificate Not Found</p>
              <p className="text-xs text-error/70 leading-relaxed">
                The provided certificate ID does not correspond to any credential registered on the
                CertiChain blockchain network. This could mean the certificate was never issued through
                our platform, has been revoked, or the ID was entered incorrectly.
              </p>
            </div>
          </div>
        </Card>

        {/* Possible reasons */}
        <Card className="mb-6 animate-fade-in stagger-2">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant mb-4">
            Possible Reasons
          </h2>
          <ul className="space-y-3">
            {[
              'The certificate ID was entered incorrectly',
              'The certificate was issued outside the CertiChain network',
              'The credential has been permanently revoked by the issuing institution',
              'The digital signature has been tampered with or corrupted',
            ].map((reason, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-on-surface-variant">
                <span className="w-5 h-5 bg-surface-container-high rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] font-bold text-outline">
                  {idx + 1}
                </span>
                {reason}
              </li>
            ))}
          </ul>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 animate-fade-in stagger-3">
          <Button variant="primary" to="/verify" icon={RefreshCw} className="flex-1">
            Try Again
          </Button>
          <Button variant="secondary" to="/help" icon={MessageCircle} className="flex-1">
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
}
