import { defineStore } from 'pinia';
import { Howl } from 'howler';
import { SOUND_LIST } from '../constants';

export const useSoundStore = defineStore('sound', {
  state: () => ({
    sounds: {}, // Map of sound objects
    howls: {}, // Map of Howl instances
    isGlobalPause: false,
  }),
  actions: {
    initSounds() {
      // Initialize state from SOUND_LIST
      Object.values(SOUND_LIST).forEach(sound => {
        this.sounds[sound.id] = {
          ...sound,
          isPlaying: false,
          volume: 0.5, // Default volume 0.5
        };
      });
    },

    toggleSound(id) {
      const sound = this.sounds[id];
      if (!sound) return;

      if (sound.isPlaying) {
        this.stopSound(id);
      } else {
        this.playSound(id);
      }
    },

    playSound(id) {
      const sound = this.sounds[id];
      if (!this.howls[id]) {
        this.howls[id] = new Howl({
          src: [`${import.meta.env.BASE_URL}sounds/${sound.audioUrl}.webm`],
          loop: true,
          volume: sound.volume,
          html5: true, // Use HTML5 Audio to stream large files
        });
      }

      this.howls[id].play();
      this.howls[id].fade(0, sound.volume, 1000); // Fade in
      sound.isPlaying = true;
      this.isGlobalPause = false;
    },

    stopSound(id) {
      const sound = this.sounds[id];
      if (this.howls[id]) {
        this.howls[id].fade(sound.volume, 0, 1000); // Fade out
        setTimeout(() => {
            if (!sound.isPlaying) { // Check if it wasn't toggled back on
                this.howls[id].pause();
            }
        }, 1000);
      }
      sound.isPlaying = false;
    },

    setVolume(id, volume) {
      const sound = this.sounds[id];
      sound.volume = volume;
      if (this.howls[id]) {
        this.howls[id].volume(volume);
      }
    },

    pauseAll() {
      this.isGlobalPause = true;
      Object.keys(this.howls).forEach(id => {
        if (this.sounds[id].isPlaying) {
          this.howls[id].mute(true);
        }
      });
    },

    resumeAll() {
        this.isGlobalPause = false;
        Object.keys(this.howls).forEach(id => {
            if (this.sounds[id].isPlaying) {
                this.howls[id].mute(false);
            }
        });
    },
    
    toggleGlobalPause() {
        if (this.isGlobalPause) {
            this.resumeAll();
        } else {
            this.pauseAll();
        }
    },

    resetAll() {
        Object.keys(this.howls).forEach(id => {
            this.howls[id].stop();
            this.howls[id].unload();
        });
        this.howls = {};
        this.initSounds();
        this.isGlobalPause = false;
    },

    // Mix Management
    saveMix() {
        const activeSounds = Object.values(this.sounds)
            .filter(s => s.isPlaying)
            .map(s => ({ id: s.id, volume: s.volume }));
        return activeSounds;
    },

    loadMix(mix) {
        this.resetAll();
        mix.forEach(item => {
            const sound = this.sounds[item.id];
            if (sound) {
                sound.volume = item.volume;
                this.playSound(item.id);
            }
        });
    }
  }
});
