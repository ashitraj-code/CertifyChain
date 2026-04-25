import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Database,
  ShieldCheck,
  Award,
  ScrollText,
  Ban,
  HelpCircle,
  LogOut,
  Hexagon,
  X
} from 'lucide-react';

const menuItems = [
  { to: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { to: '/registry', label: 'Certificates', icon: ShieldCheck },
  { to: '/issue', label: 'Issue Credential', icon: Award },
  { to: '/explorer', label: 'Blockchain', icon: Database },
  { to: '/logs', label: 'Audit Logs', icon: ScrollText },
  { to: '/revoke', label: 'Revocation', icon: Ban },
];

export default function Sidebar({ onClose }) {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <aside className="h-full bg-zinc-50 border-r border-zinc-200/60 flex flex-col">
      {/* Brand */}
      <div className="h-20 flex items-center justify-between px-8 shrink-0">
        <Link to="/dashboard" className="flex items-center gap-2.5 group" onClick={onClose}>
          <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center group-hover:bg-indigo-100 transition-colors duration-300">
            <Hexagon size={18} strokeWidth={2} className="text-indigo-600 group-hover:rotate-12 transition-transform duration-500" />
          </div>
          <span className="text-sm font-medium text-zinc-900 tracking-wider uppercase">
            Pramanit
          </span>
        </Link>
        <button className="md:hidden p-1 text-zinc-400 hover:text-zinc-900 cursor-pointer" onClick={onClose}>
          <X size={20} strokeWidth={1.5} />
        </button>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 px-4 py-8 flex flex-col gap-1 overflow-y-auto">
        <p className="px-4 text-[10px] font-medium text-zinc-400 uppercase tracking-widest mb-4">Menu</p>
        {menuItems.map((item) => {
          const IconComp = item.icon;
          const active = isActive(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all duration-300
                ${active 
                  ? 'bg-white text-indigo-700 font-medium shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-indigo-100/50' 
                  : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100/50 border border-transparent'
                }`}
            >
              <IconComp size={16} strokeWidth={1.5} className={active ? 'text-indigo-600' : 'text-zinc-400'} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Nav */}
      <div className="p-4 shrink-0 flex flex-col gap-1">
        <div className="h-px bg-zinc-200/60 mx-4 mb-4" />
        <Link
          to="/help"
          onClick={onClose}
          className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100/50 transition-all duration-300"
        >
          <HelpCircle size={16} strokeWidth={1.5} />
          Support
        </Link>
        <Link
          to="/"
          onClick={onClose}
          className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100/50 transition-all duration-300"
        >
          <LogOut size={16} strokeWidth={1.5} />
          Exit Platform
        </Link>
        
        {/* User profile snippet */}
        <div className="mt-6 flex items-center gap-3 px-4 pb-2">
          <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
            <span className="text-[10px] font-bold text-indigo-600">AD</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-medium text-zinc-900 truncate">Admin User</span>
            <span className="text-[10px] text-zinc-500 truncate">admin@institution.edu</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
