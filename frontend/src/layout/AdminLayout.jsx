import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Menu, Hexagon } from 'lucide-react';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans selection:bg-zinc-200 selection:text-zinc-900">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-white/80 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-500 ease-out md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content */}
      <div className="flex flex-col min-h-screen md:pl-64 transition-all duration-300">
        {/* Mobile Header */}
        <div className="md:hidden sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-zinc-200/50 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Hexagon size={20} strokeWidth={1.5} className="text-zinc-900" />
            <span className="font-medium text-zinc-900 tracking-wider uppercase text-sm">Pramanit</span>
          </div>
          <button 
            onClick={() => setSidebarOpen(true)}
            className="p-2 -mr-2 text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors cursor-pointer"
          >
            <Menu size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Page Content */}
        <main className="flex-1 w-full max-w-6xl mx-auto px-6 md:px-12 py-10 md:py-16 animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
