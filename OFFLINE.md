# Offline Functionality Guide

## Overview

ZenMix is now a fully functional **Progressive Web App (PWA)** that works completely offline once the initial assets are cached. This means you can use the app without an internet connection and all 24 sound files will be available.

## How It Works

### Service Worker & Caching

The app uses a **Service Worker** to cache all necessary assets:

1. **Application Files**: HTML, CSS, JavaScript
2. **Sound Files**: All 24 `.webm` audio files (~20MB total)
3. **Images**: Icons and PWA assets
4. **Fonts**: Google Fonts (cached on first load)

### Caching Strategy

We use different caching strategies for different types of assets:

#### 1. **Precaching (Build-time)**
- All sound files are precached during the build process
- App shell (HTML, CSS, JS) is precached
- Icons and manifest files are precached

#### 2. **Runtime Caching**
- **Sound Files**: `CacheFirst` strategy
  - Cached for 1 year
  - Max 50 entries
  - Served from cache if available, fetched from network if not
  
- **Google Fonts**: `CacheFirst` strategy
  - Cached for 1 year
  - Ensures fonts work offline

### Configuration Details

**File Size Limit**: 5MB per file (configured in `vite.config.js`)
- This accommodates the largest sound files
- Total cache size: ~20MB for all sounds

**Cache Names**:
- `sound-files-cache`: Stores all `.webm` audio files
- `google-fonts-cache`: Stores Google Fonts CSS
- `gstatic-fonts-cache`: Stores Google Fonts files
- `workbox-precache`: Stores precached assets

## User Experience

### First Visit (Online)
1. User visits the app
2. Service Worker installs in the background
3. All assets are downloaded and cached
4. **Notification appears**: "✅ App ready to work offline! All sounds cached."
5. App is now fully functional offline

### Subsequent Visits (Offline)
1. User opens the app without internet
2. All assets load from cache instantly
3. All sounds play normally
4. Mix saving/loading works (uses localStorage)

### Updates
When a new version is deployed:
1. Service Worker detects new content
2. **Notification appears**: "🔄 New content available! Refresh to update."
3. User can refresh to get the latest version

## Testing Offline Mode

### Method 1: Browser DevTools
1. Open Chrome DevTools (F12)
2. Go to **Application** tab
3. Click **Service Workers** in the left sidebar
4. Check **Offline** checkbox
5. Reload the page - everything should still work!

### Method 2: Network Tab
1. Open Chrome DevTools (F12)
2. Go to **Network** tab
3. Change throttling to **Offline**
4. Reload the page

### Method 3: Airplane Mode
1. Enable airplane mode on your device
2. Open the app
3. Everything should work normally

## Technical Implementation

### Files Modified

1. **`vite.config.js`**
   - Added `maximumFileSizeToCacheInBytes: 5000000`
   - Added runtime caching for sound files
   - Configured Workbox with proper glob patterns

2. **`src/components/OfflineNotification.vue`** (NEW)
   - Registers the Service Worker
   - Shows notifications for offline ready and updates
   - Auto-hides after 5 seconds

3. **`src/App.vue`**
   - Integrated OfflineNotification component

### Service Worker Registration

The Service Worker is registered in `OfflineNotification.vue`:

```javascript
import { registerSW } from 'virtual:pwa-register';

const updateSW = registerSW({
  onOfflineReady() {
    // Show "ready for offline" notification
  },
  onNeedRefresh() {
    // Show "update available" notification
  }
});
```

## Deployment Considerations

### GitHub Pages
When deploying to GitHub Pages:
1. Run `npm run build`
2. Service Worker is generated automatically
3. All assets are precached
4. Deploy with `npm run deploy`

### Base URL
The app is configured with `base: '/ZenMix/'` in `vite.config.js` to work with GitHub Pages deployment at `https://dewdad.github.io/ZenMix/`

## Troubleshooting

### Service Worker Not Installing
1. Check browser console for errors
2. Ensure you're using HTTPS or localhost
3. Clear browser cache and reload

### Sounds Not Playing Offline
1. Check if all sounds were cached (DevTools > Application > Cache Storage)
2. Verify file size limits weren't exceeded
3. Check console for 404 errors

### Cache Not Updating
1. Unregister the old Service Worker (DevTools > Application > Service Workers)
2. Clear all caches (DevTools > Application > Clear storage)
3. Hard reload (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)

## Storage Usage

**Total Storage Required**: ~20-25MB
- Sound files: ~20MB
- App files: ~200KB
- Fonts: ~100KB
- Images: ~1MB

This is well within browser storage limits (typically 50MB+ per origin).

## Browser Compatibility

The PWA features work in:
- ✅ Chrome/Edge (full support)
- ✅ Firefox (full support)
- ✅ Safari (iOS 11.3+, macOS 11.3+)
- ✅ Opera (full support)

## Future Enhancements

Potential improvements for offline functionality:
1. **Background Sync**: Sync saved mixes when connection is restored
2. **Periodic Background Sync**: Update sound library automatically
3. **Push Notifications**: Notify users of new sounds
4. **Install Prompt**: Encourage users to install the PWA
5. **Update Strategy**: Implement "update on reload" for seamless updates

## Summary

✅ **Fully Offline**: All 24 sounds work without internet  
✅ **Fast Loading**: Assets cached for instant loading  
✅ **Auto-Updates**: New versions detected automatically  
✅ **User Feedback**: Clear notifications for offline status  
✅ **Persistent Storage**: Mixes saved in localStorage  
✅ **Production Ready**: Optimized for GitHub Pages deployment
