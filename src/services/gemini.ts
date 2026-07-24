import { HANDWRITING_OCR_PROMPT } from '../prompts/handwriting-ocr';
import { FINANCIAL_OCR_PROMPT } from '../prompts/receipt-ocr';
import { YOUTUBE_INTELLIGENCE_PROMPT } from '../prompts/youtube';
import { getYoutubeTranscript, getAudioTranscript } from './youtube';



export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = (reader.result as string).split(',')[1];
      resolve(base64String);
    };
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
};

interface ProcessInputArgs {
  file: File | null;
  textInput: string | null;
  toolId: string;
}

export const processMultimodalInput = async ({ file, textInput, toolId }: ProcessInputArgs) => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('VITE_GEMINI_API_KEY is not configured');
  }

  let systemInstructionText = '';
  if (toolId === 'handwriting-to-text') systemInstructionText = HANDWRITING_OCR_PROMPT;
  else if (toolId === 'youtube-to-transcript') systemInstructionText = YOUTUBE_INTELLIGENCE_PROMPT;
  else systemInstructionText = FINANCIAL_OCR_PROMPT;

  const contentsParts: any[] = [];
  let transcript = '';

  if (toolId === 'youtube-to-transcript') {
    // If it's a URL, fetch transcript from backend
    if (textInput && textInput.includes('http')) {
      // Extract URL from "URL to process: https://..."
      const urlMatch = textInput.match(/https?:\/\/[^\s]+/);
      if (urlMatch) {
        const transcriptData = await getYoutubeTranscript(urlMatch[0]);
        transcript = transcriptData.transcript;
      }
    } 
    // If it's a file, fetch transcript from audio backend
    else if (file) {
      const transcriptData = await getAudioTranscript(file);
      transcript = transcriptData.transcript;
    } 
    // If it's raw text
    else if (textInput) {
      transcript = textInput;
    }

    if (!transcript) {
      throw new Error('Failed to obtain a transcript from the provided input.');
    }

    contentsParts.push({ text: `Here is the transcript:\n\n${transcript}\n\nPlease generate the Executive Summary and Key Takeaways.` });
  } else {
    // Original logic for other tools
    if (file) {
      const base64Data = await fileToBase64(file);
      contentsParts.push({
        inlineData: {
          mimeType: file.type,
          data: base64Data
        }
      });
    }

    if (textInput) {
      contentsParts.push({
        text: textInput
      });
    }
  }
  
  if (contentsParts.length === 0) {
    contentsParts.push({ text: "Please process this request according to your system instructions." });
  }

  const payload = {
    systemInstruction: {
      parts: [{ text: systemInstructionText }]
    },
    contents: [{
      parts: contentsParts
    }],
    generationConfig: {
      responseMimeType: "application/json",
      temperature: 0.1
    }
  };

  const modelsToTry = [
    'gemini-3.5-flash',
    'gemini-flash-latest',
    'gemini-3.6-flash',
    'gemini-2.0-flash',
    'gemini-3.1-flash-lite'
  ];

  let lastError = null;

  for (const model of modelsToTry) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `Failed with ${model}`);
      }

      const data = await response.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!rawText) throw new Error('No valid response received from Gemini');

      const result = JSON.parse(rawText);
      if (toolId === 'youtube-to-transcript') {
        result.transcript = transcript;
      }
      return result;
    } catch (err: any) {
      console.warn(`Model ${model} failed:`, err.message);
      lastError = err;
      // If it's an API key error, don't keep looping
      if (err.message.includes('API_KEY_INVALID')) {
        break;
      }
    }
  }

  throw new Error(lastError?.message || 'All available Gemini AI models are currently overloaded. Please try again later.');
};
