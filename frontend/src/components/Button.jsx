import { Link } from 'react-router-dom';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  className = '',
  to,
  onClick,
  type = 'button',
  disabled = false,
}) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer tracking-wide';
  
  const variants = {
    primary: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-500/20 border border-transparent focus:ring-indigo-600',
    secondary: 'bg-white text-zinc-700 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 border border-zinc-200 shadow-[0_1px_2px_rgba(0,0,0,0.02)] focus:ring-indigo-200',
    danger: 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-100 focus:ring-red-500',
    ghost: 'bg-transparent text-zinc-500 hover:text-indigo-600 hover:bg-indigo-50 focus:ring-indigo-200',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3.5 text-sm md:text-base',
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes}>
        {Icon && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} strokeWidth={1.5} />}
        <span>{children}</span>
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled}>
      {Icon && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} strokeWidth={1.5} />}
      <span>{children}</span>
    </button>
  );
}
