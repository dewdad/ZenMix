<template>
  <Transition name="slide-fade">
    <div v-if="showNotification" class="offline-notification" :class="notificationType">
      <div class="notification-content">
        <span class="icon">{{ notificationIcon }}</span>
        <span class="message">{{ notificationMessage }}</span>
      </div>
      <button @click="closeNotification" class="close-btn">✕</button>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { registerSW } from 'virtual:pwa-register';

const showNotification = ref(false);
const notificationType = ref('info');
const notificationMessage = ref('');
const notificationIcon = ref('ℹ️');

onMounted(() => {
  const updateSW = registerSW({
    onOfflineReady() {
      notificationType.value = 'success';
      notificationIcon.value = '✅';
      notificationMessage.value = 'App ready to work offline! All sounds cached.';
      showNotification.value = true;
      
      // Auto-hide after 5 seconds
      setTimeout(() => {
        showNotification.value = false;
      }, 5000);
    },
    onNeedRefresh() {
      notificationType.value = 'update';
      notificationIcon.value = '🔄';
      notificationMessage.value = 'New content available! Refresh to update.';
      showNotification.value = true;
    }
  });
});

const closeNotification = () => {
  showNotification.value = false;
};
</script>

<style scoped>
.offline-notification {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: rgba(26, 28, 44, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  max-width: 400px;
}

.offline-notification.success {
  border-color: rgba(76, 175, 80, 0.5);
  background: linear-gradient(135deg, rgba(26, 28, 44, 0.95), rgba(76, 175, 80, 0.1));
}

.offline-notification.update {
  border-color: rgba(255, 193, 7, 0.5);
  background: linear-gradient(135deg, rgba(26, 28, 44, 0.95), rgba(255, 193, 7, 0.1));
}

.notification-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
}

.icon {
  font-size: 1.5rem;
}

.message {
  color: #fff;
  font-size: 0.95rem;
  line-height: 1.4;
}

.close-btn {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0.25rem;
  line-height: 1;
  transition: color 0.2s;
}

.close-btn:hover {
  color: rgba(255, 255, 255, 1);
}

/* Transition animations */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s ease-in;
}

.slide-fade-enter-from {
  transform: translateY(20px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

@media (max-width: 600px) {
  .offline-notification {
    bottom: 1rem;
    right: 1rem;
    left: 1rem;
    max-width: none;
  }
}
</style>
