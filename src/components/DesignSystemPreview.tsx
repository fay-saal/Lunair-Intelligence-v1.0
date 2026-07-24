import { X, Palette, Type, Square, Code } from 'lucide-react';

interface DesignSystemPreviewProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DesignSystemPreview: React.FC<DesignSystemPreviewProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-fadeIn font-mono-tech">
      <div className="bg-zinc-950 border border-zinc-800 w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-800 bg-black">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white uppercase tracking-widest">
                LUNAIR CORE DESIGN SYSTEM TOKENS
              </h2>
              <span className="text-[10px] bg-white text-black font-bold px-2 py-0.5">
                V1.0
              </span>
            </div>
            <p className="text-xs text-zinc-500 font-sans font-light mt-1">
              Reusable UI tokens, typography scale, component specs, and API contracts for building new micro-AI tools.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-zinc-500 hover:text-white border border-zinc-800 bg-zinc-900 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-10 flex-1 bg-zinc-950 text-xs">
          
          {/* Section 1: Color Palette */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-zinc-900 pb-2 text-zinc-400">
              <Palette className="w-4 h-4 text-white" />
              <span className="font-bold uppercase tracking-wider text-white">
                01. MONOCHROME COLOR TOKENS
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
              <div className="p-3 bg-black border border-zinc-800 space-y-2">
                <div className="w-full h-10 bg-black border border-zinc-800"></div>
                <span className="text-[10px] text-zinc-400 block font-bold">PITCH BLACK</span>
                <span className="text-[9px] text-zinc-600 font-mono">#000000</span>
              </div>

              <div className="p-3 bg-black border border-zinc-800 space-y-2">
                <div className="w-full h-10 bg-zinc-950 border border-zinc-800"></div>
                <span className="text-[10px] text-zinc-400 block font-bold">SURFACE 950</span>
                <span className="text-[9px] text-zinc-600 font-mono">#08080A</span>
              </div>

              <div className="p-3 bg-black border border-zinc-800 space-y-2">
                <div className="w-full h-10 bg-zinc-900 border border-zinc-700"></div>
                <span className="text-[10px] text-zinc-400 block font-bold">BORDER SUBTLE</span>
                <span className="text-[9px] text-zinc-600 font-mono">#1F1F23</span>
              </div>

              <div className="p-3 bg-black border border-zinc-800 space-y-2">
                <div className="w-full h-10 bg-zinc-700"></div>
                <span className="text-[10px] text-zinc-400 block font-bold">MUTED GREY</span>
                <span className="text-[9px] text-zinc-600 font-mono">#52525B</span>
              </div>

              <div className="p-3 bg-black border border-zinc-800 space-y-2">
                <div className="w-full h-10 bg-zinc-400"></div>
                <span className="text-[10px] text-zinc-400 block font-bold">COOL GREY</span>
                <span className="text-[9px] text-zinc-600 font-mono">#A1A1AA</span>
              </div>

              <div className="p-3 bg-black border border-zinc-800 space-y-2">
                <div className="w-full h-10 bg-white"></div>
                <span className="text-[10px] text-zinc-400 block font-bold">PURE WHITE</span>
                <span className="text-[9px] text-zinc-600 font-mono">#FFFFFF</span>
              </div>
            </div>
          </div>

          {/* Section 2: Typography Hierarchy */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-zinc-900 pb-2 text-zinc-400">
              <Type className="w-4 h-4 text-white" />
              <span className="font-bold uppercase tracking-wider text-white">
                02. TYPOGRAPHY SCALE & HIERARCHY
              </span>
            </div>

            <div className="p-4 bg-black border border-zinc-800 space-y-4">
              <div className="border-b border-zinc-900 pb-3">
                <span className="text-[10px] text-zinc-500 block mb-1">HEADLINE H1 - MONO BOLD (UPPERCASE)</span>
                <span className="text-3xl font-bold text-white tracking-tight uppercase">
                  PURE UTILITY. ZERO CLUTTER.
                </span>
              </div>

              <div className="border-b border-zinc-900 pb-3">
                <span className="text-[10px] text-zinc-500 block mb-1">SECTION TITLE H2 - MONO SEMIBOLD</span>
                <span className="text-xl font-bold text-white uppercase tracking-wide">
                  AVAILABLE & UPCOMING MICRO UTILITIES
                </span>
              </div>

              <div>
                <span className="text-[10px] text-zinc-500 block mb-1">BODY REGULAR - HIGH CONTRAST SANS</span>
                <span className="text-xs text-zinc-300 font-sans leading-relaxed">
                  Every micro utility receives a single input (photo, audio, URL, PDF) and transforms it into structured output in under 1 second. Zero data retention guaranteed.
                </span>
              </div>
            </div>
          </div>

          {/* Section 3: Component Primitives */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-zinc-900 pb-2 text-zinc-400">
              <Square className="w-4 h-4 text-white" />
              <span className="font-bold uppercase tracking-wider text-white">
                03. BUTTONS & CARD PRIMITIVES
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Primary Button */}
              <div className="p-4 bg-black border border-zinc-800 space-y-3">
                <span className="text-[10px] text-zinc-500 block">PRIMARY ACTION BUTTON</span>
                <button className="btn-primary px-4 py-2 text-xs font-bold tracking-widest uppercase cursor-pointer">
                  LAUNCH TOOLKIT
                </button>
              </div>

              {/* Secondary Button */}
              <div className="p-4 bg-black border border-zinc-800 space-y-3">
                <span className="text-[10px] text-zinc-500 block">SECONDARY / HAIRLINE OUTLINE</span>
                <button className="btn-secondary px-4 py-2 text-xs tracking-widest uppercase cursor-pointer">
                  TEST LIVE DEMO
                </button>
              </div>
            </div>
          </div>

          {/* Section 4: API Contract Specification for Scalable Tool Integration */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-zinc-900 pb-2 text-zinc-400">
              <Code className="w-4 h-4 text-white" />
              <span className="font-bold uppercase tracking-wider text-white">
                04. MICRO-TOOL API CONTRACT SCHEMA
              </span>
            </div>

            <div className="p-4 bg-black border border-zinc-800 space-y-2">
              <pre className="text-xs text-zinc-300 overflow-x-auto leading-relaxed">
{`// Standardized Lunair Micro-Tool Execution Interface
export interface LunairToolDefinition {
  id: string;             // Unique slug e.g. "receipt-to-spreadsheet"
  title: string;          // Display title
  category: 'vision' | 'document' | 'audio' | 'data';
  inputSchema: {
    accepts: string[];   // ["image/png", "application/pdf"]
    maxBytes: number;    // 52428800 (50MB)
  };
  outputSchema: {
    type: 'table' | 'markdown' | 'json';
    exportFormats: string[]; // ["CSV", "XLSX"]
  };
  handler: (input: Blob | string) => Promise<ToolExecutionResult>;
}`}
              </pre>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-800 bg-black flex items-center justify-between text-xs text-zinc-500">
          <span>LUNAIR DESIGN SYSTEM SPECIFICATION</span>
          <button onClick={onClose} className="btn-secondary px-4 py-1.5 uppercase cursor-pointer">
            DONE
          </button>
        </div>

      </div>
    </div>
  );
};
