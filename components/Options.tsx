import { Text, View } from "react-native";
import { PropsWithChildren } from "react";
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
  const handlePressAction = async (id: string) => {
    switch (id) {
      case "edit":
        console.log("Edit Track " + trackId);
        break;

      case "delete":
        console.log("Delete Track " + trackId);

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
