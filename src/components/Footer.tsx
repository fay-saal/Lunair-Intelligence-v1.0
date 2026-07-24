import { useState } from 'react';
import { ArrowRight, CheckCircle2, Shield, Smartphone, Cpu } from 'lucide-react';

interface FooterProps {
  onOpenDesignSystem: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDesignSystem }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-black border-t border-zinc-900 pt-20 pb-12 font-mono-tech relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-zinc-900">
          
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/images/logo/logo.png"
                alt="LUNAIR"
                className="h-8 w-auto object-contain mix-blend-screen"
              />
            </div>

            <p className="text-xs text-zinc-400 font-sans font-light leading-relaxed max-w-sm">
              All-in-one micro AI utility toolkit for single-input single-output precision processing. Digital artifacts & Studio apparel.
            </p>

            <div className="pt-2 flex items-center gap-3 text-[11px] text-zinc-500">
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-zinc-400" />
                <span>Zero Retention</span>
              </span>
              <span>•</span>
              <span>100% Encryption</span>
            </div>
          </div>

          {/* Links 1 */}
          <div className="md:col-span-2 space-y-3 text-xs">
            <span className="text-zinc-500 text-[10px] uppercase tracking-widest block font-bold">
              MICRO UTILITIES
            </span>
            <ul className="space-y-2 text-zinc-400">
              <li><a href="#tools-section" className="hover:text-white transition-colors">Receipt OCR</a></li>
              <li><a href="#tools-section" className="hover:text-white transition-colors">Handwriting OCR</a></li>
              <li><a href="#tools-section" className="hover:text-white transition-colors">YouTube Transcriber</a></li>
              <li><a href="#tools-section" className="hover:text-white transition-colors">Invoice Extractor</a></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div className="md:col-span-2 space-y-3 text-xs">
            <span className="text-zinc-500 text-[10px] uppercase tracking-widest block font-bold">
              ARCHITECTURE & BRAND
            </span>
            <ul className="space-y-2 text-zinc-400">
              <li><a href="#how-it-works" className="hover:text-white transition-colors">Pipeline Spec</a></li>
              <li><a href="#studio-vision" className="hover:text-white transition-colors">Studio & Apparel</a></li>
              <li>
                <button onClick={onOpenDesignSystem} className="hover:text-white transition-colors text-left flex items-center gap-1 cursor-pointer">
                  <Cpu className="w-3 h-3 text-zinc-500" />
                  <span>Design Tokens</span>
                </button>
              </li>
              <li>
                <span className="text-zinc-600 cursor-not-allowed flex items-center gap-1">
                  <Smartphone className="w-3 h-3" />
                  <span>Mobile App (Q4)</span>
                </span>
              </li>
            </ul>
          </div>

          {/* Waitlist Form */}
          <div id="waitlist" className="md:col-span-4 space-y-3">
            <span className="text-zinc-500 text-[10px] uppercase tracking-widest block font-bold">
              GET NEW UTILITIES IN YOUR INBOX
            </span>
            <p className="text-xs text-zinc-400 font-sans font-light">
              Subscribe to get notified as we publish new single-task AI tools each week.
            </p>

            {subscribed ? (
              <div className="p-3 bg-zinc-950 border border-emerald-900 text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Subscribed! You will receive new utility updates.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-zinc-950 border border-zinc-800 px-3 py-2 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 flex-1"
                />
                <button
                  type="submit"
                  className="btn-primary px-4 py-2 text-xs uppercase flex items-center gap-1 whitespace-nowrap font-bold cursor-pointer"
                >
                  <span>JOIN</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-600">
          <div>
            © {new Date().getFullYear()} LUNAIR TECHNOLOGIES & STUDIO. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center gap-6 text-[11px]">
            <a href="#" className="hover:text-zinc-400">PRIVACY POLICY</a>
            <a href="#" className="hover:text-zinc-400">TERMS OF SERVICE</a>
            <a href="#" className="hover:text-zinc-400">SYSTEM STATUS</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
