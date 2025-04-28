import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAudioStore } from "@/store/useAudioStore";
import { formatTime } from "@/utils/format";
import { useMusicStore } from "@/store/useMusicStore";

const FloatingPlayer = () => {
  const { currentTrack, isPlaying, togglePlay, position, stopMusic } =
    useAudioStore();
  const { albums } = useMusicStore();

  if (!currentTrack) return null;

  const progress = (position / currentTrack.Duration) * 100 || 0;

  const album = albums.find((album) => album.AlbumId === currentTrack.AlbumId);

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text
          style={styles.title}
          numberOfLines={1}>
          {currentTrack.Title}
        </Text>

        <Text
          style={styles.artist}
          numberOfLines={1}>
          {album?.Artist.Name ?? "Unknown Artist"}
        </Text>

        <Text style={styles.time}>
          {formatTime(position)} / {formatTime(currentTrack.Duration)}
        </Text>

        <View style={styles.progressBackground}>
          <View style={[styles.progressBar, { width: `${progress}%` }]} />
        </View>
      </View>

      <View style={{ flexDirection: "row", gap: 10 }}>
        <TouchableOpacity onPress={togglePlay}>
          <Ionicons
            name={isPlaying ? "pause" : "play"}
            size={28}
            color="white"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={stopMusic}>
          <Ionicons
            name="stop"
            size={28}
            color="white"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FloatingPlayer;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: "7%",
    left: 10,
    right: 10,
    backgroundColor: "#1b1414",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 5,
  },
  info: {
    flex: 1,
    paddingRight: 10,
  },
  title: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  artist: {
    color: "#ccc",
    fontSize: 13,
    marginTop: 2,
  },
  time: {
    color: "#aaa",
    fontSize: 12,
    marginVertical: 8,
  },
  progressBackground: {
    height: 4,
    backgroundColor: "#3a2f2f",
    borderRadius: 10,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "red",
  },
});
