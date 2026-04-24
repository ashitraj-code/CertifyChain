export default function Card({ children, className = '', hover = false, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6
        ${hover ? 'hover:shadow-md hover:border-blue-200 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer' : ''}
        ${className}`}
    >
      {children}
    </div>
  );
}
