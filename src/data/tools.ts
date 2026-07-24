import type { MicroTool } from '../types/tool';

export const MICRO_TOOLS: MicroTool[] = [
  {
    id: 'receipt-to-spreadsheet',
    title: 'Receipt → Spreadsheet',
    slug: 'receipt-to-spreadsheet',
    category: 'vision',
    description: 'Upload receipt photo or PDF scan. Instantly parse vendor, tax, line items, and total into structured CSV or Excel format.',
    iconName: 'Receipt',
    inputFormat: 'JPG, PNG, PDF',
    outputFormat: 'CSV, XLSX, JSON',
    isAvailable: true,
    featured: true,
    badgeText: 'POPULAR',
    estimatedTime: '0.6s',
    sampleData: {
      inputName: 'blue_bottle_coffee_receipt.jpg',
      inputType: 'image',
      inputPreview: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?auto=format&fit=crop&w=600&q=80',
      outputType: 'table',
      outputContent: [
        { item: 'Cold Brew Single Origin', qty: 2, unitPrice: '$6.50', total: '$13.00' },
        { item: 'Oat Milk Croissant', qty: 1, unitPrice: '$4.75', total: '$4.75' },
        { item: 'Subtotal', qty: 3, unitPrice: '-', total: '$17.75' },
        { item: 'State Sales Tax (8.875%)', qty: '-', unitPrice: '-', total: '$1.58' },
        { item: 'TOTAL', qty: '-', unitPrice: '-', total: '$19.33' }
      ]
    }
  },
  {
    id: 'handwriting-to-text',
    title: 'Universal Handwriting & Note Digitizer',
    slug: 'handwriting-to-text',
    category: 'vision',
    description: 'Convert handwritten notes, whiteboards, Khatas, and scribbles in any script (Bangla, English, CJK, Arabic, etc.) into clean Markdown text.',
    iconName: 'FileSignature',
    inputFormat: 'PNG, JPG, WEBP, PDF',
    outputFormat: 'Markdown, TXT',
    isAvailable: true,
    featured: true,
    badgeText: 'ACTIVE',
    estimatedTime: '0.9s',
    sampleData: {
      inputName: 'notebook_page_july.png',
      inputType: 'image',
      inputPreview: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=600&q=80',
      outputType: 'markdown',
      outputContent: `# Product Design Review - Q3

- **Core Objective**: Minimalist UI refresh with focus on pitch-black high contrast theme.
- **Action Items**:
  1. Simplify input pipeline to 1-click dropzone.
  2. Implement micro-animations for high-fashion tactile feedback.
  3. Prepare brand identity assets for companion apparel line.
- **Deadline**: August 1st release.`
    }
  },
  {
    id: 'youtube-to-transcript',
    title: 'YouTube → Transcriber',
    slug: 'youtube-to-transcript',
    category: 'audio',
    description: 'Paste any YouTube URL. Extract timestamped transcript, key takeaways, executive summary, and actionable highlights.',
    iconName: 'Video',
    inputFormat: 'YouTube URL',
    outputFormat: 'Transcript, PDF, VTT',
    isAvailable: true,
    featured: true,
    badgeText: 'FAST',
    estimatedTime: '1.2s',
    sampleData: {
      inputName: 'https://youtube.com/watch?v=lunair-keynote-2026',
      inputType: 'url',
      inputPreview: 'https://youtube.com/watch?v=lunair-keynote-2026',
      outputType: 'text',
      outputContent: `SUMMARY:
Design and engineering overview of Lunair Micro-AI Utilities toolkit.

KEY TIMESTAMPS:
00:00 - Introduction & Brand Philosophy
01:45 - High-Fashion Design System Architecture
04:20 - Single Input -> Single Output Utility Paradigm
08:10 - Preview of Companion Apparel Line & Digital Artifacts`
    }
  },
  {
    id: 'invoice-data-extractor',
    title: 'Invoice → Data Structurer',
    slug: 'invoice-data-extractor',
    category: 'document',
    description: 'Extract multi-page B2B invoice data including payment terms, IBAN/SWIFT, tax IDs, and line item breakdowns.',
    iconName: 'FileSpreadsheet',
    inputFormat: 'PDF, DOCX',
    outputFormat: 'JSON, Quickbooks CSV',
    isAvailable: false,
    badgeText: 'COMING SOON',
    estimatedTime: '1.1s'
  },
  {
    id: 'voice-memo-action-items',
    title: 'Voice Memo → Action Plan',
    slug: 'voice-memo-action-items',
    category: 'audio',
    description: 'Upload audio recording or raw voice memo. Convert audio into structured task lists, key decisions, and follow-ups.',
    iconName: 'Mic',
    inputFormat: 'MP3, M4A, WAV',
    outputFormat: 'Notion Format, Markdown',
    isAvailable: false,
    badgeText: 'COMING SOON',
    estimatedTime: '1.5s'
  },
  {
    id: 'pdf-table-to-csv',
    title: 'PDF Table → Clean CSV',
    slug: 'pdf-table-to-csv',
    category: 'document',
    description: 'Extract complex nested tables from multi-page financial statements and research papers without manual copy-paste errors.',
    iconName: 'Table',
    inputFormat: 'PDF',
    outputFormat: 'CSV, Excel, JSON',
    isAvailable: false,
    badgeText: 'COMING SOON',
    estimatedTime: '0.7s'
  },
  {
    id: 'mockup-to-spec',
    title: 'Screen Shot → Code Spec',
    slug: 'mockup-to-spec',
    category: 'vision',
    description: 'Drop any UI screenshot or web layout image to generate Tailwind CSS layout code, color tokens, and layout geometry.',
    iconName: 'Layout',
    inputFormat: 'PNG, Figma Export',
    outputFormat: 'JSX, Tailwind CSS',
    isAvailable: false,
    badgeText: 'COMING SOON',
    estimatedTime: '1.4s'
  },
  {
    id: 'background-cleaner',
    title: 'Product Image → Studio Clean',
    slug: 'background-cleaner',
    category: 'vision',
    description: 'High-definition object segmentation to convert raw product photos into studio-grade e-commerce assets with transparent backgrounds.',
    iconName: 'Aperture',
    inputFormat: 'JPG, WEBP, PNG',
    outputFormat: 'PNG (Alpha), SVG',
    isAvailable: false,
    badgeText: 'COMING SOON',
    estimatedTime: '0.9s'
  },
  {
    id: 'contract-risk-scanner',
    title: 'Contract → Clause Auditor',
    slug: 'contract-risk-scanner',
    category: 'document',
    description: 'Identify high-risk clauses, missing indemnities, and unusual termination terms in vendor contracts in seconds.',
    iconName: 'ShieldAlert',
    inputFormat: 'PDF, DOCX',
    outputFormat: 'Audit Report, PDF',
    isAvailable: false,
    badgeText: 'COMING SOON',
    estimatedTime: '1.8s'
  }
];

export const CATEGORIES = [
  { id: 'all', label: 'All Utilities', count: MICRO_TOOLS.length },
  { id: 'vision', label: 'Vision & OCR', count: MICRO_TOOLS.filter(t => t.category === 'vision').length },
  { id: 'document', label: 'Document & Text', count: MICRO_TOOLS.filter(t => t.category === 'document').length },
  { id: 'audio', label: 'Audio & Media', count: MICRO_TOOLS.filter(t => t.category === 'audio').length },
];
