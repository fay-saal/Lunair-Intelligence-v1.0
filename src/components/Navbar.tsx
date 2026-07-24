import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Cpu } from 'lucide-react';

interface NavbarProps {
  onOpenDesignSystem: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDesignSystem }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 rounded-full transition-all duration-300 backdrop-blur-md bg-black/60 border border-[#222222] ${
        scrolled ? 'shadow-[0_10px_40px_rgba(0,0,0,0.5)] py-3' : 'py-3.5'
      }`}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Official Logo & Status Dot */}
          <a href="#" className="flex items-center gap-3 group">
            {!imageError ? (
              <img
                src="/images/logo/logo.png"
                alt="LUNAIR"
                className="h-8 w-8 sm:h-9 sm:w-9 rounded-full object-cover group-hover:opacity-80 transition-opacity ring-1 ring-[#333]"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-zinc-950 border border-zinc-800 rounded-full flex items-center justify-center group-hover:border-white transition-colors">
                  <span className="font-mono-tech text-white text-xs font-bold tracking-tighter">LN</span>
                </div>
                <span className="font-mono-tech font-bold text-lg tracking-[0.2em] text-white uppercase">
                  LUNAIR
                </span>
              </div>
            )}

            <div className="hidden lg:flex items-center gap-2 border-l border-[#333] pl-3 py-1 ml-1 cursor-help group/tooltip relative">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-glow shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
              <span className="text-[9px] font-mono-tech tracking-widest text-zinc-500 uppercase group-hover/tooltip:text-zinc-300 transition-colors">
                All Systems Operational
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 font-mono-tech text-xs tracking-widest text-zinc-400">
            <a href="#tools-section" className="hover:text-white transition-colors">
              // 01. UTILITIES
            </a>
            <a href="#how-it-works" className="hover:text-white transition-colors">
              // 02. PIPELINE
            </a>
            <a href="#studio-vision" className="hover:text-white transition-colors">
              // 03. STUDIO
            </a>
            <button
              onClick={onOpenDesignSystem}
              className="flex items-center gap-1.5 hover:text-white transition-colors text-zinc-400 cursor-pointer"
            >
              <Cpu className="w-3.5 h-3.5 text-zinc-500" />
              SYSTEM TOKENS
            </button>
          </nav>

          {/* Action CTA */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href="#tools-section"
              className="tactile-btn bg-white text-black text-[11px] font-mono-tech font-bold tracking-widest uppercase px-5 py-2.5 rounded-full flex items-center gap-2 hover:bg-zinc-200"
            >
              <span>LAUNCH APP</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-400 hover:text-white border border-zinc-800 bg-zinc-950 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-zinc-950 border-b border-zinc-800 px-4 pt-4 pb-6 space-y-4 font-mono-tech text-xs tracking-widest text-zinc-300">
          <a
            href="#tools-section"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 hover:text-white border-b border-zinc-900"
          >
            // 01. UTILITIES
          </a>
          <a
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 hover:text-white border-b border-zinc-900"
          >
            // 02. PIPELINE
          </a>
          <a
            href="#studio-vision"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 hover:text-white border-b border-zinc-900"
          >
            // 03. STUDIO
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenDesignSystem();
            }}
            className="w-full text-left py-2 hover:text-white flex items-center justify-between text-zinc-400 cursor-pointer"
          >
            <span>// 04. DESIGN SYSTEM TOKENS</span>
            <Cpu className="w-4 h-4" />
          </button>
          <div className="pt-2">
            <a
              href="#tools-section"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-primary w-full text-center block py-2.5 text-xs font-mono-tech tracking-widest uppercase cursor-pointer"
            >
              BROWSE TOOLS
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
