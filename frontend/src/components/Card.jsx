export default function Card({ children, className = '', hover = false, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl border border-zinc-200/80 p-6 sm:p-8
        ${hover ? 'hover:border-zinc-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-0.5 transition-all duration-500 cursor-pointer' : ''}
        ${className}`}
    >
      {children}
    </div>
  );
}
