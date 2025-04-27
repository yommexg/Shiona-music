// TypeScript interfaces for Tracks, Albums, and Genres

export interface Genre {
  GenreId: number;
  Name: string;
  Tracks: (Track | null)[];
}

export interface Artist {
  ArtistId: number;
  Name: string;
}

export interface Album {
  AlbumId: number;
  Title: string;
  ArtistId: number;
  ReleaseYear: number;
  Artist: Artist;
  Tracks: (Track | null)[];
}

export interface Track {
  TrackId: number;
  Title: string;
  AlbumId: number;
  GenreId: number;
  Duration: number;
  Album: Album;
  Genre: Genre;
}
