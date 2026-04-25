import { useState, useEffect } from 'react';
import { Search, AlertTriangle, Ban, Clock, XCircle, Loader2 } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import API_BASE from '../config/api';

export default function Revocation() {
  const [searchId, setSearchId] = useState('');
  const [reason, setReason] = useState('');
  const [foundCert, setFoundCert] = useState(null);
  const [revokedCerts, setRevokedCerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [revoking, setRevoking] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Fetch revoked certificates on load
  useEffect(() => {
    const fetchRevoked = async () => {
      try {
        const response = await fetch(`${API_BASE}/certificates`);
        const data = await response.json();
        if (data.success) {
          setRevokedCerts(data.data.filter((c) => c.status === 'Revoked'));
        }
      } catch (err) {
        console.error('Failed to fetch revoked certs:', err);
      }
    };
    fetchRevoked();
  }, []);

  const handleSearch = async () => {
    if (!searchId.trim()) return;
    setError('');
    setFoundCert(null);

    try {
      const response = await fetch(`${API_BASE}/certificates`);
      const data = await response.json();

      if (data.success) {
        const cert = data.data.find((c) => String(c.tokenId) === searchId.trim());
        if (cert) {
          setFoundCert(cert);
        } else {
          setError('Certificate not found with that Token ID');
        }
      }
    } catch (err) {
      setError('Failed to search certificates');
    }
  };

  const handleRevoke = async () => {
    if (!foundCert || !reason) return;

    setRevoking(true);
    setError('');
    setMessage('');

    try {
      const response = await fetch(`${API_BASE}/certificate/revoke`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tokenId: foundCert.tokenId,
          reason,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage(`Certificate #${foundCert.tokenId} has been revoked successfully`);
        setRevokedCerts((prev) => [{ ...foundCert, status: 'Revoked', revokeReason: reason, revokedAt: new Date().toISOString() }, ...prev]);
        setFoundCert(null);
        setSearchId('');
        setReason('');
      } else {
        setError(data.error || 'Failed to revoke certificate');
      }
    } catch (err) {
      setError('Failed to connect to server');
    } finally {
      setRevoking(false);
    }
  };

  const formatTimeAgo = (dateStr) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHrs = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHrs / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHrs < 24) return `${diffHrs} hours ago`;
    if (diffDays < 30) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-on-surface tracking-tight">Revocation Management</h1>
        <p className="text-sm text-on-surface-variant mt-1">Invalidate certificates and manage revocation workflows.</p>
      </div>

      {message && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 text-sm text-emerald-700 mb-6 animate-fade-in">
          {message}
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700 mb-6 animate-fade-in">
          {error}
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-lg font-bold text-on-surface mb-5">Initiate Revocation</h2>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant block mb-1.5">Token ID</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
                  <input type="text" value={searchId} onChange={(e) => setSearchId(e.target.value)}
                    placeholder="e.g. 0, 1, 2..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-outline-variant bg-white text-sm focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 focus:outline-none transition-all" />
                </div>
                <Button variant="secondary" onClick={handleSearch}>Search</Button>
              </div>
            </div>

            {foundCert && (
              <div className="bg-surface-container-low rounded-xl p-4 border border-surface-container-high animate-fade-in">
                <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-semibold mb-1">Found Credential</p>
                <p className="text-sm font-bold text-on-surface">{foundCert.course}</p>
                <p className="text-xs text-on-surface-variant">{foundCert.studentName} • Token #{foundCert.tokenId}</p>
                {foundCert.status === 'Revoked' && (
                  <p className="text-xs text-red-500 mt-1 font-semibold">Already Revoked</p>
                )}
              </div>
            )}

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant block mb-1.5">Revocation Reason</label>
              <select value={reason} onChange={(e) => setReason(e.target.value)}
                className="w-full rounded-xl border border-outline-variant bg-white px-4 py-3 text-sm focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 focus:outline-none transition-all appearance-none cursor-pointer">
                <option value="">Select a reason...</option>
                <option value="Credential Expired">Credential Expired</option>
                <option value="Administrative Error">Administrative Error</option>
                <option value="Academic Misconduct">Academic Misconduct</option>
                <option value="Fraudulent Activity">Fraudulent Activity</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="bg-error/5 border border-error/20 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle size={18} className="text-error flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-error mb-1">Cryptographic Invalidation</p>
                  <p className="text-xs text-error/70 leading-relaxed">This action marks the certificate as permanently revoked. The certificate will fail all future verification checks.</p>
                </div>
              </div>
            </div>

            <Button
              variant="danger"
              icon={revoking ? Loader2 : Ban}
              className="w-full"
              disabled={!foundCert || !reason || foundCert.status === 'Revoked' || revoking}
              onClick={handleRevoke}
            >
              {revoking ? 'Revoking...' : 'Revoke Certificate'}
            </Button>
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-bold text-on-surface mb-5">Recently Revoked</h2>
          <div className="space-y-4">
            {revokedCerts.length === 0 ? (
              <p className="text-sm text-zinc-400 text-center py-4">No revoked certificates</p>
            ) : (
              revokedCerts.map((cert) => (
                <div key={cert._id} className="flex items-start gap-3 p-4 bg-surface-container-low rounded-xl border border-surface-container-high">
                  <div className="w-9 h-9 bg-error/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <XCircle size={16} className="text-error" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-on-surface">{cert.course}</p>
                    <p className="text-xs text-on-surface-variant">Reason: {cert.revokeReason || 'N/A'}</p>
                    <div className="flex items-center gap-1 mt-1 text-[10px] text-outline">
                      <Clock size={10} /> {formatTimeAgo(cert.revokedAt || cert.createdAt)}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
