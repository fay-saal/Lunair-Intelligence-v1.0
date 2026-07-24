import { useState, useEffect } from 'react';
import { X, Upload, CheckCircle2, Copy, Download, RefreshCw, Cpu, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { MicroTool } from '../types/tool';

interface ToolModalProps {
  tool: MicroTool | null;
  onClose: () => void;
}

export const ToolModal: React.FC<ToolModalProps> = ({ tool, onClose }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasProcessed, setHasProcessed] = useState(true);
  const [copied, setCopied] = useState(false);
  const [activeInputTab, setActiveInputTab] = useState<'sample' | 'custom'>('sample');
  const [customInputText, setCustomInputText] = useState('');

  const handleRunProcessing = () => {
    setIsProcessing(true);
    setProgress(10);
    setHasProcessed(false);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          setHasProcessed(true);
          return 100;
        }
        return prev + 15; // Faster for 1-second instant simulation
      });
    }, 100);
  };

  useEffect(() => {
    if (tool) {
      // Reset state and instantly run simulation
      setProgress(0);
      setHasProcessed(false);
      handleRunProcessing();
    }
  }, [tool]);


  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!tool) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 bg-black/60 backdrop-blur-md"
      >
        {/* Modal/Drawer Container */}
        <motion.div 
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="bg-black border border-[#222222] w-full max-w-4xl max-h-[90vh] sm:h-auto h-[90vh] rounded-t-3xl sm:rounded-2xl flex flex-col shadow-2xl overflow-hidden font-mono-tech relative will-change-transform"
        >
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-zinc-800 bg-black">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-zinc-900 border border-zinc-700 flex items-center justify-center text-white">
              <Cpu className="w-4 h-4 text-emerald-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white uppercase tracking-wider">
                  {tool.title}
                </h3>
                <span className="text-[10px] bg-zinc-900 border border-zinc-800 text-zinc-300 px-2 py-0.5">
                  LIVE PLAYGROUND
                </span>
              </div>
              <p className="text-xs text-zinc-500 font-sans font-light mt-0.5">
                Input: {tool.inputFormat} → Output: {tool.outputFormat}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-zinc-500 hover:text-white border border-zinc-800 hover:border-zinc-600 bg-zinc-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 bg-zinc-950">
          
          {/* Top Control Bar: Mode Toggle */}
          <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={() => setActiveInputTab('sample')}
                className={`px-3 py-1 border transition-colors cursor-pointer ${
                  activeInputTab === 'sample'
                    ? 'bg-white text-black border-white font-bold'
                    : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
                }`}
              >
                USE PRESET SAMPLE
              </button>
              <button
                onClick={() => setActiveInputTab('custom')}
                className={`px-3 py-1 border transition-colors cursor-pointer ${
                  activeInputTab === 'custom'
                    ? 'bg-white text-black border-white font-bold'
                    : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
                }`}
              >
                CUSTOM TEST INPUT
              </button>
            </div>

            <button
              onClick={handleRunProcessing}
              disabled={isProcessing}
              className="btn-primary px-4 py-1.5 text-xs font-bold uppercase flex items-center gap-1.5 cursor-pointer"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>PARSING ({progress}%)</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>RUN UTILITY</span>
                </>
              )}
            </button>
          </div>

          {/* Grid Layout: Input Dropzone / Data vs Output Viewer */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Input Side */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span>01. INPUT DATA</span>
                <span className="text-[10px] text-zinc-600">FORMAT: {tool.inputFormat}</span>
              </div>

              {activeInputTab === 'sample' ? (
                <div className="p-4 bg-black border border-zinc-800 space-y-3">
                  <div className="flex items-center justify-between text-xs border-b border-zinc-900 pb-2">
                    <span className="text-zinc-300 truncate font-semibold">
                      {tool.sampleData?.inputName}
                    </span>
                    <span className="text-emerald-400 text-[10px]">LOADED</span>
                  </div>

                  {tool.sampleData?.inputType === 'image' && (
                    <div className="relative aspect-video bg-zinc-900 overflow-hidden border border-zinc-800">
                      <img
                        src={tool.sampleData.inputPreview}
                        alt="Sample input"
                        className="w-full h-full object-cover opacity-80"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2">
                        <span className="text-[10px] text-zinc-300 font-mono-tech">
                          Sample Document Image
                        </span>
                      </div>
                    </div>
                  )}

                  {tool.sampleData?.inputType === 'url' && (
                    <div className="p-3 bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 break-all font-mono-tech">
                      {tool.sampleData.inputPreview}
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <textarea
                    rows={6}
                    placeholder="Paste sample text, URL, or image data link here..."
                    value={customInputText}
                    onChange={(e) => setCustomInputText(e.target.value)}
                    className="w-full p-3 bg-black border border-zinc-800 text-xs font-mono-tech text-white focus:outline-none focus:border-zinc-500"
                  />
                  <div className="p-4 border border-dashed border-zinc-800 text-center text-xs text-zinc-500 hover:border-zinc-600 transition-colors cursor-pointer">
                    <Upload className="w-5 h-5 mx-auto mb-1 text-zinc-600" />
                    <span>OR DRAG & DROP FILE HERE</span>
                  </div>
                </div>
              )}
            </div>

            {/* Output Side */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>02. PARSED RESULT</span>
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="text-[10px] text-zinc-400 hover:text-white flex items-center gap-1 bg-zinc-900 px-2 py-0.5 border border-zinc-800 cursor-pointer"
                  >
                    <Copy className="w-3 h-3" />
                    <span>{copied ? 'COPIED' : 'COPY'}</span>
                  </button>
                </div>
              </div>

              {/* Output Content Area */}
              <div className="p-4 bg-black border border-zinc-800 min-h-[220px] flex flex-col justify-between">
                {isProcessing ? (
                  <div className="my-auto text-center space-y-3 py-10">
                    <RefreshCw className="w-6 h-6 text-white animate-spin mx-auto" />
                    <p className="text-xs text-zinc-400">NEURAL PARSER IN PROGRESS...</p>
                    <div className="w-48 mx-auto h-1 bg-zinc-900 overflow-hidden">
                      <div
                        className="h-full bg-white transition-all duration-150"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                ) : hasProcessed ? (
                  tool.sampleData?.outputType === 'table' ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse font-mono-tech">
                        <thead>
                          <tr className="border-b border-zinc-800 text-zinc-500 text-[10px]">
                            <th className="py-2">ITEM</th>
                            <th className="py-2 text-center">QTY</th>
                            <th className="py-2 text-right">TOTAL</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-900 text-zinc-300">
                          {Array.isArray(tool.sampleData.outputContent) &&
                            tool.sampleData.outputContent.map((row: any, i: number) => (
                              <tr key={i} className="hover:bg-zinc-900/50">
                                <td className="py-2 font-medium">{row.item}</td>
                                <td className="py-2 text-center text-zinc-500">{row.qty}</td>
                                <td className="py-2 text-right font-bold text-white">{row.total}</td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <pre className="text-xs text-zinc-300 whitespace-pre-wrap font-mono-tech leading-relaxed">
                      {typeof tool.sampleData?.outputContent === 'string'
                        ? tool.sampleData.outputContent
                        : JSON.stringify(tool.sampleData?.outputContent, null, 2)}
                    </pre>
                  )
                ) : (
                  <div className="my-auto text-center text-xs text-zinc-600 py-10">
                    Click "RUN UTILITY" to process payload.
                  </div>
                )}

                {hasProcessed && !isProcessing && (
                  <div className="pt-3 mt-3 border-t border-zinc-900 flex items-center justify-between text-[10px] text-zinc-500">
                    <span>STATUS: 200 OK • LATENCY: ~{tool.estimatedTime}</span>
                    <button className="text-white hover:underline flex items-center gap-1 cursor-pointer">
                      <Download className="w-3 h-3" />
                      <span>EXPORT {tool.outputFormat}</span>
                    </button>
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-zinc-800 bg-black flex items-center justify-between text-xs text-zinc-500">
          <span>LUNAIR ZERO-RETENTION GUARANTEE</span>
          <button
            onClick={onClose}
            className="btn-secondary px-4 py-1.5 text-xs tracking-wider uppercase cursor-pointer"
          >
            CLOSE
          </button>
        </div>
      </motion.div>
    </motion.div>
    </AnimatePresence>
  );
};
