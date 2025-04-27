import { useAuthStore } from "@/store/useAuthStore";
import { useMusicStore } from "@/store/useMusicStore";

import { SafeAreaView } from "react-native-safe-area-context";
import { BackHandler, Text, StyleSheet, View } from "react-native";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback } from "react";
import Header from "@/components/Header";
import Spinner from "@/components/Spinner";
import { TrackList } from "@/components/TrackList";
import { Album, Track } from "@/utils/types";

export default function IndividualAlbumScreen() {
  const { id } = useLocalSearchParams();
  const { isLoading, tracks, fetchTracks, albums } = useMusicStore();

  const albumId = Number(id);

  const album = albums.find((album) => album.AlbumId === albumId) as Album;

  const tracksInAlbum = tracks.filter((track) => track.AlbumId === albumId);

  const handleBackPress = () => {
    router.push("/(tabs)/(albums)");
    return true;
  };

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", handleBackPress);

      return () => {
        BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
      };
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && <Spinner />}
      <Header />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{album.Title}</Text>
      </View>

      <View style={styles.trackListWrapper}>
        <TrackList
          tracks={tracksInAlbum}
          onRefresh={async () => await fetchTracks()}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2c2222",
    flex: 1,
  },
  header: {
    backgroundColor: "#3a2e2e",
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  trackListWrapper: {
    marginVertical: 5,
    flex: 1,
    height: "80%",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
});
