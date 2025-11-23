# Redax Sounds

A modern, offline-first Progressive Web App (PWA) for mixing and playing ambient sounds. Built with Vue 3 and Vite.

## Features

- 🎵 **Sound Mixing**: Play multiple sounds simultaneously to create your perfect ambiance.
- 💾 **Save & Load Mixes**: Save your favorite sound combinations and volume levels directly in your browser.
- 📱 **Responsive Design**: optimized for both desktop and mobile devices.
- 🔌 **Offline Capable**: Works without an internet connection once installed - all 24 sound files are cached locally!
- 🎨 **Modern UI**: Clean and intuitive interface.

## 🔌 Offline Functionality

**ZenMix works completely offline!** Once you visit the app for the first time, all sound files (~20MB) are automatically cached in your browser. This means:

- ✅ All 24 ambient sounds available offline
- ✅ No internet required after initial load
- ✅ Instant loading from cache
- ✅ Mix saving/loading works offline (localStorage)
- ✅ Automatic updates when online

**See [OFFLINE.md](OFFLINE.md) for detailed information about offline capabilities, testing, and troubleshooting.**

## Tech Stack

- **Framework**: [Vue 3](https://vuejs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **State Management**: [Pinia](https://pinia.vuejs.org/)
- **Audio Engine**: [Howler.js](https://howlerjs.com/)
- **PWA Support**: [Vite PWA Plugin](https://vite-pwa-org.netlify.app/)
- **Styling**: CSS / SCSS

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ZenMix
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173` (or the port shown in your terminal).

## Building for Production

To build the application for production:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Deployment

To deploy the application to GitHub Pages:

```bash
npm run deploy
```

This command will build the project and push the `dist` folder to the `gh-pages` branch.

You can view the deployed application at: [https://dewdad.github.io/ZenMix/](https://dewdad.github.io/ZenMix/)

## License

[MIT](LICENSE)
