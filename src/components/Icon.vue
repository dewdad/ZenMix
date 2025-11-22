<template>
  <svg 
    :viewBox="viewBox" 
    v-html="content" 
    class="icon"
    :class="{ 'is-playing': isPlaying }"
  ></svg>
</template>

<script setup>
import { computed } from 'vue';
import icons from '../assets/icons.json';

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  isPlaying: {
    type: Boolean,
    default: false
  }
});

// Map constant names (snake_case) to icon keys (PascalCase)
// e.g. 'rain_light' -> 'RainLight'
const iconKey = computed(() => {
  const parts = props.name.split('_');
  const pascalCase = parts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('');
  // Handle special cases if any, or fuzzy match
  // The extraction script used the filename, e.g. RainLight.js -> RainLight
  // The constants.js has 'rain_light'
  
  // Let's check if the direct pascal case exists
  if (icons[pascalCase]) return pascalCase;
  
  // Try to find a match
  const key = Object.keys(icons).find(k => k.toLowerCase() === pascalCase.toLowerCase());
  return key || '';
});

const viewBox = computed(() => icons[iconKey.value]?.viewBox || '0 0 512 512');
const content = computed(() => icons[iconKey.value]?.content || '');
</script>

<style scoped>
.icon {
  width: 100%;
  height: 100%;
  fill: currentColor;
  transition: all 0.3s ease;
}

.is-playing {
    filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.5));
}
</style>
