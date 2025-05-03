import { create } from "zustand";
import { Alert } from "react-native";
import { BASE_URL } from "./baseApi";
import { Album, Artist, Genre, Track } from "@/utils/types";
import { router } from "expo-router";

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
  addTrack: (track: {
    Title: string;
    Duration: number;
    AlbumId: number;
    GenreId: number;
  }) => Promise<void>;
  editTrack: (
    track: {
      Title: string;
      Duration: number;
      AlbumId: number;
      GenreId: number;
    },
    trackId: number
  ) => Promise<void>;
  addAlbum: (album: {
    Title: string;
    ArtistId: number;
    ReleaseYear: number;
  }) => Promise<void>;
  editAlbum: (
    album: {
      Title: string;
      ArtistId: number;
      ReleaseYear: number;
    },
    albumId: number
  ) => Promise<void>;
  addGenre: (genre: { Name: string }) => Promise<void>;
  editGenre: (genre: { Name: string }, genreId: number) => Promise<void>;
  addArtist: (artist: { Name: string }) => Promise<void>;
  editArtist: (artist: { Name: string }, artistId: number) => Promise<void>;
  deleteTrack: (trackId: number) => Promise<void>;
  deleteAlbum: (albumId: number) => Promise<void>;
  deleteGenre: (genreId: number) => Promise<void>;
  deleteArtist: (artistId: number) => Promise<void>;
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
          totalAlbums: 25,
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
        `${BASE_URL}/api/genres?page=${page}&pageSize=${limit}`
      );
      const data = await response.json();
      if (response.ok) {
        set((state) => ({
          genres: page === 1 ? data : [...state.genres, ...data],
          currentPageGenres: page,
          totalGenres: 10,
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
        `${BASE_URL}/api/artists?page=${page}&pageSize=${limit}`
      );
      const data = await response.json();
      if (response.ok) {
        set((state) => ({
          artists: page === 1 ? data : [...state.artists, ...data],
          currentPageArtists: page,
          totalArtists: 21,
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

  addTrack: async (track) => {
    set({ isLoading: true });

    try {
      const response = await fetch(`${BASE_URL}/api/tracks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(track),
      });
      await response.json();
      if (response.ok) {
        const { fetchTracks } = useMusicStore.getState();
        await fetchTracks();

        Alert.alert("Success", "Song added successfully!");
        router.push({
          pathname: "/(tabs)/(songs)",
        });
      } else {
        Alert.alert("Error", "Failed to add track.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to add track.");
    } finally {
      set({ isLoading: false });
    }
  },

  editTrack: async (track, trackId) => {
    set({ isLoading: true });

    try {
      const response = await fetch(`${BASE_URL}/api/Tracks/${trackId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ TrackId: trackId, ...track }),
      });

      if (response.ok) {
        const { fetchTracks } = useMusicStore.getState();
        await fetchTracks();

        Alert.alert("Success", "Song Edited successfully!");
        router.push({
          pathname: "/(tabs)/(songs)",
        });
      } else {
        Alert.alert("Error", "Failed to Edit track.");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to Edit track.");
    } finally {
      set({ isLoading: false });
    }
  },

  addAlbum: async (album) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`${BASE_URL}/api/Albums`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(album),
      });
      await response.json();
      if (response.ok) {
        const { fetchAlbums } = useMusicStore.getState();
        await fetchAlbums();

        Alert.alert("Success", "Album added successfully!");
        router.push({
          pathname: "/(tabs)/(albums)",
        });
      } else {
        Alert.alert("Error", "Failed to add album.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to add album.");
    } finally {
      set({ isLoading: false });
    }
  },

  editAlbum: async (album) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`${BASE_URL}/api/Albums`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(album),
      });
      await response.json();
      if (response.ok) {
        const { fetchAlbums } = useMusicStore.getState();
        await fetchAlbums();

        Alert.alert("Success", "Album added successfully!");
        router.push({
          pathname: "/(tabs)/(albums)",
        });
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
      const response = await fetch(`${BASE_URL}/api/Genres`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(genre),
      });
      await response.json();
      if (response.ok) {
        const { fetchGenres } = useMusicStore.getState();
        await fetchGenres();

        Alert.alert("Success", "Genre added successfully!");
        router.push({
          pathname: "/(tabs)/(genres)",
        });
      } else {
        Alert.alert("Error", "Failed to add genre.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to add genre.");
    } finally {
      set({ isLoading: false });
    }
  },

  editGenre: async (genre, genreId) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`${BASE_URL}/api/Genres/${genreId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ genreId, ...genre }),
      });

      if (response.ok) {
        const { fetchGenres } = useMusicStore.getState();
        await fetchGenres();

        Alert.alert("Success", "Genre Edited successfully!");
        router.push({
          pathname: "/(tabs)/(genres)",
        });
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
      const response = await fetch(`${BASE_URL}/api/Artists`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(artist),
      });
      await response.json();
      if (response.ok) {
        const { fetchArtists } = useMusicStore.getState();
        await fetchArtists();

        Alert.alert("Success", "Artist added successfully!");
        router.push({
          pathname: "/(tabs)/(artists)",
        });
      } else {
        Alert.alert("Error", "Failed to add artist.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to add artist.");
    } finally {
      set({ isLoading: false });
    }
  },

  editArtist: async (artist, artistId) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`${BASE_URL}/api/Artists/${artistId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ArtistId: artistId, ...artist }),
      });

      if (response.ok) {
        const { fetchArtists } = useMusicStore.getState();
        await fetchArtists();

        Alert.alert("Success", "Artist Edited successfully!");
        router.push({
          pathname: "/(tabs)/(artists)",
        });
      } else {
        Alert.alert("Error", "Failed to edit artist.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to edit artist.");
    } finally {
      set({ isLoading: false });
    }
  },

  // Delete a track
  deleteTrack: async (trackId) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`${BASE_URL}/api/Tracks/${trackId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const { fetchTracks } = useMusicStore.getState();
        await fetchTracks();

        Alert.alert("Success", "Track Deleted successfully!");
        router.push({
          pathname: "/(tabs)/(songs)",
        });
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
