<template>
  <div class="app-container">
    <header>
      <div class="logo">
        <h1>ZenMix</h1>
      </div>
      <div class="global-controls">
        <button class="control-btn" @click="store.toggleGlobalPause" :title="store.isGlobalPause ? 'Resume All' : 'Pause All'">
          {{ store.isGlobalPause ? '▶' : '⏸' }}
        </button>
        <button class="control-btn" @click="store.resetAll" title="Reset All">
          ↺
        </button>
      </div>
    </header>

    <main>
      <div class="sounds-grid">
        <SoundCard 
          v-for="sound in store.sounds" 
          :key="sound.id" 
          :sound="sound" 
        />
      </div>
      
      <aside class="sidebar">
        <MixControls />
      </aside>
    </main>

    <footer>
      <p>Improved fork of Redax Sounds with Vue.js & Howler.js</p>
    </footer>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useSoundStore } from './stores/soundStore';
import SoundCard from './components/SoundCard.vue';
import MixControls from './components/MixControls.vue';

const store = useSoundStore();

onMounted(() => {
  store.initSounds();
});
</script>

<style>
:root {
  font-family: 'Inter', sans-serif;
  background: linear-gradient(135deg, #1a1c2c 0%, #4a192c 100%);
  color: #fff;
  min-height: 100vh;
}

body {
  margin: 0;
  padding: 0;
}

* {
  box-sizing: border-box;
}
</style>

<style scoped>
.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
}

h1 {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(to right, #fff, #ffafbd);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.global-controls {
  display: flex;
  gap: 1rem;
}

.control-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.2s;
}

.control-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

main {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 3rem;
  flex: 1;
}

.sounds-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 1.5rem;
}

.sidebar {
  position: sticky;
  top: 2rem;
  height: fit-content;
}

footer {
  margin-top: 4rem;
  text-align: center;
  opacity: 0.5;
  font-size: 0.9rem;
}

@media (max-width: 900px) {
  main {
    grid-template-columns: 1fr;
  }
  
  .sidebar {
    position: static;
    margin-top: 2rem;
  }
}

@media (min-width: 1400px) {
  .app-container {
    max-width: 1800px;
  }
}
</style>
