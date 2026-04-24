import { useState } from 'react';
import { Search, AlertTriangle, Ban, Clock, XCircle } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import { certificates, revokedCertificates } from '../data/certificates';

export default function Revocation() {
  const [searchId, setSearchId] = useState('');
  const [reason, setReason] = useState('');
  const [foundCert, setFoundCert] = useState(null);

  const handleSearch = () => {
    const cert = certificates.find((c) => c.id.toLowerCase() === searchId.toLowerCase());
    setFoundCert(cert || null);
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-on-surface tracking-tight">Revocation Management</h1>
        <p className="text-sm text-on-surface-variant mt-1">Invalidate certificates and manage revocation workflows.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-lg font-bold text-on-surface mb-5">Initiate Revocation</h2>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant block mb-1.5">Certificate ID</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
                  <input type="text" value={searchId} onChange={(e) => setSearchId(e.target.value)}
                    placeholder="CERT-2023-002"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-outline-variant bg-white text-sm focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 focus:outline-none transition-all" />
                </div>
                <Button variant="secondary" onClick={handleSearch}>Search</Button>
              </div>
            </div>

            {foundCert && (
              <div className="bg-surface-container-low rounded-xl p-4 border border-surface-container-high animate-fade-in">
                <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-semibold mb-1">Found Credential</p>
                <p className="text-sm font-bold text-on-surface">{foundCert.course}</p>
                <p className="text-xs text-on-surface-variant">{foundCert.name} • {foundCert.date}</p>
              </div>
            )}

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant block mb-1.5">Revocation Reason</label>
              <select value={reason} onChange={(e) => setReason(e.target.value)}
                className="w-full rounded-xl border border-outline-variant bg-white px-4 py-3 text-sm focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 focus:outline-none transition-all appearance-none cursor-pointer">
                <option value="">Select a reason...</option>
                <option value="expired">Credential Expired</option>
                <option value="error">Administrative Error</option>
                <option value="misconduct">Academic Misconduct</option>
                <option value="fraud">Fraudulent Activity</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="bg-error/5 border border-error/20 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle size={18} className="text-error flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-error mb-1">Cryptographic Invalidation</p>
                  <p className="text-xs text-error/70 leading-relaxed">This action writes a permanent revocation status to the blockchain. Once requested and approved, the certificate will fail all future verification checks globally.</p>
                </div>
              </div>
            </div>

            <Button variant="danger" icon={Ban} className="w-full" disabled={!foundCert || !reason}>
              Revoke Certificate
            </Button>
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-bold text-on-surface mb-5">Recently Revoked</h2>
          <div className="space-y-4">
            {revokedCertificates.map((cert) => (
              <div key={cert.id} className="flex items-start gap-3 p-4 bg-surface-container-low rounded-xl border border-surface-container-high">
                <div className="w-9 h-9 bg-error/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <XCircle size={16} className="text-error" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-on-surface">{cert.course}</p>
                  <p className="text-xs text-on-surface-variant">Reason: {cert.reason}</p>
                  <div className="flex items-center gap-1 mt-1 text-[10px] text-outline">
                    <Clock size={10} /> {cert.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
