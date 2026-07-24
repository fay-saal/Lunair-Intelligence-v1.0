import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  UploadCloud, 
  Link as LinkIcon, 
  Type, 
  Globe, 
  DollarSign, 
  Copy, 
  Download, 
  Table as TableIcon, 
  FileText,
  ChevronDown,
  Video,
  FileSignature,
  X,
  AlertTriangle
} from 'lucide-react';
import type { MicroTool } from '../../types/tool';
import { processMultimodalInput } from '../../services/gemini';

interface ToolWorkspaceProps {
  tool?: MicroTool;
  onBack?: () => void;
}

type InputTab = 'upload' | 'url' | 'text';

export const ToolWorkspace: React.FC<ToolWorkspaceProps> = ({
  tool,
  onBack
}) => {
  const [activeInputTab, setActiveInputTab] = useState<InputTab>('upload');
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const [apiError, setApiError] = useState<string | null>(null);
  const [extractedData, setExtractedData] = useState<any>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Set default input tab based on tool category
  useEffect(() => {
    if (tool?.id === 'youtube-to-transcript') setActiveInputTab('url');
    else if (tool?.id === 'handwriting-to-text') setActiveInputTab('upload');
    else setActiveInputTab('upload');
    
    setIsProcessing(false);
    setHasResult(false);
    setSelectedFile(null);
    setPreviewUrl(null);
    setApiError(null);
    setExtractedData(null);
  }, [tool]);

  const handleProcess = async () => {
    setIsProcessing(true);
    setHasResult(false);
    setApiError(null);
    
    try {
      let textInput = null;
      if (activeInputTab === 'url') textInput = "URL to process: " + (document.querySelector('input[type="url"]') as HTMLInputElement)?.value;
      if (activeInputTab === 'text') textInput = (document.querySelector('textarea') as HTMLTextAreaElement)?.value;

      if (!selectedFile && !textInput && activeInputTab === 'upload') {
        throw new Error('Please upload a file or switch input methods.');
      }

      const result = await processMultimodalInput({
        file: selectedFile,
        textInput,
        toolId: tool?.id || ''
      });
      
      setExtractedData(result);
      setHasResult(true);
    } catch (err: any) {
      setApiError(err.message || 'An error occurred during extraction');
    } finally {
      setIsProcessing(false);
    }
  };

  const getLoadingText = () => {
    if (tool?.id === 'youtube-to-transcript') return "Transcribing video & generating takeaways...";
    if (tool?.id === 'handwriting-to-text') return "Reading handwriting & extracting script...";
    return "Extracting structured financial data...";
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelection(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelection(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleFileSelection = (file: File) => {
    setSelectedFile(file);
    if (file.type.startsWith('image/')) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null); // PDF or other
    }
    setHasResult(false);
  };

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent clicking dropzone
    setSelectedFile(null);
    setPreviewUrl(null);
    setHasResult(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDownload = (content: string, type: string, extension: string) => {
    if (!content) return;
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lunair_extract_${Date.now()}.${extension}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadCsv = () => {
    if (!extractedData?.line_items) return;
    
    let csv = "Item Description,Qty,Unit Price,Total\n";
    
    extractedData.line_items.forEach((item: any) => {
      const desc = `"${(item.description || '').replace(/"/g, '""')}"`;
      csv += `${desc},${item.quantity || 1},${item.unit_price || 0},${item.line_total || 0}\n`;
    });
    
    csv += `\nSubtotal,,,${extractedData.financial_summary?.subtotal || 0}\n`;
    csv += `Tax / VAT,,,${extractedData.financial_summary?.tax_or_vat || 0}\n`;
    csv += `Total,,,${extractedData.financial_summary?.grand_total || 0}\n`;
    
    handleDownload(csv, 'text/csv', 'csv');
  };

  const [copied, setCopied] = useState(false);
  const handleCopy = (content: string) => {
    if (!content) return;
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black flex flex-col">
      {/* 1. Header & Global Controls Bar */}
      <header className="border-b border-[#1A1A1A] bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Left: Navigation */}
          <div className="flex items-center gap-6">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              All Tools
            </button>
            <div className="hidden sm:block w-px h-4 bg-zinc-800"></div>
            <img 
              src="/images/logo/logo.png" 
              alt="LUNAIR" 
              className="h-6 w-auto mix-blend-screen opacity-90 hidden sm:block"
            />
          </div>

          {/* Center: Global Context Selectors */}
          <div className="flex items-center gap-3">
            <div className="group relative">
              <button className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#0A0A0A] border border-[#222222] hover:border-zinc-700 transition-colors text-xs text-zinc-300">
                <Globe className="w-3.5 h-3.5 text-zinc-500" />
                <span>Language: Auto</span>
                <ChevronDown className="w-3 h-3 text-zinc-600" />
              </button>
            </div>
            <div className="group relative">
              <button className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#0A0A0A] border border-[#222222] hover:border-zinc-700 transition-colors text-xs text-zinc-300">
                <DollarSign className="w-3.5 h-3.5 text-zinc-500" />
                <span>Currency: Auto</span>
                <ChevronDown className="w-3 h-3 text-zinc-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Workspace Layout (Split-Screen) */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
        
        {/* LEFT SIDE: Universal Input Engine */}
        <div className="flex flex-col gap-6">
          
          {/* Tool Title & Meta Header */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">{tool?.title || "Tool Workspace"}</h1>
              {tool?.badgeText && (
                <span className="px-2 py-0.5 rounded text-[10px] font-mono-tech tracking-wider border border-white/20 bg-white/5 text-white uppercase">
                  {tool.badgeText}
                </span>
              )}
            </div>
            <p className="text-zinc-400 text-sm max-w-md leading-relaxed">
              {tool?.description || "Extract structured data from your inputs."}
            </p>
          </div>

          {/* Input Panel Box */}
          <div className="flex-1 bg-[#050505] border border-[#1A1A1A] rounded-xl overflow-hidden flex flex-col min-h-[400px]">
            
            {/* Tabbed Input Options */}
            <div className="flex border-b border-[#1A1A1A] p-2 gap-2 bg-[#080808]">
              <button 
                onClick={() => setActiveInputTab('upload')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-medium rounded-lg transition-all ${activeInputTab === 'upload' ? 'bg-[#1A1A1A] text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300 hover:bg-[#111111]'}`}
              >
                <UploadCloud className="w-4 h-4" />
                File Upload
              </button>
              <button 
                onClick={() => setActiveInputTab('url')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-medium rounded-lg transition-all ${activeInputTab === 'url' ? 'bg-[#1A1A1A] text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300 hover:bg-[#111111]'}`}
              >
                <LinkIcon className="w-4 h-4" />
                URL / Link
              </button>
              <button 
                onClick={() => setActiveInputTab('text')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-medium rounded-lg transition-all ${activeInputTab === 'text' ? 'bg-[#1A1A1A] text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300 hover:bg-[#111111]'}`}
              >
                <Type className="w-4 h-4" />
                Raw Text
              </button>
            </div>

            {/* Input Content Area */}
            <div className="p-6 flex-1 flex flex-col justify-center">
              {activeInputTab === 'upload' && (
                <div 
                  className={`border-2 border-dashed ${selectedFile ? 'border-zinc-700 bg-[#0A0A0A]' : 'border-[#222222] hover:border-[#444444] hover:bg-[#0C0C0C]'} transition-colors rounded-xl flex flex-col items-center justify-center h-64 cursor-pointer group relative overflow-hidden`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onClick={() => !selectedFile && fileInputRef.current?.click()}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    className="hidden" 
                    accept="image/png, image/jpeg, image/webp, application/pdf"
                    onChange={handleFileChange}
                  />

                  {selectedFile ? (
                    <div className="w-full h-full flex items-center p-6 gap-6">
                      <div className="w-24 h-24 rounded-lg overflow-hidden bg-[#111111] border border-[#222222] flex-shrink-0 flex items-center justify-center relative group/img">
                        {previewUrl ? (
                           <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                           <FileText className="w-8 h-8 text-zinc-600" />
                        )}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                           <button onClick={handleRemoveFile} className="p-2 bg-red-500/20 text-red-400 rounded-full hover:bg-red-500/30 transition-colors">
                              <X className="w-4 h-4" />
                           </button>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                         <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-mono-tech text-emerald-400 border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 rounded tracking-wider">FILE LOADED</span>
                            <button onClick={handleRemoveFile} className="text-xs text-zinc-500 hover:text-white transition-colors flex items-center gap-1">
                               <X className="w-3 h-3" /> Remove
                            </button>
                         </div>
                         <h4 className="text-sm font-medium text-white truncate max-w-full mt-2" title={selectedFile.name}>{selectedFile.name}</h4>
                         <p className="text-xs text-zinc-500 mt-1">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • {selectedFile.type || 'Unknown'}</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="w-12 h-12 rounded-full bg-[#111111] border border-[#222222] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        {tool?.id === 'handwriting-to-text' ? <FileSignature className="w-5 h-5 text-zinc-400 group-hover:text-white" /> : <UploadCloud className="w-5 h-5 text-zinc-400 group-hover:text-white" />}
                      </div>
                      <p className="text-sm font-medium text-zinc-300 mb-1">
                        Drop files here or click to browse
                      </p>
                      <p className="text-xs text-zinc-600">
                        Supports {tool?.inputFormat || "PNG, JPG, PDF"} (Max 50MB)
                      </p>
                    </>
                  )}
                </div>
              )}
              
              {activeInputTab === 'url' && (
                <div className="h-64 flex flex-col justify-center">
                  <label className="text-xs text-zinc-500 font-medium mb-2 uppercase tracking-wider block">Resource URL</label>
                  <input 
                    type="url" 
                    placeholder={tool?.id === 'youtube-to-transcript' ? "https://youtube.com/watch?v=..." : "https://example.com/document.pdf"}
                    className="w-full bg-[#0A0A0A] border border-[#222222] focus:border-white focus:ring-1 focus:ring-white rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-700 outline-none transition-all"
                  />
                </div>
              )}

              {activeInputTab === 'text' && (
                <div className="h-64 flex flex-col justify-center">
                  <label className="text-xs text-zinc-500 font-medium mb-2 uppercase tracking-wider block">Raw Text Input</label>
                  <textarea 
                    placeholder="Paste your unstructured text here..." 
                    className="w-full h-full resize-none bg-[#0A0A0A] border border-[#222222] focus:border-white focus:ring-1 focus:ring-white rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-700 outline-none transition-all"
                  ></textarea>
                </div>
              )}
            </div>

            {/* Primary Action CTA */}
            <div className="p-4 border-t border-[#1A1A1A] bg-[#050505]">
              <button 
                onClick={handleProcess}
                disabled={isProcessing}
                className="w-full py-3.5 rounded-lg bg-white text-black font-semibold text-sm hover:bg-zinc-200 active:bg-zinc-300 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 relative overflow-hidden group"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                    {getLoadingText()}
                  </>
                ) : (
                  <>
                    Extract & Process
                    <div className="absolute inset-0 bg-black/[0.03] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Global Output Engine */}
        <div className="flex flex-col gap-6 h-full">
          
          <div className="flex items-end justify-between mb-2 pb-1">
             <h2 className="text-lg font-medium tracking-tight text-white flex items-center gap-2">
               {tool?.id === 'youtube-to-transcript' ? 'Transcript & Summary Output' : 'Output Result'}
             </h2>
             
             {/* Tool-specific Download Buttons */}
             <div className={`flex items-center gap-2 ${hasResult ? '' : 'opacity-50 pointer-events-none'}`}>
               {tool?.id === 'youtube-to-transcript' ? (
                 <>
                   <button 
                     onClick={() => handleDownload(extractedData?.transcript, 'text/plain', 'srt')}
                     className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#111111] hover:bg-[#1A1A1A] border border-[#222222] transition-colors text-xs text-zinc-300"
                   >
                     <Download className="w-3.5 h-3.5" /> .SRT
                   </button>
                   <button 
                     onClick={() => handleDownload(extractedData?.transcript, 'text/plain', 'txt')}
                     className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#111111] hover:bg-[#1A1A1A] border border-[#222222] transition-colors text-xs text-zinc-300"
                   >
                     <Download className="w-3.5 h-3.5" /> .TXT
                   </button>
                 </>
               ) : tool?.id === 'handwriting-to-text' ? (
                 <>
                   <button 
                     onClick={() => handleDownload(extractedData?.formatted_text, 'text/markdown', 'md')}
                     className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#111111] hover:bg-[#1A1A1A] border border-[#222222] transition-colors text-xs text-zinc-300"
                   >
                     <Download className="w-3.5 h-3.5" /> .MD
                   </button>
                   <button 
                     onClick={() => handleDownload(extractedData?.formatted_text, 'text/plain', 'txt')}
                     className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#111111] hover:bg-[#1A1A1A] border border-[#222222] transition-colors text-xs text-zinc-300"
                   >
                     <Download className="w-3.5 h-3.5" /> .TXT
                   </button>
                   <button 
                     onClick={() => handleCopy(extractedData?.formatted_text)}
                     className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#111111] hover:bg-[#1A1A1A] border border-[#222222] transition-colors text-xs text-zinc-300"
                   >
                     <Copy className={`w-3.5 h-3.5 ${copied ? 'text-emerald-400' : ''}`} /> {copied ? 'Copied!' : 'Copy Text'}
                   </button>
                 </>
               ) : (
                 <>
                   <button 
                     onClick={handleDownloadCsv}
                     className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#111111] hover:bg-[#1A1A1A] border border-[#222222] transition-colors text-xs text-zinc-300"
                   >
                     <Download className="w-3.5 h-3.5" /> CSV
                   </button>
                   <button 
                     onClick={() => handleCopy(JSON.stringify(extractedData, null, 2))}
                     className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#111111] hover:bg-[#1A1A1A] border border-[#222222] transition-colors text-xs text-zinc-300"
                   >
                     <Copy className={`w-3.5 h-3.5 ${copied ? 'text-emerald-400' : ''}`} /> {copied ? 'Copied!' : 'JSON'}
                   </button>
                 </>
               )}
             </div>
          </div>

          <div className="flex-1 bg-[#050505] border border-[#1A1A1A] rounded-xl overflow-hidden flex flex-col relative min-h-[400px]">
            
            {apiError && (
              <div className="m-6 mb-0 p-4 rounded-lg bg-red-950/40 border border-red-900/50 flex items-start gap-3 relative z-10">
                <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-red-400">Processing Failed</h4>
                  <p className="text-xs text-red-300/80 mt-1">{apiError}</p>
                </div>
              </div>
            )}

            {isProcessing ? (
               // Loading Skeleton State
               <div className="flex-1 p-6 flex flex-col gap-5 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent skeleton-shimmer translate-x-[-100%]"></div>
                  
                  <div className="flex justify-between items-end border-b border-[#1A1A1A] pb-4">
                     <div className="space-y-2">
                        <div className="h-3 w-24 bg-[#1A1A1A] rounded"></div>
                        <div className="h-6 w-48 bg-[#222222] rounded"></div>
                     </div>
                     <div className="h-8 w-24 bg-[#1A1A1A] rounded"></div>
                  </div>
                  
                  <div className="space-y-4 pt-4">
                     {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex gap-4">
                           <div className="h-4 w-1/4 bg-[#1A1A1A] rounded"></div>
                           <div className="h-4 w-1/2 bg-[#151515] rounded"></div>
                           <div className="h-4 w-1/4 bg-[#1A1A1A] rounded"></div>
                        </div>
                     ))}
                  </div>
               </div>
            ) : (
              // Tool-Specific Views
              <div className="flex-1 overflow-auto p-6 scrollbar-thin scrollbar-thumb-[#222222] scrollbar-track-transparent">
                
                {tool?.id === 'youtube-to-transcript' && (
                  <div className="space-y-6">
                    {!hasResult && (
                      <div className="p-8 border-2 border-dashed border-[#222222] rounded-xl flex flex-col items-center justify-center text-center bg-[#0A0A0A]">
                        <Video className="w-8 h-8 text-zinc-700 mb-3" />
                        <p className="text-sm text-zinc-500">
                          Video transcript, takeaways, and summary will appear here after you click 'Extract & Process'.
                        </p>
                      </div>
                    )}

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xs font-mono-tech tracking-wider text-zinc-500 uppercase mb-3 flex items-center gap-2">
                          <FileText className="w-3.5 h-3.5" /> Executive Summary
                        </h3>
                        {hasResult ? (
                          <div className="p-5 border border-[#1A1A1A] rounded-lg bg-[#050505]">
                            <p className="text-sm leading-relaxed text-zinc-300">
                              {extractedData?.summary || 'No summary available.'}
                            </p>
                          </div>
                        ) : (
                          <div className="h-16 bg-[#0A0A0A] border border-[#1A1A1A] rounded-lg"></div>
                        )}
                      </div>

                      <div>
                        <h3 className="text-xs font-mono-tech tracking-wider text-zinc-500 uppercase mb-3">Key Takeaways</h3>
                        {hasResult ? (
                          <div className="p-5 border border-[#1A1A1A] rounded-lg bg-[#050505]">
                            <ul className="list-disc list-inside text-sm space-y-2 text-zinc-300">
                              {(extractedData?.takeaways || []).map((takeaway: string, idx: number) => (
                                <li key={idx}>{takeaway}</li>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          <div className="h-24 bg-[#0A0A0A] border border-[#1A1A1A] rounded-lg"></div>
                        )}
                      </div>

                      <div>
                        <h3 className="text-xs font-mono-tech tracking-wider text-zinc-500 uppercase mb-3">Timestamped Transcript</h3>
                        {hasResult ? (
                          <div className="p-5 border border-[#1A1A1A] rounded-lg bg-[#050505] max-h-96 overflow-y-auto font-mono text-xs whitespace-pre-wrap text-zinc-300 leading-relaxed scrollbar-thin scrollbar-thumb-[#222222]">
                            {extractedData?.transcript || 'No transcript extracted.'}
                          </div>
                        ) : (
                          <div className="h-48 bg-[#0A0A0A] border border-[#1A1A1A] rounded-lg"></div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {tool?.id === 'handwriting-to-text' && (
                  <div className="h-full flex flex-col space-y-4">
                    {/* Header Bar */}
                    <div className="flex items-center justify-between p-3 border border-[#1A1A1A] rounded-lg bg-[#050505]">
                      <span className="text-xs font-mono-tech tracking-wider text-zinc-500 uppercase">Script Language</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono-tech tracking-wider border ${hasResult ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400' : 'border-[#222222] bg-[#0A0A0A] text-zinc-400'}`}>
                        {hasResult ? (extractedData?.detected_script || 'Unknown') : 'Auto-Detected (Pending)'}
                      </span>
                    </div>

                    {!hasResult && (
                      <div className="p-8 border-2 border-dashed border-[#222222] rounded-xl flex flex-col items-center justify-center text-center bg-[#0A0A0A]">
                        <FileSignature className="w-8 h-8 text-zinc-700 mb-3" />
                        <p className="text-sm text-zinc-500">
                          Extracted markdown and structured text will appear here.
                        </p>
                      </div>
                    )}
                    
                    {/* Text Container Skeleton or Result */}
                    <div className="flex-1 min-h-[200px] bg-[#0A0A0A] border border-[#1A1A1A] rounded-lg p-6 flex flex-col">
                      {hasResult ? (
                        <div className="flex-1 font-mono text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed">
                          {extractedData?.formatted_text || 'No text extracted.'}
                        </div>
                      ) : (
                        <div className="flex-1 space-y-4 opacity-20">
                          <div className="h-6 w-1/3 bg-zinc-700 rounded"></div>
                          <div className="h-4 w-3/4 bg-zinc-700 rounded mt-6"></div>
                          <div className="h-4 w-1/2 bg-zinc-700 rounded"></div>
                          <div className="space-y-2 mt-4 ml-4">
                             <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-zinc-700"></div><div className="h-4 w-5/6 bg-zinc-700 rounded"></div></div>
                             <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-zinc-700"></div><div className="h-4 w-4/6 bg-zinc-700 rounded"></div></div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Footer Metadata */}
                    <div className="flex justify-end gap-4 text-[10px] font-mono text-zinc-600 px-1">
                      <span>Words: {hasResult ? (extractedData?.word_count || '--') : '--'}</span>
                      <span>Characters: {hasResult ? (extractedData?.formatted_text?.length || '--') : '--'}</span>
                    </div>
                  </div>
                )}

                {(tool?.id !== 'youtube-to-transcript' && tool?.id !== 'handwriting-to-text') && (
                  <div className="space-y-6">
                    {!hasResult && (
                      <div className="p-8 border-2 border-dashed border-[#222222] rounded-xl flex flex-col items-center justify-center text-center bg-[#0A0A0A]">
                        <TableIcon className="w-8 h-8 text-zinc-700 mb-3" />
                        <p className="text-sm text-zinc-500">
                          Parsed metadata and line-item tables will appear here.
                        </p>
                      </div>
                    )}
                    
                    <div>
                      <h3 className="text-xs font-mono-tech tracking-wider text-zinc-500 uppercase mb-3">Metadata</h3>
                      {hasResult ? (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          <div className="p-3 border border-[#1A1A1A] rounded-lg bg-[#050505]">
                            <div className="text-[10px] text-zinc-500 mb-1 uppercase tracking-wider">Date</div>
                            <div className="text-sm font-medium text-zinc-200">{extractedData?.metadata?.transaction_date || '--'}</div>
                          </div>
                          <div className="p-3 border border-[#1A1A1A] rounded-lg bg-[#050505]">
                            <div className="text-[10px] text-zinc-500 mb-1 uppercase tracking-wider">Merchant</div>
                            <div className="text-sm font-medium text-zinc-200 truncate" title={extractedData?.metadata?.merchant_or_entity}>{extractedData?.metadata?.merchant_or_entity || '--'}</div>
                          </div>
                          <div className="p-3 border border-[#1A1A1A] rounded-lg bg-[#050505]">
                            <div className="text-[10px] text-zinc-500 mb-1 uppercase tracking-wider">Total</div>
                            <div className="text-sm font-medium text-white">{extractedData?.metadata?.currency_symbol || '$'} {extractedData?.financial_summary?.grand_total || '0.00'}</div>
                          </div>
                          <div className="p-3 border border-[#1A1A1A] rounded-lg bg-[#050505]">
                            <div className="text-[10px] text-zinc-500 mb-1 uppercase tracking-wider">Confidence</div>
                            <div className="text-sm font-medium text-emerald-400">{extractedData?.metadata?.confidence_score ? `${(extractedData.metadata.confidence_score * 100).toFixed(1)}%` : '--'}</div>
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-16 bg-[#0A0A0A] border border-[#1A1A1A] rounded-lg"></div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div>
                      <h3 className="text-xs font-mono-tech tracking-wider text-zinc-500 uppercase mb-3">Line Items</h3>
                      {hasResult ? (
                        <div className="border border-[#1A1A1A] rounded-lg overflow-hidden">
                          <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="bg-[#111111] border-b border-[#1A1A1A] text-xs uppercase tracking-wider text-zinc-500">
                              <tr>
                                <th className="px-4 py-3 font-medium">Item Description</th>
                                <th className="px-4 py-3 font-medium text-right">Qty</th>
                                <th className="px-4 py-3 font-medium text-right">Unit Price</th>
                                <th className="px-4 py-3 font-medium text-right">Total</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1A1A1A] text-zinc-300">
                              {(extractedData?.line_items || []).map((item: any, i: number) => (
                                <tr key={i} className="hover:bg-[#111111]/50 transition-colors">
                                  <td className="px-4 py-3 truncate max-w-[200px]" title={item.description}>{item.description}</td>
                                  <td className="px-4 py-3 text-right">{item.quantity || 1}</td>
                                  <td className="px-4 py-3 text-right font-mono">{extractedData?.metadata?.currency_symbol || '$'}{item.unit_price?.toFixed(2) || '0.00'}</td>
                                  <td className="px-4 py-3 text-right font-mono text-white">{extractedData?.metadata?.currency_symbol || '$'}{item.line_total?.toFixed(2) || '0.00'}</td>
                                </tr>
                              ))}
                              {(!extractedData?.line_items || extractedData.line_items.length === 0) && (
                                <tr>
                                  <td colSpan={4} className="px-4 py-6 text-center text-zinc-500">No line items extracted.</td>
                                </tr>
                              )}
                            </tbody>
                            <tfoot className="bg-[#050505] border-t border-[#222222]">
                                <tr>
                                  <td colSpan={3} className="px-4 py-3 text-right text-xs text-zinc-500 uppercase tracking-wider">Subtotal</td>
                                  <td className="px-4 py-3 text-right font-mono text-zinc-300">{extractedData?.metadata?.currency_symbol || '$'}{extractedData?.financial_summary?.subtotal?.toFixed(2) || '0.00'}</td>
                                </tr>
                                <tr>
                                  <td colSpan={3} className="px-4 py-3 text-right text-xs text-zinc-500 uppercase tracking-wider">Tax / VAT</td>
                                  <td className="px-4 py-3 text-right font-mono text-zinc-300">{extractedData?.metadata?.currency_symbol || '$'}{extractedData?.financial_summary?.tax_or_vat?.toFixed(2) || '0.00'}</td>
                                </tr>
                                <tr className="border-t border-[#1A1A1A]">
                                  <td colSpan={3} className="px-4 py-4 text-right text-sm font-medium text-white">Total</td>
                                  <td className="px-4 py-4 text-right font-mono text-emerald-400 font-medium text-base">{extractedData?.metadata?.currency_symbol || '$'}{extractedData?.financial_summary?.grand_total?.toFixed(2) || '0.00'}</td>
                                </tr>
                            </tfoot>
                          </table>
                        </div>
                      ) : (
                        <div className="border border-[#1A1A1A] rounded-lg overflow-hidden h-40 bg-[#0A0A0A]"></div>
                      )}
                    </div>
                  </div>
                )}

              </div>
            )}
          </div>
        </div>

      </main>

      {/* Required keyframe animation for the skeleton loading state */}
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .skeleton-shimmer {
          animation: shimmer 2s infinite linear;
        }
      `}</style>
    </div>
  );
};
