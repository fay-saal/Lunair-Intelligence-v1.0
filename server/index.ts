import express from 'express';
import cors from 'cors';
import { YoutubeTranscript } from 'youtube-transcript';
import ytdl from '@distube/ytdl-core';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from 'ffmpeg-static';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import os from 'os';
import 'dotenv/config';

// Point fluent-ffmpeg to the bundled static binary
if (ffmpegPath) {
  ffmpeg.setFfmpegPath(ffmpegPath);
}

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

// Format milliseconds to MM:SS
const formatTimestamp = (ms: number) => {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `[${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}]`;
};

// Format seconds to MM:SS
const formatSeconds = (sec: number) => {
  const minutes = Math.floor(sec / 60);
  const seconds = Math.floor(sec % 60);
  return `[${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}]`;
};

app.post('/api/youtube/transcript', async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  console.log(`Processing URL: ${url}`);
  try {
    console.log(`Attempting fast path (fetching captions)...`);
    // Fast path: try fetching captions
    const transcript = await YoutubeTranscript.fetchTranscript(url);
    
    // Group small chunks into logical sentences/paragraphs to avoid spammy timestamps
    let formattedTranscript = '';
    let currentLine = '';
    let startTime = 0;
    
    transcript.forEach((item, index) => {
      if (currentLine === '') startTime = item.offset;
      currentLine += (currentLine ? ' ' : '') + item.text;
      
      // If the line is getting long or it ends with punctuation, flush it
      if (currentLine.length > 80 || /[.!?]$/.test(item.text.trim()) || index === transcript.length - 1) {
        // Fix encoded html entities like &amp; &quot; &#39;
        const decodedLine = currentLine
          .replace(/&amp;/g, '&')
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'");
        formattedTranscript += `${formatTimestamp(startTime)} ${decodedLine}\n`;
        currentLine = '';
      }
    });

    console.log(`Fast path successful.`);
    return res.json({ transcript: formattedTranscript, source: 'captions' });
  } catch (err: any) {
    console.log(`Fast path failed: ${err.message}. Whisper fallback is currently disabled.`);
    
    const WHISPER_FALLBACK_ENABLED = true;
    
    if (!WHISPER_FALLBACK_ENABLED) {
      return res.status(400).json({ error: 'This video doesn\'t have captions available — please try a different video' });
    }

    // Fallback path: download audio and use Whisper API
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ 
        error: 'YouTube captions are disabled for this video, and OPENAI_API_KEY is not configured for fallback transcription.' 
      });
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const tempFilePath = path.join(os.tmpdir(), `audio-${Date.now()}.mp3`);

    try {
      if (!ytdl.validateURL(url)) {
        throw new Error('Invalid YouTube URL');
      }

      console.log(`Downloading audio to ${tempFilePath}...`);
      const stream = ytdl(url, { filter: 'audioonly' });
      
      // Prevent unhandled 'error' event from crashing the server
      stream.on('error', (streamErr) => {
        console.error('ytdl stream error:', streamErr.message);
      });

      await new Promise((resolve, reject) => {
        ffmpeg(stream)
          .audioBitrate(64)
          .setDuration(1800) // Limit to 30 mins to avoid OpenAI 25MB limit (30m @ 64kbps = ~14MB)
          .save(tempFilePath)
          .on('end', resolve)
          .on('error', reject);
      });

      console.log(`Audio downloaded. Sending to Whisper API...`);
      const transcription = await openai.audio.transcriptions.create({
        file: fs.createReadStream(tempFilePath),
        model: "whisper-1",
        response_format: "verbose_json",
        timestamp_granularities: ["segment"]
      });

      let formattedTranscript = '';
      if (transcription.segments) {
        transcription.segments.forEach((segment: any) => {
          formattedTranscript += `${formatSeconds(segment.start)} ${segment.text.trim()}\n`;
        });
      } else {
        formattedTranscript = transcription.text; // fallback if segments missing
      }

      console.log(`Whisper transcription successful.`);
      return res.json({ transcript: formattedTranscript, source: 'whisper' });
    } catch (fallbackErr: any) {
      console.error(`Fallback failed:`, fallbackErr);
      
      // Catch ffmpeg missing error in serverless environments
      if (fallbackErr.message && fallbackErr.message.includes('ENOENT') && fallbackErr.message.includes('ffmpeg')) {
         return res.status(400).json({ error: 'This video doesn\'t have captions available. (Note: Audio transcription fallback is disabled in Netlify serverless environments).' });
      }
      
      return res.status(500).json({ error: `Failed to process video: ${fallbackErr.message}` });
    } finally {
      if (fs.existsSync(tempFilePath)) {
        fs.unlinkSync(tempFilePath);
      }
    }
  }
});

import multer from 'multer';
const upload = multer({ dest: os.tmpdir() });

app.post('/api/audio/transcript', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Audio/Video file is required' });
  }

  try {
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: 'OPENAI_API_KEY is not configured.' });
    }
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    
    // Whisper limit is 25MB. If file is larger, we would need to trim, but for simplicity let's assume it fits or send to ffmpeg first.
    // For local files, we will compress to low bitrate audio if it's large.
    const tempFilePath = req.file.path;
    const finalAudioPath = tempFilePath + '.mp3';

    console.log(`Compressing uploaded file to fit Whisper API...`);
    await new Promise((resolve, reject) => {
      ffmpeg(tempFilePath)
        .audioBitrate(64)
        .setDuration(1800) // 30 mins
        .save(finalAudioPath)
        .on('end', resolve)
        .on('error', reject);
    });

    console.log(`File compressed. Sending to Whisper API...`);
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(finalAudioPath),
      model: "whisper-1",
      response_format: "verbose_json",
      timestamp_granularities: ["segment"]
    });

    let formattedTranscript = '';
    if (transcription.segments) {
      transcription.segments.forEach((segment: any) => {
        formattedTranscript += `${formatSeconds(segment.start)} ${segment.text.trim()}\n`;
      });
    } else {
      formattedTranscript = transcription.text;
    }

    // Cleanup
    if (fs.existsSync(tempFilePath)) fs.unlinkSync(tempFilePath);
    if (fs.existsSync(finalAudioPath)) fs.unlinkSync(finalAudioPath);

    return res.json({ transcript: formattedTranscript, source: 'whisper_file' });
  } catch (err: any) {
    console.error(`File processing failed:`, err);
    if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
    
    if (err.message && err.message.includes('ENOENT') && err.message.includes('ffmpeg')) {
       return res.status(400).json({ error: 'Audio extraction requires ffmpeg, which is disabled in Netlify serverless environments. Please run locally.' });
    }

    return res.status(500).json({ error: `Failed to process uploaded file: ${err.message}` });
  }
});

export const handler = app;

if (import.meta.url === `file://${process.argv[1]}`) {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
  });
}
