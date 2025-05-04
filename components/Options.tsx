import { Text, View } from "react-native";
import { PropsWithChildren, useState } from "react";
import {
  Menu,
  MenuOptions,
  MenuTrigger,
  MenuOption,
} from "react-native-popup-menu";

import { useAuthStore } from "@/store/useAuthStore";
import { useAudioStore } from "@/store/useAudioStore";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMusicStore } from "@/store/useMusicStore";
import ConfirmDelete from "./ConfirmDelete";

type MusicOptionsProps = PropsWithChildren<{}>;

export const MusicOptions = ({ children }: MusicOptionsProps) => {
  const { logout } = useAuthStore();
  const { pauseTrack } = useAudioStore();

  const handlePressAction = async (id: string) => {
    switch (id) {
      case "add-genre":
        router.push("/(tabs)/(genres)");
        setTimeout(() => {
          router.push("/(tabs)/(genres)/(add-genre)");
        }, 100);
        break;

      case "add-album":
        router.push("/(tabs)/(albums)");
        setTimeout(() => {
          router.push("/(tabs)/(albums)/(add-album)");
        }, 100);
        break;

      case "add-song":
        router.push("/(tabs)/(songs)");
        setTimeout(() => {
          router.push("/(tabs)/(songs)/(add-song)");
        }, 100);
        break;

      case "add-artist":
        router.push("/(tabs)/(artists)");
        setTimeout(() => {
          router.push("/(tabs)/(artists)/(add-artist)");
        }, 100);
        break;

      case "logout":
        pauseTrack();
        logout();
        break;

      default:
        console.warn(`Unknown menu action ${id}`);
        break;
    }
  };

  return (
    <Menu>
      <MenuTrigger
        customStyles={{
          triggerWrapper: {
            padding: 2,
          },
        }}>
        {children}
      </MenuTrigger>
      <MenuOptions
        customStyles={{
          optionsContainer: {
            paddingHorizontal: 10,
            paddingVertical: 24,
            borderRadius: 8,
            backgroundColor: "#1E1E1E",
          },
        }}>
        <View style={{ gap: 20 }}>
          <MenuOption onSelect={() => handlePressAction("add-genre")}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
              <MaterialCommunityIcons
                name="book-plus-outline"
                size={21}
                color="white"
              />
              <Text style={{ fontSize: 18, color: "white" }}>Add Genre</Text>
            </View>
          </MenuOption>
          <MenuOption onSelect={() => handlePressAction("add-album")}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
              <AntDesign
                name="addfolder"
                size={21}
                color="white"
              />
              <Text style={{ fontSize: 18, color: "white" }}>Add Album</Text>
            </View>
          </MenuOption>
          <MenuOption onSelect={() => handlePressAction("add-song")}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
              <MaterialCommunityIcons
                name="music-note-plus"
                size={21}
                color="white"
              />
              <Text style={{ fontSize: 18, color: "white" }}>Add Song</Text>
            </View>
          </MenuOption>
          <MenuOption onSelect={() => handlePressAction("add-artist")}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
              <AntDesign
                name="adduser"
                size={21}
                color="white"
              />
              <Text style={{ fontSize: 18, color: "white" }}>Add Artist</Text>
            </View>
          </MenuOption>

          <MenuOption onSelect={() => handlePressAction("logout")}>
            <Text
              style={{
                fontSize: 18,
                color: "white",
                textAlign: "center",
                backgroundColor: "red",
                paddingVertical: 5,
                borderRadius: 4,
                marginTop: 20,
              }}>
              Logout
            </Text>
          </MenuOption>
        </View>
      </MenuOptions>
    </Menu>
  );
};

type TrackOptionsProps = PropsWithChildren<{
  trackId: number;
}>;

export const TrackOptions = ({ children, trackId }: TrackOptionsProps) => {
  const { tracks, deleteTrack } = useMusicStore();
  const { currentTrack, stopMusic } = useAudioStore();

  const [showConfirm, setShowConfirm] = useState(false);

  const selectedTrack = tracks.find((track) => track.TrackId === trackId);

  const handlePressAction = async (id: string) => {
    if (currentTrack?.TrackId === trackId) {
      stopMusic();
    }

    switch (id) {
      case "edit":
        router.push({
          pathname: "/(tabs)/(songs)/(edit-song)/[id]",
          params: { id: trackId },
        });
        break;

      case "delete":
        setShowConfirm(true);
        break;
      default:
        console.warn(`Unknown menu action ${id}`);
        break;
    }
  };

  const confirmDelete = async () => {
    setShowConfirm(false);
    deleteTrack(trackId);
  };

  return (
    <>
      <Menu>
        <MenuTrigger
          customStyles={{
            triggerWrapper: {
              padding: 2,
            },
          }}>
          {children}
        </MenuTrigger>
        <MenuOptions
          customStyles={{
            optionsContainer: {
              padding: 10,
              borderRadius: 8,
              backgroundColor: "#1E1E1E",
            },
          }}>
          <View style={{ gap: 10 }}>
            <MenuOption onSelect={() => handlePressAction("edit")}>
              <Text
                style={{
                  fontSize: 14,
                  color: "white",
                }}>
                Edit
              </Text>
            </MenuOption>
            <MenuOption onSelect={() => handlePressAction("delete")}>
              <Text
                style={{
                  fontSize: 14,
                  color: "white",
                }}>
                Delete
              </Text>
            </MenuOption>
          </View>
        </MenuOptions>
      </Menu>
      <ConfirmDelete
        visible={showConfirm}
        onCancel={() => setShowConfirm(false)}
        onConfirm={confirmDelete}
        title={`"${selectedTrack?.Title}"` + " track"}
      />
    </>
  );
};

// Artist Options
type ArtistOptionsProps = PropsWithChildren<{
  artistId: number;
}>;

export const ArtistOptions = ({ children, artistId }: ArtistOptionsProps) => {
  const { artists, deleteArtist } = useMusicStore();
  const { stopMusic } = useAudioStore();

  const [showConfirm, setShowConfirm] = useState(false);

  const selectedArtist = artists.find((artist) => artist.ArtistId === artistId);

  const handlePressAction = async (id: string) => {
    stopMusic();

    switch (id) {
      case "edit":
        router.push({
          pathname: "/(tabs)/(artists)/(edit-artist)/[id]",
          params: { id: artistId },
        });
        break;

      case "delete":
        setShowConfirm(true);
        break;

      default:
        console.warn(`Unknown menu action ${id}`);
        break;
    }
  };

  const confirmDelete = async () => {
    setShowConfirm(false);
    deleteArtist(artistId);
  };

  return (
    <>
      <Menu>
        <MenuTrigger
          customStyles={{
            triggerWrapper: {
              padding: 2,
            },
          }}>
          {children}
        </MenuTrigger>
        <MenuOptions
          customStyles={{
            optionsContainer: {
              padding: 10,
              borderRadius: 8,
              backgroundColor: "#1E1E1E",
            },
          }}>
          <View style={{ gap: 10 }}>
            <MenuOption onSelect={() => handlePressAction("edit")}>
              <Text
                style={{
                  fontSize: 14,
                  color: "white",
                }}>
                Edit
              </Text>
            </MenuOption>
            <MenuOption onSelect={() => handlePressAction("delete")}>
              <Text
                style={{
                  fontSize: 14,
                  color: "white",
                }}>
                Delete
              </Text>
            </MenuOption>
          </View>
        </MenuOptions>
      </Menu>
      <ConfirmDelete
        visible={showConfirm}
        onCancel={() => setShowConfirm(false)}
        onConfirm={confirmDelete}
        title={`"${selectedArtist?.Name}"` + " artist"}
      />
    </>
  );
};

// Album Options
type AlbumOptionsProps = PropsWithChildren<{
  albumId: number;
}>;

export const AlbumOptions = ({ children, albumId }: AlbumOptionsProps) => {
  const { albums, deleteAlbum, tracks } = useMusicStore();
  const { stopMusic, currentTrack } = useAudioStore();

  const [showConfirm, setShowConfirm] = useState(false);

  const selectedAlbum = albums.find((album) => album.AlbumId === albumId);

  const selectedAlbumTack = tracks.find((track) => track.AlbumId === albumId);

  const handlePressAction = async (id: string) => {
    if (currentTrack?.TrackId === selectedAlbumTack?.TrackId) {
      stopMusic();
    }

    switch (id) {
      case "edit":
        router.push({
          pathname: "/(tabs)/(albums)/(edit-album)/[id]",
          params: { id: albumId },
        });
        break;

      case "delete":
        setShowConfirm(true);
        break;

      default:
        console.warn(`Unknown menu action ${id}`);
        break;
    }
  };
  const confirmDelete = async () => {
    setShowConfirm(false);
    deleteAlbum(albumId);
  };

  return (
    <>
      <Menu>
        <MenuTrigger
          customStyles={{
            triggerWrapper: {
              padding: 2,
            },
          }}>
          {children}
        </MenuTrigger>
        <MenuOptions
          customStyles={{
            optionsContainer: {
              padding: 10,
              borderRadius: 8,
              backgroundColor: "#1E1E1E",
            },
          }}>
          <View style={{ gap: 10 }}>
            <MenuOption onSelect={() => handlePressAction("edit")}>
              <Text
                style={{
                  fontSize: 14,
                  color: "white",
                }}>
                Edit
              </Text>
            </MenuOption>
            <MenuOption onSelect={() => handlePressAction("delete")}>
              <Text
                style={{
                  fontSize: 14,
                  color: "white",
                }}>
                Delete
              </Text>
            </MenuOption>
          </View>
        </MenuOptions>
      </Menu>
      <ConfirmDelete
        visible={showConfirm}
        onCancel={() => setShowConfirm(false)}
        onConfirm={confirmDelete}
        title={`"${selectedAlbum?.Title}"` + " album"}
      />
    </>
  );
};

//Genre Options
type GerneOptionsProps = PropsWithChildren<{
  genreId: number;
}>;

export const GenreOptions = ({ children, genreId }: GerneOptionsProps) => {
  const handlePressAction = async (id: string) => {
    switch (id) {
      case "edit":
        router.push({
          pathname: "/(tabs)/(genres)/(edit-genre)/[id]",
          params: { id: genreId },
        });
        break;

      case "delete":
        console.log("Delete Track " + genreId);

        break;

      default:
        console.warn(`Unknown menu action ${id}`);
        break;
    }
  };

  return (
    <Menu>
      <MenuTrigger
        customStyles={{
          triggerWrapper: {
            padding: 2,
          },
        }}>
        {children}
      </MenuTrigger>
      <MenuOptions
        customStyles={{
          optionsContainer: {
            padding: 10,
            borderRadius: 8,
            backgroundColor: "#1E1E1E",
          },
        }}>
        <View style={{ gap: 10 }}>
          <MenuOption onSelect={() => handlePressAction("edit")}>
            <Text
              style={{
                fontSize: 14,
                color: "white",
              }}>
              Edit
            </Text>
          </MenuOption>
          <MenuOption onSelect={() => handlePressAction("delete")}>
            <Text
              style={{
                fontSize: 14,
                color: "white",
              }}>
              Delete
            </Text>
          </MenuOption>
        </View>
      </MenuOptions>
    </Menu>
  );
};
