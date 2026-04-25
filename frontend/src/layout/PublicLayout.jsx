import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col font-sans selection:bg-zinc-200 selection:text-zinc-900">
      <Navbar />
      
      <main className="flex-1 flex flex-col pt-20">
        <div className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-24 animate-fade-in">
          <Outlet />
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="bg-[#fafafa] border-t border-zinc-200/50 mt-auto">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-zinc-900" />
              <span className="text-sm font-medium text-zinc-900 tracking-wide">Pramanit</span>
            </div>
            
            <div className="flex items-center gap-8">
              <a href="#" className="text-xs text-zinc-500 hover:text-zinc-900 transition-colors uppercase tracking-widest">
                Privacy
              </a>
              <a href="#" className="text-xs text-zinc-500 hover:text-zinc-900 transition-colors uppercase tracking-widest">
                Terms
              </a>
              <a href="#" className="text-xs text-zinc-500 hover:text-zinc-900 transition-colors uppercase tracking-widest">
                API
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
