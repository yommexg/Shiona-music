import { create } from "zustand";
import { Alert } from "react-native";
import { BASE_URL } from "./baseApi";
import { Track } from "@/utils/types";

interface MusicState {
  tracks: Track[];
  albums: any[];
  genres: any[];
  artists: any[];
  isLoading: boolean;
  fetchTracks: () => Promise<void>;
  fetchAlbums: () => Promise<void>;
  fetchGenres: () => Promise<void>;
  fetchArtists: () => Promise<void>;
  addTrack: (track: any) => Promise<void>;
  addAlbum: (album: any) => Promise<void>;
  addGenre: (genre: any) => Promise<void>;
  addArtist: (artist: any) => Promise<void>;
  deleteTrack: (trackId: string) => Promise<void>;
  deleteAlbum: (albumId: string) => Promise<void>;
  deleteGenre: (genreId: string) => Promise<void>;
  deleteArtist: (artistId: string) => Promise<void>;
}

export const useMusicStore = create<MusicState>((set) => ({
  tracks: [],
  albums: [],
  genres: [],
  artists: [],
  isLoading: false,

  // Fetch data for tracks
  fetchTracks: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch(`${BASE_URL}/api/tracks`);
      const data = await response.json();
      if (response.ok) {
        set({ tracks: data });
      } else {
        Alert.alert("Error", "Failed to load tracks.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to load tracks.");
    } finally {
      set({ isLoading: false });
    }
  },

  // Fetch data for albums
  fetchAlbums: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch(`${BASE_URL}/api/albums`);
      const data = await response.json();
      if (response.ok) {
        set({ albums: data });
      } else {
        Alert.alert("Error", "Failed to load albums.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to load albums.");
    } finally {
      set({ isLoading: false });
    }
  },

  // Fetch data for genres
  fetchGenres: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch(`${BASE_URL}/api/genres`);
      const data = await response.json();
      if (response.ok) {
        set({ genres: data });
      } else {
        Alert.alert("Error", "Failed to load genres.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to load genres.");
    } finally {
      set({ isLoading: false });
    }
  },

  // Fetch data for artists
  fetchArtists: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch(`${BASE_URL}/api/artists`);
      const data = await response.json();
      if (response.ok) {
        set({ artists: data });
      } else {
        Alert.alert("Error", "Failed to load artists.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to load artists.");
    } finally {
      set({ isLoading: false });
    }
  },

  // Add a new track
  addTrack: async (track) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`${BASE_URL}/api/tracks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(track),
      });
      const data = await response.json();
      if (response.ok) {
        set((state) => ({ tracks: [...state.tracks, data] }));
      } else {
        Alert.alert("Error", "Failed to add track.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to add track.");
    } finally {
      set({ isLoading: false });
    }
  },

  // Add a new album
  addAlbum: async (album) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`${BASE_URL}/api/albums`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(album),
      });
      const data = await response.json();
      if (response.ok) {
        set((state) => ({ albums: [...state.albums, data] }));
      } else {
        Alert.alert("Error", "Failed to add album.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to add album.");
    } finally {
      set({ isLoading: false });
    }
  },

  // Add a new genre
  addGenre: async (genre) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`${BASE_URL}/api/genres`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(genre),
      });
      const data = await response.json();
      if (response.ok) {
        set((state) => ({ genres: [...state.genres, data] }));
      } else {
        Alert.alert("Error", "Failed to add genre.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to add genre.");
    } finally {
      set({ isLoading: false });
    }
  },

  // Add a new artist
  addArtist: async (artist) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`${BASE_URL}/api/artists`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(artist),
      });
      const data = await response.json();
      if (response.ok) {
        set((state) => ({ artists: [...state.artists, data] }));
      } else {
        Alert.alert("Error", "Failed to add artist.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to add artist.");
    } finally {
      set({ isLoading: false });
    }
  },

  // Delete a track
  deleteTrack: async (trackId) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`${BASE_URL}/api/tracks/${trackId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        // set((state) => ({
        //   tracks: state.tracks.filter((track) => track.id !== trackId),
        // }));
      } else {
        Alert.alert("Error", "Failed to delete track.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to delete track.");
    } finally {
      set({ isLoading: false });
    }
  },

  // Delete an album
  deleteAlbum: async (albumId) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`${BASE_URL}/api/albums/${albumId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        set((state) => ({
          albums: state.albums.filter((album) => album.id !== albumId),
        }));
      } else {
        Alert.alert("Error", "Failed to delete album.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to delete album.");
    } finally {
      set({ isLoading: false });
    }
  },

  // Delete a genre
  deleteGenre: async (genreId) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`${BASE_URL}/api/genres/${genreId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        set((state) => ({
          genres: state.genres.filter((genre) => genre.id !== genreId),
        }));
      } else {
        Alert.alert("Error", "Failed to delete genre.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to delete genre.");
    } finally {
      set({ isLoading: false });
    }
  },

  // Delete an artist
  deleteArtist: async (artistId) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`${BASE_URL}/api/artists/${artistId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        set((state) => ({
          artists: state.artists.filter((artist) => artist.id !== artistId),
        }));
      } else {
        Alert.alert("Error", "Failed to delete artist.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to delete artist.");
    } finally {
      set({ isLoading: false });
    }
  },
}));
