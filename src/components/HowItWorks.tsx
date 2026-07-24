import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Upload, Cpu, Download, Code2 } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  
  const steps = [
    {
      step: '01',
      title: 'Drop Single Input',
      subtitle: 'Raw Artifact Upload',
      icon: Upload,
      description: 'Upload a single photo, document, URL, or audio recording. No complex configurations or multi-step wizard setups.',
      code: `const payload = { input: "raw_scan.jpg" };`
    },
    {
      step: '02',
      title: 'Neural Execution',
      subtitle: 'Deterministic Processing',
      icon: Cpu,
      description: 'Our lightweight specialized micro-AI model parses raw tokens, extracts structured entities, and validates formatting.',
      code: `const result = await lunairCore.process(payload);`
    },
    {
      step: '03',
      title: 'Export Precise Result',
      subtitle: 'Instant Utility Output',
      icon: Download,
      description: 'Copy formatted text, download clean CSV/Excel spreadsheets, or trigger direct webhooks for continuous automation.',
      code: `return { format: "CSV", data: [...] };`
    }
  ];

  return (
    <section id="how-it-works" className="py-32 bg-black relative overflow-hidden" ref={containerRef}>
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-radial-gradient opacity-50 pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-24 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#111111] border border-[#222222] rounded-full font-mono-tech text-[10px] text-zinc-400 tracking-widest uppercase">
            // Unified Architecture
          </div>
          <h2 className="text-4xl sm:text-6xl font-bold font-mono-tech text-white uppercase tracking-tighter">
            How Lunair Works
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 font-light max-w-xl mx-auto">
            A frictionless pipeline. Every tool follows the exact same deterministic execution loop.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative">
           {/* The Laser Track (Background) */}
           <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-[#1A1A1A] -translate-x-1/2" />
           {/* The Laser Line (Foreground Animated) */}
           <motion.div 
             style={{ height: lineHeight }}
             className="absolute left-6 md:left-1/2 top-0 w-[2px] bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)] -translate-x-1/2 origin-top"
           />

           <div className="space-y-24">
             {steps.map((item, index) => {
               const Icon = item.icon;
               const isEven = index % 2 === 0;

               return (
                 <div key={item.step} className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                   
                   {/* Timeline Node Center Dot */}
                   <div className="absolute left-6 md:left-1/2 w-5 h-5 rounded-full bg-black border-2 border-zinc-800 -translate-x-1/2 z-10 shadow-[0_0_10px_rgba(0,0,0,1)] flex items-center justify-center">
                     <motion.div 
                       initial={{ scale: 0 }}
                       whileInView={{ scale: 1 }}
                       viewport={{ once: false, amount: 0.5 }}
                       className="w-2 h-2 rounded-full bg-emerald-400"
                     />
                   </div>

                   {/* Content Card */}
                   <motion.div 
                     initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: false, amount: 0.3 }}
                     transition={{ duration: 0.6, ease: "easeOut" }}
                     className="w-full pl-16 md:pl-0 md:w-1/2 flex flex-col group"
                   >
                     <div className={`p-8 rounded-2xl bg-[#0A0A0A] border border-[#1A1A1A] hover:border-[#333333] transition-colors relative overflow-hidden ${isEven ? 'md:mr-12' : 'md:ml-12'}`}>
                        {/* Hover Glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6 relative z-10">
                           <div className="w-12 h-12 rounded-xl bg-black border border-[#222222] flex items-center justify-center shrink-0">
                             <Icon className="w-6 h-6 text-white" />
                           </div>
                           <div>
                             <span className="font-mono-tech text-[10px] text-zinc-500 tracking-widest uppercase block mb-1">
                               Step {item.step} // {item.subtitle}
                             </span>
                             <h3 className="text-xl font-bold text-white tracking-tight">
                               {item.title}
                             </h3>
                           </div>
                        </div>

                        <p className="text-sm text-zinc-400 leading-relaxed mb-6 relative z-10">
                           {item.description}
                        </p>

                        {/* Code Teaser */}
                        <div className="p-4 bg-black border border-[#1A1A1A] rounded-lg font-mono-tech text-xs text-zinc-500 overflow-x-auto relative z-10">
                           <div className="flex items-center gap-2 mb-2 pb-2 border-b border-[#1A1A1A]">
                              <Code2 className="w-3 h-3 text-zinc-600" />
                              <span className="uppercase text-[9px] tracking-wider">Engine Log</span>
                           </div>
                           <code className="text-zinc-300">{item.code}</code>
                        </div>
                     </div>
                   </motion.div>
                   
                   {/* Empty Space for Grid Alignment */}
                   <div className="hidden md:block w-1/2" />
                 </div>
               );
             })}
           </div>
        </div>
      </div>
    </section>
  );
};
