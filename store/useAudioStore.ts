import { create } from "zustand";
import { Audio, AVPlaybackStatus } from "expo-av";
import { Track } from "@/utils/types";

interface AudioState {
  currentTrack: Track | null;
  isPlaying: boolean;
  position: number;
  playTrack: (track: Track) => Promise<void>;
  togglePlay: () => Promise<void>;
  pauseTrack: () => Promise<void>;
  stopMusic: () => Promise<void>;
  sound: Audio.Sound | null;
}

export const useAudioStore = create<AudioState>((set, get) => ({
  currentTrack: null,
  isPlaying: false,
  position: 0,
  sound: null,

  playTrack: async (track) => {
    const prevSound = get().sound;
    if (prevSound) await prevSound.unloadAsync();

    const { sound } = await Audio.Sound.createAsync(
      { uri: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
      { shouldPlay: true }
    );

    sound.setOnPlaybackStatusUpdate((status: AVPlaybackStatus) => {
      if (status.isLoaded && !status.isBuffering) {
        set({ position: (status.positionMillis || 0) / 1000 });
      }
    });

    set({
      currentTrack: track,
      isPlaying: true,
      sound,
      position: 0,
    });
  },

  togglePlay: async () => {
    const { sound, isPlaying } = get();
    if (!sound) return;

    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }

    set({ isPlaying: !isPlaying });
  },

  pauseTrack: async () => {
    const { sound, isPlaying } = get();
    if (sound && isPlaying) {
      await sound.pauseAsync();
      set({ isPlaying: false });
    }
  },

  stopMusic: async () => {
    const { sound, isPlaying } = get();
    if (sound && isPlaying) {
      await sound.pauseAsync();
      set({ isPlaying: false, currentTrack: null });
    }
  },
}));
