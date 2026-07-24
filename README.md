<div align="center">

# Lunair Intelligence v1.0

**High-performance, single-purpose AI micro-utilities. Designed for speed, privacy, and precision.**

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8.1-646CFF?logo=vite&logoColor=white)](https://vite.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Gemini API](https://img.shields.io/badge/Gemini_API-v1beta-8E75B2?logo=google&logoColor=white)](https://ai.google.dev)
[![Whisper API](https://img.shields.io/badge/Whisper_API-v1-412991?logo=openai&logoColor=white)](https://openai.com)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[![Repository](https://img.shields.io/badge/▲_Repository-000?logo=github&logoColor=white)](https://github.com/fay-saal/Lunair-Intelligence-v1.0)
[![Issues](https://img.shields.io/badge/◉_Issues-000?logo=github&logoColor=white)](https://github.com/fay-saal/Lunair-Intelligence-v1.0/issues)

---

```diff
+ $ lunair process receipt.jpg
+   Extracting structured data...
+   Vendor: Blue Bottle Coffee
+   Date: 2026-07-23
+   Items: 3 line items detected
+   Total: $18.50
+   Confidence: 97.2%
+ ✓ Extraction complete — 142ms
```

</div>

---

## `> overview`

---

Most AI tools try to do everything. They're bloated, slow, and leak your data to fifteen different third-party services.

**Lunair takes the opposite approach.** Each micro-tool does exactly one thing — takes a single input, runs it through a precision-tuned AI pipeline, and delivers structured output. No accounts. No data retention. No bloat.

The architecture follows a strict **Single Input → Single Output** paradigm: one file in, one structured result out. Every tool is a self-contained utility designed to be fast enough for production workflows.

No dashboard hell. No subscription tiers. Just tools that work.

---

## `> live tools`

---

| Tool | Input | Output | Engine | Status |
|:-----|:------|:-------|:-------|:------:|
| **Receipt → Spreadsheet** | JPG, PNG, PDF | CSV, JSON | Gemini 3.5 Flash | ✅ Live |
| **Handwriting → Text** | JPG, PNG, WEBP | Markdown, TXT | Gemini 3.5 Flash | ✅ Live |
| **YouTube → Transcriber** | YouTube URL, Audio | Transcript, Summary, Takeaways | Captions + Whisper + Gemini | ✅ Live |

### coming soon

| Tool | Input | Output | Status |
|:-----|:------|:-------|:------:|
| **Voice → Minutes** | MP3, WAV, M4A | Meeting notes, Action items | 🔜 v1.1 |
| **Background Cleaner** | JPG, WEBP, PNG | PNG (Alpha), SVG | 🔜 v1.1 |
| **Doc → Summary** | PDF, DOCX | Bullet points, TL;DR | 🔜 v1.2 |

---

## `> architecture`

---

```
┌─────────────────────────────────────────────────────────────┐
│                    LUNAIR INTELLIGENCE                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────┐    ┌──────────────┐    ┌──────────────────┐   │
│  │  Client   │───▶│  Vite Proxy  │───▶│  Express Backend │   │
│  │  React 19 │    │  /api → :3001│    │  Port 3001       │   │
│  └──────────┘    └──────────────┘    └────────┬─────────┘   │
│       │                                       │             │
│       │                                       ├─▶ youtube-transcript (captions)
│       │                                       ├─▶ ytdl-core → ffmpeg → Whisper API
│       │                                       └─▶ multer (file uploads)
│       │                                                     │
│       ▼                                                     │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Gemini API (v1beta)                      │   │
│  │  ┌────────────┐  ┌──────────────┐  ┌──────────────┐  │   │
│  │  │ Receipt OCR│  │Handwriting   │  │YouTube Intel │  │   │
│  │  │ Prompt     │  │OCR Prompt    │  │Prompt        │  │   │
│  │  └────────────┘  └──────────────┘  └──────────────┘  │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Frontend** — React 19 + TypeScript + Tailwind CSS 4 + Framer Motion. Pitch-black, high-contrast design system inspired by Vercel/Linear. Glassmorphism navbar, 3D parallax hero, bento grid layout, micro-animations throughout.

**Backend** — Lightweight Express server handling YouTube audio downloads and file uploads. Runs alongside Vite via `concurrently`.

**AI Pipeline** — Gemini 3.5 Flash for OCR and text intelligence. OpenAI Whisper for speech-to-text fallback when YouTube captions are unavailable.

---

## `> quickstart`

---

### prerequisites

- **Node.js** 18+ 
- **npm** 9+
- A **Gemini API key** ([get one free](https://aistudio.google.com/apikey))
- An **OpenAI API key** ([get one here](https://platform.openai.com/api-keys)) — only needed for YouTube videos without captions

### setup

```bash
# clone
git clone https://github.com/fay-saal/Lunair-Intelligence-v1.0.git
cd Lunair-Intelligence-v1.0

# install dependencies
npm install

# configure environment
cp .env.example .env
# then edit .env and add your API keys:
#   VITE_GEMINI_API_KEY=your_gemini_key
#   OPENAI_API_KEY=your_openai_key

# run (starts both Vite frontend + Express backend)
npm run dev
```

Open **http://localhost:5173** — you're live.

---

## `> project structure`

---

```
lunair-intelligence/
├── server/
│   └── index.ts              # Express backend (YouTube + audio endpoints)
├── src/
│   ├── components/
│   │   ├── ui/               # Aceternity/Magic UI primitives
│   │   │   ├── background-beams.tsx
│   │   │   ├── border-beam.tsx
│   │   │   ├── shimmer-button.tsx
│   │   │   └── spotlight.tsx
│   │   ├── workspace/
│   │   │   └── ToolWorkspace.tsx   # Universal input/output engine
│   │   ├── Hero.tsx           # 3D parallax kinetic hero
│   │   ├── Navbar.tsx         # Glassmorphism floating dock
│   │   ├── ToolCard.tsx       # Bento grid cards with spotlight
│   │   ├── ToolGrid.tsx       # Responsive bento layout
│   │   └── ToolModal.tsx      # Live playground drawer
│   ├── data/
│   │   └── tools.ts           # Tool registry & metadata
│   ├── prompts/
│   │   ├── receipt-ocr.ts     # Financial extraction prompt
│   │   ├── handwriting-ocr.ts # Script recognition prompt
│   │   └── youtube.ts         # Video intelligence prompt
│   ├── services/
│   │   ├── gemini.ts          # Gemini API client + model fallback
│   │   └── youtube.ts         # YouTube/audio transcript client
│   └── types/
│       └── tool.ts            # TypeScript interfaces
├── public/
│   └── images/logo/           # Brand assets
├── .env.example               # Environment template
├── vite.config.ts             # Vite + API proxy config
├── package.json
└── LICENSE
```

---

## `> tech stack`

---

[![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite_8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Gemini](https://img.shields.io/badge/Gemini_API-8E75B2?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev)
[![OpenAI](https://img.shields.io/badge/Whisper_API-412991?style=for-the-badge&logo=openai&logoColor=white)](https://openai.com)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com)

---

## `> environment variables`

---

| Variable | Required | Description |
|:---------|:--------:|:------------|
| `VITE_GEMINI_API_KEY` | ✅ | Google Gemini API key for OCR and text intelligence |
| `OPENAI_API_KEY` | ⚡ | OpenAI API key — only needed for YouTube Whisper fallback |

> **⚠️ Security:** The `.env` file is gitignored. Never commit API keys. Use `.env.example` as a template.

---

## `> status`

---

> v1.0, initial release. Core tools (Receipt OCR, Handwriting OCR, YouTube Transcriber) are functional end-to-end. UI design system is complete with Awwwards-grade aesthetics. Backend handles YouTube caption scraping and Whisper API fallback — issues/PRs welcome.

---

## `> license`

---

MIT © 2026 Faysal ([DieBack Theatre](https://github.com/fay-saal))

---

## 🔗 `> links`

---

- **Repository:** [github.com/fay-saal/Lunair-Intelligence-v1.0](https://github.com/fay-saal/Lunair-Intelligence-v1.0)
- **Issues:** [github.com/fay-saal/Lunair-Intelligence-v1.0/issues](https://github.com/fay-saal/Lunair-Intelligence-v1.0/issues)

---

<div align="center">

Built with ⚡ by [DieBack Theatre](https://github.com/fay-saal)

</div>
