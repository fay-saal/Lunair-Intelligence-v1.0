export type ToolCategory = 'all' | 'vision' | 'document' | 'audio' | 'data';

export interface ToolSample {
  inputName: string;
  inputType: 'image' | 'text' | 'url' | 'audio';
  inputPreview: string;
  outputType: 'table' | 'text' | 'json' | 'markdown';
  outputContent: any;
}

export interface MicroTool {
  id: string;
  title: string;
  slug: string;
  category: ToolCategory;
  description: string;
  iconName: string;
  inputFormat: string;
  outputFormat: string;
  isAvailable: boolean;
  featured?: boolean;
  badgeText?: string;
  estimatedTime: string;
  sampleData?: ToolSample;
}
