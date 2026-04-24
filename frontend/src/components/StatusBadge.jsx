const variants = {
  Active: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700' },
  Verified: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700' },
  Minted: { bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-700' },
  Confirmed: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700' },
  Revoked: { bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-700' },
  Pending: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700' },
  INFO: { bg: 'bg-zinc-50', border: 'border-zinc-200', text: 'text-zinc-600' },
};

export default function StatusBadge({ status }) {
  const variant = variants[status] || variants.INFO;

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-md border ${variant.bg} ${variant.border}`}>
      <span className={`text-[10px] font-bold uppercase tracking-widest ${variant.text}`}>
        {status}
      </span>
    </span>
  );
}
