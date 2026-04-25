import { Link, useLocation } from 'react-router-dom';
import { Hexagon, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import Button from '../components/Button';

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/verify', label: 'Verify' },
    { to: '/registry', label: 'Registry' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-md border-b border-zinc-200/50 shadow-sm shadow-zinc-900/5' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center group-hover:bg-indigo-100 transition-colors duration-300">
              <Hexagon size={18} strokeWidth={2} className="text-indigo-600 group-hover:rotate-12 transition-transform duration-500" />
            </div>
            <span className="text-lg font-medium text-zinc-900 tracking-tight">
              BlockCert
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-sm tracking-wide transition-colors duration-300
                    ${isActive(link.to)
                      ? 'text-indigo-600 font-medium'
                      : 'text-zinc-500 hover:text-zinc-900'
                    }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            
            <div className="h-4 w-px bg-zinc-200" />

            <div className="flex items-center gap-4">
              <Link to="/help" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors tracking-wide">
                Docs
              </Link>
              <Button variant="primary" to="/dashboard">
                Admin Portal
              </Button>
            </div>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 -mr-2 text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors cursor-pointer"
          >
            {mobileOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-zinc-200 shadow-xl animate-fade-in">
          <div className="px-6 py-8 flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`text-lg tracking-wide transition-colors
                  ${isActive(link.to)
                    ? 'text-indigo-600 font-medium'
                    : 'text-zinc-500'
                  }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/help"
              onClick={() => setMobileOpen(false)}
              className="text-lg text-zinc-500 tracking-wide"
            >
              Docs
            </Link>
            <div className="pt-4 mt-2 border-t border-zinc-100">
              <Button variant="primary" className="w-full" to="/dashboard">
                Admin Portal
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
