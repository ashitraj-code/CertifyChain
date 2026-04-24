import { CheckCircle2, XCircle, Clock, AlertTriangle, Info, ShieldAlert } from 'lucide-react';

const variants = {
  Active: { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-200', icon: CheckCircle2 },
  Verified: { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-200', icon: CheckCircle2 },
  Minted: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200', icon: CheckCircle2 },
  Confirmed: { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-200', icon: CheckCircle2 },
  Revoked: { bg: 'bg-rose-100', text: 'text-rose-700', border: 'border-rose-200', icon: XCircle },
  Pending: { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200', icon: Clock },
  MINT: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200', icon: CheckCircle2 },
  VERIFY: { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-200', icon: CheckCircle2 },
  REVOKE: { bg: 'bg-rose-100', text: 'text-rose-700', border: 'border-rose-200', icon: XCircle },
  INFO: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200', icon: Info },
  WARNING: { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200', icon: AlertTriangle },
  CRITICAL: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200', icon: ShieldAlert },
};

export default function StatusBadge({ status }) {
  const variant = variants[status] || variants.INFO;
  const IconComp = variant.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${variant.bg} ${variant.text} ${variant.border} shadow-sm`}>
      <IconComp size={14} />
      {status}
    </span>
  );
}
