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
  Shield,
  X
} from 'lucide-react';

const menuItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/explorer', label: 'Explorer', icon: Database },
  { to: '/registry', label: 'Certificates', icon: ShieldCheck },
  { to: '/issue', label: 'Issue Credential', icon: Award },
  { to: '/logs', label: 'Audit Logs', icon: ScrollText },
  { to: '/revoke', label: 'Revocation', icon: Ban },
];

const bottomItems = [
  { to: '/help', label: 'Help Center', icon: HelpCircle },
  { to: '/', label: 'Back to Home', icon: LogOut },
];

export default function Sidebar({ onClose }) {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <aside className="h-full bg-slate-900 flex flex-col shadow-2xl shadow-slate-900/50">
      {/* Brand */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-white/10 shrink-0">
        <Link to="/dashboard" className="flex items-center gap-3" onClick={onClose}>
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Shield size={16} className="text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-white tracking-wide">CertiChain</span>
            <span className="text-[10px] text-slate-400 font-mono tracking-wider">PORTAL</span>
          </div>
        </Link>
        <button className="md:hidden p-1 text-slate-400 hover:text-white" onClick={onClose}>
          <X size={20} />
        </button>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 px-4 py-6 flex flex-col gap-1 overflow-y-auto custom-scrollbar">
        <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Platform</p>
        {menuItems.map((item) => {
          const IconComp = item.icon;
          const active = isActive(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300
                ${active 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                }`}
            >
              <IconComp size={18} className={active ? 'text-white' : 'text-slate-400'} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Nav */}
      <div className="p-4 border-t border-white/10 bg-slate-900 shrink-0 flex flex-col gap-1">
        {bottomItems.map((item) => {
          const IconComp = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-slate-200 transition-all duration-300"
            >
              <IconComp size={18} className="text-slate-400" />
              {item.label}
            </Link>
          );
        })}
        
        {/* User profile snippet */}
        <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-3 px-2">
          <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
            <span className="text-xs font-bold text-slate-300">AD</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-medium text-white truncate">Admin User</span>
            <span className="text-xs text-slate-500 truncate">admin@certichain.io</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
