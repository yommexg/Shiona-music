import { create } from "zustand";
import { Alert } from "react-native";
import { BASE_URL } from "./baseApi";
import { Album, Artist, Genre, Track } from "@/utils/types";

interface MusicState {
  tracks: Track[];
  albums: Album[];
  genres: Genre[];
  artists: Artist[];
  isLoading: boolean;
  currentPageTracks: number;
  currentPageAlbums: number;
  currentPageGenres: number;
  currentPageArtists: number;
  totalTracks: number;
  totalAlbums: number;
  totalGenres: number;
  totalArtists: number;
  fetchTracks: (page?: number, limit?: number) => Promise<void>;
  fetchAlbums: (page?: number, limit?: number) => Promise<void>;
  fetchGenres: (page?: number, limit?: number) => Promise<void>;
  fetchArtists: (page?: number, limit?: number) => Promise<void>;
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
  currentPageTracks: 1,
  currentPageAlbums: 1,
  currentPageGenres: 1,
  currentPageArtists: 1,
  totalTracks: 0,
  totalAlbums: 0,
  totalGenres: 0,
  totalArtists: 0,

  fetchTracks: async (page = 1, limit = 10) => {
    set({ isLoading: true });
    try {
      const response = await fetch(
        `${BASE_URL}/api/tracks?page=${page}&pageSize=${limit}`
      );
      const data = await response.json();
      if (response.ok) {
        set((state) => ({
          tracks: page === 1 ? data : [...state.tracks, ...data],
          currentPageTracks: page,
          totalTracks: 16,
        }));
      } else {
        Alert.alert("Error", "Failed to load tracks.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to load tracks.");
    } finally {
      set({ isLoading: false });
    }
  },

  fetchAlbums: async (page = 1, limit = 10) => {
    set({ isLoading: true });
    try {
      const response = await fetch(
        `${BASE_URL}/api/Albums?page=${page}&pageSize=${limit}`
      );
      const data = await response.json();

      if (response.ok) {
        set((state) => ({
          albums: page === 1 ? data : [...state.albums, ...data],
          currentPageAlbums: page,
          totalAlbums: 16,
        }));
      } else {
        Alert.alert("Error", "Failed to load albums.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to load albums.");
    } finally {
      set({ isLoading: false });
    }
  },

  fetchGenres: async (page = 1, limit = 10) => {
    set({ isLoading: true });
    try {
      const response = await fetch(
        `${BASE_URL}/api/genres?page=${page}&limit=${limit}`
      );
      const data = await response.json();
      if (response.ok) {
        set((state) => ({
          genres: page === 1 ? data.genres : [...state.genres, ...data.genres],
          currentPageGenres: page,
          totalGenres: data.total,
        }));
      } else {
        Alert.alert("Error", "Failed to load genres.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to load genres.");
    } finally {
      set({ isLoading: false });
    }
  },

  fetchArtists: async (page = 1, limit = 10) => {
    set({ isLoading: true });
    try {
      const response = await fetch(
        `${BASE_URL}/api/artists?page=${page}&limit=${limit}`
      );
      const data = await response.json();
      if (response.ok) {
        set((state) => ({
          artists:
            page === 1 ? data.artists : [...state.artists, ...data.artists],
          currentPageArtists: page,
          totalArtists: data.total,
        }));
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
        // set((state) => ({
        //   albums: state.albums.filter((album) => album.A !== albumId),
        // }));
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
        // set((state) => ({
        //   genres: state.genres.filter((genre) => genre.id !== genreId),
        // }));
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
        // set((state) => ({
        //   artists: state.artists.filter((artist) => artist.id !== artistId),
        // }));
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
