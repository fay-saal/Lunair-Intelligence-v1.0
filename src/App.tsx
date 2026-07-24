import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ToolGrid } from './components/ToolGrid';
import { HowItWorks } from './components/HowItWorks';
import { StudioVision } from './components/StudioVision';
import { ToolModal } from './components/ToolModal';
import { DesignSystemPreview } from './components/DesignSystemPreview';
import { Footer } from './components/Footer';
import { ToolWorkspace } from './components/workspace/ToolWorkspace';
import type { MicroTool } from './types/tool';

export function App() {
  const [selectedTool, setSelectedTool] = useState<MicroTool | null>(null);
  const [activeWorkspace, setActiveWorkspace] = useState<MicroTool | null>(null);
  const [isDesignSystemOpen, setIsDesignSystemOpen] = useState(false);

  // If a workspace is active, render it in full screen
  if (activeWorkspace) {
    return (
      <ToolWorkspace
        tool={activeWorkspace}
        onBack={() => setActiveWorkspace(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* Top Header Navbar */}
      <Navbar onOpenDesignSystem={() => setIsDesignSystemOpen(true)} />

      <main>
        {/* Hero Section with Quick Tool Launcher */}
        <Hero onSelectTool={(tool) => setActiveWorkspace(tool)} />

        {/* Dynamic Tool Grid Section */}
        <ToolGrid onSelectTool={(tool) => setActiveWorkspace(tool)} />

        {/* How It Works 3-Step Pipeline Section */}
        <HowItWorks />

        {/* Studio & Future Apparel Brand Teaser Section */}
        <StudioVision />
      </main>

      {/* Footer */}
      <Footer onOpenDesignSystem={() => setIsDesignSystemOpen(true)} />

      {/* Interactive Micro-Tool Playground Modal (Keep for preview if needed, or remove later) */}
      <ToolModal
        tool={selectedTool}
        onClose={() => setSelectedTool(null)}
      />

      {/* Design System Tokens Modal Showcase */}
      <DesignSystemPreview
        isOpen={isDesignSystemOpen}
        onClose={() => setIsDesignSystemOpen(false)}
      />
    </div>
  );
}

export default App;
