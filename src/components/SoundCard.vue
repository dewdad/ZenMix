<template>
  <div class="sound-card" :class="{ 'active': sound.isPlaying }">
    <div class="icon-wrapper" @click="toggle">
      <Icon :name="sound.icon" :isPlaying="sound.isPlaying" />
    </div>
    <div class="controls" v-if="sound.isPlaying">
      <input 
        type="range" 
        min="0" 
        max="1" 
        step="0.01" 
        :value="sound.volume" 
        @input="updateVolume"
        @click.stop
      >
    </div>
    <div class="name">{{ sound.name }}</div>
  </div>
</template>

<script setup>
import { useSoundStore } from '../stores/soundStore';
import Icon from './Icon.vue';

const props = defineProps({
  sound: {
    type: Object,
    required: true
  }
});

const store = useSoundStore();

const toggle = () => {
  store.toggleSound(props.sound.id);
};

const updateVolume = (event) => {
  store.setVolume(props.sound.id, parseFloat(event.target.value));
};
</script>

<style scoped>
.sound-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  cursor: pointer;
  aspect-ratio: 1;
}

.sound-card:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.sound-card.active {
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.icon-wrapper {
  width: 64px;
  height: 64px;
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.7);
}

.active .icon-wrapper {
  color: #fff;
}

.controls {
  width: 100%;
  margin-bottom: 0.5rem;
}

input[type=range] {
  width: 100%;
  accent-color: #fff;
}

.name {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
}
</style>
