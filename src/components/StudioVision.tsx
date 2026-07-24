import { ArrowUpRight, Disc } from 'lucide-react';

export const StudioVision: React.FC = () => {
  return (
    <section id="studio-vision" className="py-24 bg-black relative overflow-hidden border-t border-b border-zinc-900">
      
      {/* Subtle Background Glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-white/[0.015] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Brand Vision & Apparel Teaser */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-950 border border-zinc-800 font-mono-tech text-[10px] text-zinc-400 tracking-widest uppercase">
              <Disc className="w-3.5 h-3.5 text-white animate-spin" style={{ animationDuration: '10s' }} />
              <span>DUAL BRAND IDENTITY // STUDIO & DIGITAL ARTIFACTS</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold font-mono-tech text-white uppercase tracking-tight leading-tight">
              TECH MEETS HIGH-FASHION MINIMALISM.
            </h2>

            <p className="text-zinc-400 text-sm sm:text-base font-light leading-relaxed">
              Lunair is designed with a singular aesthetic philosophy: uncompromising purity, sharp modern geometry, and extreme utility. The identity bridges software precision with physical garments and digital artifacts.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 font-mono-tech text-xs">
              <div className="p-4 bg-zinc-950 border border-zinc-900 space-y-1">
                <span className="text-zinc-500 text-[10px] block">01. DIGITAL ARTIFACTS</span>
                <span className="text-white font-bold uppercase block">Micro-AI Utilities</span>
                <p className="text-zinc-500 text-[11px] font-sans font-light">
                  Single-purpose computational tools designed for zero-latency execution.
                </p>
              </div>

              <div className="p-4 bg-zinc-950 border border-zinc-900 space-y-1">
                <span className="text-zinc-500 text-[10px] block">02. APPAREL EDITIONS</span>
                <span className="text-white font-bold uppercase block">Lunair Wearables (Q4)</span>
                <p className="text-zinc-500 text-[11px] font-sans font-light">
                  Heavyweight monochrome garments, minimal branding, geometric silhouettes.
                </p>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <a
                href="#waitlist"
                className="btn-secondary px-6 py-3 font-mono-tech text-xs tracking-widest uppercase flex items-center gap-2 cursor-pointer"
              >
                <span>JOIN STUDIO WAITLIST</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Visual Brand Card */}
          <div className="lg:col-span-5">
            <div className="relative p-8 bg-zinc-950 border border-zinc-800 aspect-square flex flex-col justify-between overflow-hidden group">
              
              {/* Corner Watermarks */}
              <div className="flex items-center justify-between font-mono-tech text-[10px] text-zinc-600 tracking-widest">
                <span>[ LUNAIR STUDIO ]</span>
                <span>EST. 2026</span>
              </div>

              {/* Central Official Geometric Typography Emblem */}
              <div className="my-auto text-center py-8">
                <img
                  src="/images/logo/logo.png"
                  alt="LUNAIR"
                  className="h-12 sm:h-20 w-auto mx-auto object-contain mix-blend-screen group-hover:scale-105 transition-transform duration-300"
                />
                <div className="font-mono-tech text-[9px] text-zinc-500 tracking-[0.25em] uppercase pt-4">
                  UNIFORM & UTILITY LAB
                </div>
              </div>

              {/* Card Footer Tag */}
              <div className="flex items-center justify-between font-mono-tech text-[10px] border-t border-zinc-900 pt-3">
                <span className="text-zinc-500">PARADIGM: MONOCHROME</span>
                <span className="text-white">EDITION 001</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
