# 🧩 Build your portfolio with us

> A fully offline-capable **PWA Portfolio Builder** built with React + Vite.  
> Fill in your info → pick a theme → share your portfolio. No backend, no account needed.

**Created by [Md. Nabinur Islam Roni](https://github.com/)**

---

## ✨ Features

- 🎨 **20 handcrafted themes** — Noir, Ocean, Forest, Blush, Cyber, Amber, Royal, Rust, Mint, Midnight, Brutalist, Volcano, Aurora, Sakura, Golden, Stone, Neon, Arctic, Obsidian, Slate
- 📱 **PWA** — installable on mobile & desktop, works fully offline
- ⚡ **Live preview** — see changes instantly as you type
- 💾 **Auto-save** — data saved to localStorage automatically
- 📤 **Export / Import** JSON — backup and restore your portfolio
- 🖼️ **Photo upload** — upload your profile picture
- 🔗 **All social links** — GitHub, LinkedIn, Twitter/X, Website, Email, Phone
- 📋 **Full sections** — Skills, Experience, Projects, Education, Certifications, Languages
- 🖥️ **3 view modes** — Edit only | Split (editor + preview) | Preview only
- 📵 **No account** — everything stays in your browser

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# 1. Clone or unzip the project
cd portfolio-builder

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

Output goes to `dist/` — deploy to Netlify, Vercel, GitHub Pages, etc.

### Preview Production Build

```bash
npm run preview
```

---

## 📁 Project Structure

```
portfolio-builder/
├── public/                    # Static assets & PWA icons
│   ├── favicon.ico
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── apple-touch-icon.png
│   ├── pwa-64x64.png
│   ├── pwa-192x192.png
│   ├── pwa-512x512.png
│   ├── maskable-icon-512x512.png
│   ├── masked-icon.svg
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Top bar with view toggle & actions
│   │   ├── Editor.jsx          # Left panel — tabbed form editor
│   │   └── PortfolioPreview.jsx# Right panel — live portfolio render
│   ├── hooks/
│   │   ├── usePortfolio.js     # State management & localStorage
│   │   └── usePWA.js           # PWA install prompt & online status
│   ├── data/
│   │   ├── themes.js           # 20 theme definitions
│   │   └── defaults.js         # Default portfolio data shape
│   ├── App.jsx                 # Root layout
│   ├── main.jsx                # React entry point
│   └── index.css               # Global styles
├── index.html                  # HTML shell with meta tags & fonts
├── vite.config.js              # Vite + PWA plugin config
├── package.json
├── .gitignore
├── LICENSE
└── README.md
```

---

## 🎨 Themes (20 total)

| # | Name       | Style              |
|---|------------|--------------------|
| 1 | Noir       | Dark elegant gold  |
| 2 | Ocean      | Deep sea blue      |
| 3 | Forest     | Dark green nature  |
| 4 | Blush      | Dark pink romantic |
| 5 | Slate      | Clean light gray   |
| 6 | Cyber      | Neon cyan dark     |
| 7 | Amber      | Warm amber dark    |
| 8 | Royal      | Purple luxury dark |
| 9 | Rust       | Orange dark warm   |
|10 | Mint       | Fresh light green  |
|11 | Midnight   | Indigo dark soft   |
|12 | Brutalist  | Black & white raw  |
|13 | Volcano    | Deep red dark      |
|14 | Aurora     | Teal dark aurora   |
|15 | Sakura     | Light pink soft    |
|16 | Golden     | Rich gold dark     |
|17 | Stone      | Warm beige paper   |
|18 | Neon       | Magenta dark pop   |
|19 | Arctic     | Cool light blue    |
|20 | Obsidian   | Lime green dark    |

---

## 📱 PWA Installation

When you visit the deployed site:
- **Android**: Chrome will show "Add to Home Screen" banner
- **iOS**: Safari → Share → Add to Home Screen
- **Desktop**: Chrome/Edge shows install icon in address bar

The app works fully **offline** after first load.

---

## 🛠️ Tech Stack

- **React 18** — UI
- **Vite 5** — Build tool
- **vite-plugin-pwa** — Service worker & manifest
- **Workbox** — Offline caching strategy
- **localStorage** — Data persistence (no backend needed)
- **Google Fonts** — Typography

---

## 🚢 Deployment

### Netlify
```bash
npm run build
# Drag & drop the dist/ folder to netlify.com/drop
```

### Vercel
```bash
npm install -g vercel
vercel --prod
```

### GitHub Pages
```bash
npm run build
# Push dist/ contents to gh-pages branch
```

---

## 📄 License

MIT © 2025 **Md. Nabinur Islam Roni**

---

> Built with ❤️ using React + Vite + PWA
