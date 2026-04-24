export default function FormInput({
  label,
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  icon: Icon,
  required = false,
  className = '',
}) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-[11px] font-medium uppercase tracking-widest text-zinc-500 mb-2">
          {label} {required && <span className="text-zinc-300">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400">
            <Icon size={16} strokeWidth={1.5} />
          </div>
        )}
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full rounded-xl border border-zinc-200 bg-white/50 text-sm text-zinc-900 placeholder:text-zinc-400 transition-all duration-300 focus:bg-white focus:border-zinc-400 focus:ring-4 focus:ring-zinc-100 focus:outline-none ${
            Icon ? 'pl-10 pr-4 py-3' : 'px-4 py-3'
          }`}
        />
      </div>
    </div>
  );
}
