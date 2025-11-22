# Redax Sounds - Agent Guide

This document provides context and guidelines for AI agents working on the Redax Sounds project.

## Project Overview

Redax Sounds is a modern, offline-first Progressive Web App (PWA) for mixing and playing ambient sounds. It allows users to create custom soundscapes by layering different audio tracks and adjusting their volumes.

## Tech Stack

- **Framework**: Vue 3 (Composition API)
- **Build Tool**: Vite
- **State Management**: Pinia
- **Audio Engine**: Howler.js
- **PWA**: Vite PWA Plugin
- **Styling**: Vanilla CSS / SCSS

## Project Structure

- `src/components`: Vue components (UI elements).
- `src/stores`: Pinia stores for state management (e.g., audio state, mix persistence).
- `src/assets`: Static assets like images and icons.
- `public/sounds`: Audio files used in the application.
- `index.html`: Entry point.
- `vite.config.js`: Vite configuration.

## Key Features

- **Sound Mixing**: Simultaneous playback of multiple audio tracks.
- **Persistence**: Saving and loading mixes using browser storage.
- **Offline Support**: Service worker caching for offline usage.
- **Responsive Design**: Optimized for desktop and mobile.

## Development Commands

- `npm install`: Install dependencies.
- `npm run dev`: Start the development server.
- `npm run build`: Build for production.
- `npm run preview`: Preview the production build.

## Conventions

- **Vue Components**: Use `<script setup>` syntax.
- **State**: Use Pinia stores for global state; avoid deep prop drilling.
- **Styling**: Keep styles modular or use utility classes where appropriate.
- **Code Quality**: Ensure code is clean, readable, and well-commented where necessary.
