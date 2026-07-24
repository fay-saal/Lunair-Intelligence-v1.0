import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, FileText, LayoutGrid } from 'lucide-react';
import { MICRO_TOOLS } from '../data/tools';
import type { MicroTool } from '../types/tool';
import { Spotlight } from './ui/spotlight';
import { BackgroundBeams } from './ui/background-beams';
import { BorderBeam } from './ui/border-beam';
import { ShimmerButton } from './ui/shimmer-button';

interface HeroProps {
  onSelectTool: (tool: MicroTool) => void;
}

const KINETIC_WORDS = [
  "Handwritten Elements",
  "Receipts & Invoices",
  "YouTube Videos",
  "Voice Notes & Audio"
];

export const Hero: React.FC<HeroProps> = ({ onSelectTool }) => {
  const activeTools = MICRO_TOOLS.filter((t) => t.isAvailable);
  const currentPreviewTool = activeTools[0];
  
  const [wordIndex, setWordIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % KINETIC_WORDS.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-black">
      <BackgroundBeams />
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
        
        {/* Top Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-3 mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-zinc-950/80 border border-zinc-800/50 rounded-full font-mono-tech text-[10px] text-zinc-400 tracking-widest uppercase">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            <span>Lunair Intelligence v1.0</span>
          </div>
        </motion.div>

        {/* Kinetic Hero Title */}
        <div className="text-center max-w-5xl mx-auto space-y-8 mb-14">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tighter text-white leading-[1.1] flex flex-col items-center"
          >
            <span>Turn</span>
            <span className="inline-block relative w-full h-[1.2em] overflow-hidden my-2">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={wordIndex}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 flex items-center justify-center text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 via-white to-zinc-400"
                >
                  {KINETIC_WORDS[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
            <span>into structured output.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-base sm:text-lg md:text-xl text-zinc-400 font-light max-w-2xl mx-auto leading-relaxed"
          >
            High-performance, single-purpose AI micro-utilities. Designed for speed, privacy, and precision.
          </motion.p>

          {/* Magnetic CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.a
              href="#tools-section"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="group relative w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-semibold tracking-wide text-sm flex items-center justify-center gap-3 overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(255,255,255,0.25)] transition-shadow"
            >
              <span className="relative z-10">Explore the Grid</span>
              <LayoutGrid className="w-4 h-4 relative z-10 group-hover:scale-110 transition-transform" />
            </motion.a>
            <ShimmerButton
              onClick={() => onSelectTool(currentPreviewTool)}
              className="w-full sm:w-auto px-8 py-4"
              background="#0A0A0A"
              shimmerColor="#ffffff"
            >
              <span className="flex items-center justify-center gap-3 text-sm font-medium tracking-wide">
                Test Live Demo
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </ShimmerButton>
          </motion.div>
        </div>

        {/* 3D Floating Preview Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-4xl mx-auto perspective-1000 mt-12"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ perspective: 1200 }}
        >
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative w-full rounded-2xl bg-gradient-to-b from-[#111111] to-[#050505] p-px shadow-2xl"
          >
            <BorderBeam size={250} duration={12} delay={9} />
            <div className="w-full h-auto bg-[#050505] rounded-[15px] overflow-hidden flex flex-col relative z-10" style={{ transform: "translateZ(40px)" }}>
              {/* MacOS Style Header */}
              <div className="h-12 border-b border-[#1A1A1A] flex items-center px-4 gap-2 bg-[#080808]">
                <div className="w-3 h-3 rounded-full bg-[#333333]" />
                <div className="w-3 h-3 rounded-full bg-[#333333]" />
                <div className="w-3 h-3 rounded-full bg-[#333333]" />
              </div>
              
              {/* Fake UI Content */}
              <div className="grid grid-cols-1 md:grid-cols-2 p-8 gap-8 min-h-[300px]">
                {/* Left Panel - Realistic Document Input */}
                <div className="border border-[#222222] rounded-xl bg-[#0A0A0A] flex flex-col items-center justify-center p-4 relative overflow-hidden">
                  <div className="w-[140px] h-[180px] bg-white rounded-md shadow-sm p-3 flex flex-col gap-2 rotate-[-4deg] group-hover:rotate-0 transition-transform duration-700">
                    {/* Handwritten Mock Content */}
                    <div className="flex justify-between items-center border-b border-zinc-200 pb-2 mb-1">
                      <div className="w-10 h-3 bg-zinc-300/80 rounded-sm skew-x-[15deg]" />
                      <div className="w-14 h-3 bg-zinc-200/80 rounded-sm -skew-x-[10deg]" />
                    </div>
                    <div className="space-y-3 flex-1 pt-2">
                      <div className="flex justify-between"><div className="w-16 h-2 bg-zinc-300/70 rounded-full rotate-[-2deg]" /><div className="w-6 h-2 bg-zinc-400/80 rounded-sm rotate-[1deg]" /></div>
                      <div className="flex justify-between"><div className="w-20 h-2 bg-zinc-300/70 rounded-full rotate-[1deg]" /><div className="w-8 h-2 bg-zinc-400/80 rounded-sm rotate-[-1deg]" /></div>
                      <div className="flex justify-between"><div className="w-12 h-2 bg-zinc-300/70 rounded-full rotate-[-3deg]" /><div className="w-6 h-2 bg-zinc-400/80 rounded-sm rotate-[2deg]" /></div>
                    </div>
                    <div className="mt-auto border-t border-zinc-200 pt-2 flex justify-between">
                      <div className="w-10 h-2.5 bg-zinc-300/80 rounded-sm rotate-[1deg]" />
                      <div className="w-12 h-2.5 bg-zinc-400/90 rounded-sm rotate-[1deg]" />
                    </div>
                    {/* Live OCR Scanner Line */}
                    <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-transparent to-emerald-500/20 border-b border-emerald-400/80 shadow-[0_5px_15px_rgba(16,185,129,0.2)] animate-scan pointer-events-none" />
                  </div>
                  <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md px-2 py-1 rounded text-[9px] font-mono-tech text-zinc-400 border border-zinc-800 shadow-xl">
                    scan_001.jpg
                  </div>
                </div>
                
                {/* Right Panel - Structured Output */}
                <div className="border border-[#1A1A1A] rounded-xl bg-[#030303] p-5 flex flex-col relative overflow-hidden shadow-inner">
                   <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent animate-scan opacity-40" />
                   
                   <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-3 mb-4">
                     <div className="flex items-center gap-2">
                       <FileText className="w-4 h-4 text-emerald-500" />
                       <span className="text-[10px] font-mono-tech text-emerald-400 tracking-wider">EXTRACTION_COMPLETE</span>
                     </div>
                     <span className="text-[10px] font-mono-tech text-zinc-500">142ms</span>
                   </div>

                   <div className="flex-1 font-mono text-xs text-zinc-300 flex flex-col gap-1.5 overflow-hidden">
                     <span className="text-zinc-500">{'{'}</span>
                     <div className="pl-4 flex flex-col gap-1.5">
                       <div><span className="text-blue-400">"vendor"</span><span className="text-zinc-500">: </span><span className="text-amber-300">"Blue Bottle Coffee"</span>,</div>
                       <div><span className="text-blue-400">"date"</span><span className="text-zinc-500">: </span><span className="text-amber-300">"2026-07-23"</span>,</div>
                       <div><span className="text-blue-400">"items"</span><span className="text-zinc-500">: [</span></div>
                       <div className="pl-4 flex flex-col gap-1.5">
                         <div><span className="text-zinc-500">{'{'} </span><span className="text-blue-400">"name"</span><span className="text-zinc-500">: </span><span className="text-amber-300">"Cold Brew"</span><span className="text-zinc-500">, </span><span className="text-blue-400">"price"</span><span className="text-zinc-500">: </span><span className="text-emerald-300">5.50</span><span className="text-zinc-500"> {'}'}</span></div>
                       </div>
                       <div><span className="text-zinc-500">],</span></div>
                       <div><span className="text-blue-400">"total"</span><span className="text-zinc-500">: </span><span className="text-emerald-300">5.50</span></div>
                     </div>
                     <span className="text-zinc-500">{'}'}</span>
                   </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};
