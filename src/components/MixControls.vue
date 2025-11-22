<template>
  <div class="mix-controls">
    <h3>My Mixes</h3>
    
    <div class="save-mix">
      <input 
        v-model="newMixName" 
        placeholder="Name your mix..." 
        @keyup.enter="saveCurrentMix"
      />
      <button @click="saveCurrentMix" :disabled="!canSave">Save Mix</button>
    </div>

    <div class="mix-list" v-if="savedMixes.length > 0">
      <div v-for="(mix, index) in savedMixes" :key="index" class="mix-item">
        <span class="mix-name" @click="loadMix(mix)">{{ mix.name }}</span>
        <button class="delete-btn" @click="deleteMix(index)">×</button>
      </div>
    </div>
    <div v-else class="empty-state">
      No saved mixes yet.
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useSoundStore } from '../stores/soundStore';
import { useStorage } from '@vueuse/core';

const store = useSoundStore();
const savedMixes = useStorage('ZenMix-mixes', []);
const newMixName = ref('');

const canSave = computed(() => {
  return newMixName.value.trim() !== '' && Object.values(store.sounds).some(s => s.isPlaying);
});

const saveCurrentMix = () => {
  if (!canSave.value) return;

  const mixData = store.saveMix();
  savedMixes.value.push({
    name: newMixName.value,
    data: mixData,
    date: new Date().toISOString()
  });
  
  newMixName.value = '';
};

const loadMix = (mix) => {
  store.loadMix(mix.data);
};

const deleteMix = (index) => {
  savedMixes.value.splice(index, 1);
};
</script>

<style scoped>
.mix-controls {
  background: rgba(0, 0, 0, 0.3);
  padding: 1.5rem;
  border-radius: 16px;
  color: #fff;
}

h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  font-weight: 500;
}

.save-mix {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

input {
  flex: 1;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  color: #fff;
  outline: none;
}

input:focus {
  border-color: rgba(255, 255, 255, 0.5);
}

button {
  background: #fff;
  color: #000;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: opacity 0.2s;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.mix-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.mix-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
  padding: 0.75rem 1rem;
  border-radius: 8px;
  transition: background 0.2s;
}

.mix-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.mix-name {
  cursor: pointer;
  flex: 1;
}

.delete-btn {
  background: transparent;
  color: rgba(255, 255, 255, 0.5);
  padding: 0.25rem;
  font-size: 1.2rem;
  line-height: 1;
}

.delete-btn:hover {
  color: #ff4444;
  background: transparent;
}

.empty-state {
  color: rgba(255, 255, 255, 0.5);
  font-style: italic;
  font-size: 0.9rem;
}
</style>
