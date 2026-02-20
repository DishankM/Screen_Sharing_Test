# Screen Share Test App

A React + Vite + Tailwind application that validates browser screen-sharing behavior using native Web APIs.

## Setup

1. Install dependencies:
```bash
npm install
```
2. Run locally:
```bash
npm run dev
```
3. Build for production:
```bash
npm run build
```
4. Preview production build:
```bash
npm run preview
```

## Screen-Sharing Flow

1. Homepage (`/`) checks `navigator.mediaDevices.getDisplayMedia` support.
2. Clicking **Start Screen Test** navigates to `/screen-test` only if supported.
3. Starting screen share requests:
```js
navigator.mediaDevices.getDisplayMedia({
  video: { frameRate: { ideal: 30 } },
  audio: false
})
```
4. The app surfaces explicit states:
- `REQUESTING`
- `ACTIVE` (permission granted / stream active)
- `CANCELLED` (picker cancelled)
- `DENIED` (permission denied)
- `ERROR` (unknown failure)
- `STOPPED` (track ended or manual stop)
- `UNSUPPORTED`
5. During active sharing, local preview is rendered in a `<video>` element and metadata is read from `track.getSettings()` (resolution + display type + frame rate).
6. Lifecycle is detected via `track.onended`; when ended, tracks are released and the video element is cleared.
7. Retry always requests a fresh `getDisplayMedia` session and does not reuse old streams.

## Architecture

- `src/hooks/useScreenShare.js`: all media logic (request, errors, lifecycle, cleanup, retry).
- `src/pages/HomePage.jsx`: capability gate and navigation trigger.
- `src/pages/ScreenTestPage.jsx`: state-driven UI for all outcomes.
- Stateless reusable UI components:
  - `src/components/Button.jsx`
  - `src/components/VideoPreview.jsx`
  - `src/components/MetadataPanel.jsx`
  - `src/components/StatusBadge.jsx`

## Screenshots

Add screenshots from real browser runs here:

- `docs/screenshots/home.png`
- `docs/screenshots/requesting.png`
- `docs/screenshots/active-preview.png`
- `docs/screenshots/stopped.png`

## Known Limitations / Browser Quirks

- Best supported in Chromium-based browsers (Chrome, Edge).
- Exact error mapping can vary by browser/version; most picker cancellations return `AbortError`, while explicit denial often returns `NotAllowedError`.
- `displaySurface` and some settings can be missing in specific environments; UI falls back to `Unknown`.
- Mobile browsers commonly do not support `getDisplayMedia`.

## Deployment

Deploy the Vite build output (`dist/`) to any static host (Netlify, Vercel, GitHub Pages with SPA fallback).
