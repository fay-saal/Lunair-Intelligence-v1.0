import { 
  Receipt, FileSignature, Video, FileSpreadsheet, Mic, 
  Table, Layout, ShieldAlert, Clock, FileCode, PlayCircle, Aperture 
} from 'lucide-react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import type { MicroTool } from '../types/tool';
import { BorderBeam } from './ui/border-beam';

interface ToolCardProps {
  tool: MicroTool;
  onSelect: (tool: MicroTool) => void;
  index: number;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool, onSelect, index }) => {
  const isLarge = index === 0;
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  
  const renderIcon = () => {
    const props = { className: "w-5 h-5 sm:w-6 sm:h-6 text-white" };
    switch (tool.iconName) {
      case 'Receipt': return <Receipt {...props} />;
      case 'FileSignature': return <FileSignature {...props} />;
      case 'Video': return <Video {...props} />;
      case 'FileSpreadsheet': return <FileSpreadsheet {...props} />;
      case 'Mic': return <Mic {...props} />;
      case 'Table': return <Table {...props} />;
      case 'Layout': return <Layout {...props} />;
      case 'Aperture': return <Aperture {...props} />;
      case 'ShieldAlert': return <ShieldAlert {...props} />;
      default: return <FileCode {...props} />;
    }
  };

  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
      }}
      whileHover={{ y: -4 }}
      onMouseMove={handleMouseMove}
      className={`group cursor-pointer rounded-2xl bg-[#080808] border border-[#1a1a1a] hover:border-[#444444] transition-colors relative overflow-hidden flex flex-col ${isLarge ? 'md:col-span-2 md:row-span-2' : ''} ${!tool.isAvailable ? 'opacity-80' : ''}`}
      onClick={() => tool.isAvailable && onSelect(tool)}
    >
      {/* Magic UI Border Beam (Hover) */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none">
        <BorderBeam size={isLarge ? 300 : 150} duration={8} delay={0} />
      </div>

      {/* Aceternity Spotlight Hover Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100 z-10"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              ${isLarge ? 400 : 250}px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.06),
              transparent 80%
            )
          `,
        }}
      />

      
      <div className={`p-6 flex flex-col h-full relative z-10 ${isLarge ? 'md:p-10 md:w-1/2' : ''}`}>
        
        {/* Top Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-black border border-[#222222] rounded-xl flex items-center justify-center group-hover:border-[#444444] transition-colors">
            {renderIcon()}
          </div>
          {tool.isAvailable ? (
            <div className="p-px border-sweep rounded-full">
              <span className="block px-3 py-1 bg-[#111111] rounded-full font-mono-tech text-[9px] sm:text-[10px] text-zinc-300 tracking-wider">
                {tool.badgeText || 'AVAILABLE'}
              </span>
            </div>
          ) : (
            <span className="px-3 py-1 bg-black border border-[#111111] rounded-full font-mono-tech text-[9px] sm:text-[10px] text-zinc-600 tracking-wider">
              COMING SOON
            </span>
          )}
        </div>

        {/* Text Content */}
        <div className="mb-8">
          <h3 className="font-semibold text-lg sm:text-xl text-white mb-2 tracking-tight group-hover:text-zinc-100 transition-colors">
            {tool.title}
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
            {tool.description}
          </p>
        </div>

        {/* Bottom Actions */}
        <div className="mt-auto pt-4 border-t border-[#1A1A1A] flex items-center justify-between z-20">
           <div className="flex items-center gap-1.5 font-mono-tech text-[9px] sm:text-[10px] text-zinc-500">
             <Clock className="w-3 h-3 text-zinc-600" />
             <span>~{tool.estimatedTime}</span>
           </div>
           {tool.isAvailable ? (
             <button
               onClick={(e) => {
                 e.stopPropagation();
                 onSelect(tool);
               }}
               className="tactile-btn flex items-center gap-2 text-[10px] sm:text-xs font-mono-tech font-bold tracking-widest uppercase bg-white text-black px-3 py-1.5 rounded-full hover:bg-zinc-200"
             >
               <PlayCircle className="w-3.5 h-3.5" />
               Quick Preview
             </button>
           ) : (
             <div className="text-xs font-medium text-zinc-600">Notify Me</div>
           )}
        </div>
      </div>

     {/* Bento Box Decorative Teasers */}
      {isLarge && (
         <div className="hidden md:flex absolute top-0 right-0 w-1/2 h-full bg-[#030303] border-l border-[#1a1a1a] items-center justify-center overflow-hidden pointer-events-none">
            {/* Background Accent */}
            <div className="absolute inset-0 bg-noise opacity-30" />
            
            {/* The Custom Receipt -> Spreadsheet Graphic */}
            <div className="flex flex-col items-center justify-center w-full h-full p-8 group relative z-10">
              <div className="relative w-48 h-56 flex flex-col items-center group-hover:scale-105 transition-transform duration-700">
                {/* Receipt Wireframe */}
                <div className="absolute inset-0 border border-[#222222] rounded-md bg-[#050505] p-5 flex flex-col gap-4 overflow-hidden shadow-2xl bg-gradient-to-b from-[#0A0A0A] to-[#000000]">
                  {/* Receipt Header Lines */}
                  <div className="w-full h-1.5 bg-[#222222] rounded-full" />
                  <div className="w-3/4 h-1.5 bg-[#222222] rounded-full mb-2" />
                  <div className="w-full h-px bg-[#111111]" />
                  
                  {/* Animated Transformation Grid */}
                  <div className="flex-1 relative mt-2">
                    {/* Before Scan: Receipt lines */}
                    <div className="absolute inset-0 flex flex-col gap-3">
                       <div className="flex justify-between"><div className="w-1/2 h-1.5 bg-[#222222] rounded-full" /><div className="w-1/4 h-1.5 bg-[#222222] rounded-full" /></div>
                       <div className="flex justify-between"><div className="w-1/3 h-1.5 bg-[#222222] rounded-full" /><div className="w-1/4 h-1.5 bg-[#222222] rounded-full" /></div>
                       <div className="flex justify-between"><div className="w-2/3 h-1.5 bg-[#222222] rounded-full" /><div className="w-1/4 h-1.5 bg-[#222222] rounded-full" /></div>
                    </div>
                    {/* After Scan: Table Grid cells */}
                    <div className="absolute inset-0 flex flex-col border border-[#1A1A1A] divide-y divide-[#1A1A1A] opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200">
                       <div className="flex divide-x divide-[#1A1A1A] flex-1">
                          <div className="flex-1 bg-white/[0.02]" />
                          <div className="w-1/4 bg-white/[0.04]" />
                       </div>
                       <div className="flex divide-x divide-[#1A1A1A] flex-1">
                          <div className="flex-1 bg-white/[0.02]" />
                          <div className="w-1/4 bg-white/[0.04]" />
                       </div>
                       <div className="flex divide-x divide-[#1A1A1A] flex-1">
                          <div className="flex-1 bg-white/[0.02]" />
                          <div className="w-1/4 bg-white/[0.04]" />
                       </div>
                    </div>
                  </div>
                  
                  <div className="w-full h-px bg-[#111111] mt-2" />
                  <div className="w-1/2 h-2 bg-[#333333] rounded-full self-end" />

                  {/* Scanning Laser */}
                  <motion.div 
                    initial={{ top: "-10%" }}
                    animate={{ top: "110%" }}
                    transition={{ duration: 2, ease: "linear", repeat: Infinity }}
                    className="absolute left-0 right-0 h-0.5 bg-white shadow-[0_0_15px_rgba(255,255,255,1)] z-20"
                  />
                  {/* Laser Fade Gradient */}
                  <motion.div 
                    initial={{ top: "-10%" }}
                    animate={{ top: "110%" }}
                    transition={{ duration: 2, ease: "linear", repeat: Infinity }}
                    className="absolute left-0 right-0 h-24 bg-gradient-to-b from-transparent to-white/10 -translate-y-full z-10"
                  />
                </div>
              </div>
              
              {/* Fallback File Dropzone UI */}
              <div className="mt-8 border border-[#1A1A1A] bg-[#000000] rounded-lg px-5 py-3 flex items-center justify-center border-dashed group-hover:border-[#333333] transition-colors w-64">
                 <span className="text-[9px] font-mono-tech text-zinc-500 uppercase tracking-widest text-center">
                   Drop receipt photo/PDF or click to upload
                 </span>
              </div>
            </div>
         </div>
      )}
      {!isLarge && tool.id === 'youtube-to-transcript' && (
         <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-end justify-center gap-1 pb-4 pr-4">
            <div className="w-1 bg-white/20 rounded-full animate-waveform" />
            <div className="w-1 bg-white/20 rounded-full animate-waveform" />
            <div className="w-1 bg-white/20 rounded-full animate-waveform" />
            <div className="w-1 bg-white/20 rounded-full animate-waveform" />
         </div>
      )}
      {!isLarge && tool.id === 'receipt-to-csv' && (
         <div className="absolute bottom-16 right-4 w-16 h-16 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 overflow-hidden">
            <div className="w-full h-px bg-emerald-500/80 shadow-[0_0_5px_rgba(16,185,129,0.5)] absolute top-1/2 animate-scan" />
            <Receipt className="w-full h-full text-white/5" />
         </div>
      )}
    </motion.div>
  );
};
