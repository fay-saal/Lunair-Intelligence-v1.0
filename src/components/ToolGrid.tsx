import { useState } from 'react';
import { Search, Filter, Layers } from 'lucide-react';
import { motion } from 'framer-motion';
import { MICRO_TOOLS, CATEGORIES } from '../data/tools';
import { ToolCard } from './ToolCard';
import type { MicroTool, ToolCategory } from '../types/tool';

interface ToolGridProps {
  onSelectTool: (tool: MicroTool) => void;
}

export const ToolGrid: React.FC<ToolGridProps> = ({ onSelectTool }) => {
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter tools
  const filteredTools = MICRO_TOOLS.filter((tool) => {
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    const matchesSearch =
      tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.inputFormat.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.outputFormat.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const headerText = "AVAILABLE & UPCOMING TOOLS";

  return (
    <section id="tools-section" className="py-20 bg-black relative">
      {/* Top Hairline Separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-zinc-900" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 font-mono-tech text-xs text-zinc-400 tracking-widest uppercase mb-2">
              <Layers className="w-4 h-4 text-white" />
              <span>// MICRO-AI TOOLKIT CATALOG</span>
            </div>
            
            {/* Typewriter Effect Header */}
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
              className="text-3xl sm:text-4xl font-bold font-mono-tech text-white uppercase tracking-tight flex flex-wrap"
            >
              {headerText.split('').map((char, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0, display: 'none' },
                    visible: { opacity: 1, display: 'inline' }
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
              <motion.span
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: [0, 1, 0], transition: { repeat: Infinity, duration: 0.8 } }
                }}
                className="inline-block w-3 h-[1em] bg-emerald-500 ml-2"
              />
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="text-sm text-zinc-400 font-light mt-1 max-w-xl"
            >
              Each micro-utility performs one specific task with maximum reliability and speed.
            </motion.p>
          </div>

          {/* Search Input Bar */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="relative w-full md:w-72"
          >
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tools, formats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 text-xs font-mono-tech text-white pl-9 pr-4 py-2.5 focus:outline-none focus:border-zinc-500 transition-colors placeholder:text-zinc-600"
            />
          </motion.div>
        </div>

        {/* Category Filter Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-zinc-900 no-scrollbar"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as ToolCategory)}
              className={`px-4 py-2 font-mono-tech text-xs tracking-wider whitespace-nowrap border transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-white text-black border-white font-semibold'
                  : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-white'
              }`}
            >
              {cat.label.toUpperCase()} ({cat.count})
            </button>
          ))}
        </motion.div>

        {/* Dynamic Bento Box Grid */}
        {filteredTools.length > 0 ? (
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr"
          >
            {filteredTools.map((tool, index) => (
              <ToolCard key={tool.id} tool={tool} onSelect={onSelectTool} index={index} />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-16 bg-zinc-950 border border-zinc-900 p-8 space-y-3">
            <Filter className="w-8 h-8 text-zinc-600 mx-auto" />
            <h4 className="font-mono-tech text-sm text-zinc-400 uppercase tracking-widest">
              NO MATCHING MICRO-UTILITIES FOUND
            </h4>
            <p className="text-xs text-zinc-600">
              Try searching for a different keyword or select another category.
            </p>
          </div>
        )}

        {/* Scalability Notice Banner */}
        <div className="mt-16 p-6 bg-zinc-950 border border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
            <div>
              <h4 className="font-mono-tech text-xs text-white uppercase tracking-wider font-bold">
                TOOLKIT EXPANSION ROADMAP
              </h4>
              <p className="text-xs text-zinc-400 font-light mt-0.5">
                New single-input utilities added bi-weekly. Suggest a micro-tool to the engineering team.
              </p>
            </div>
          </div>

          <a
            href="mailto:tools@lunair.ai"
            className="btn-secondary px-4 py-2 font-mono-tech text-xs tracking-wider uppercase whitespace-nowrap"
          >
            REQUEST MICRO-TOOL
          </a>
        </div>

      </div>
    </section>
  );
};
