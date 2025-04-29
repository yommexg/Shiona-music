import { SafeAreaView } from "react-native-safe-area-context";
import { Text, StyleSheet, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { useMusicStore } from "@/store/useMusicStore";

import Header from "@/components/Header";
import Spinner from "@/components/Spinner";
import { TrackList } from "@/components/TrackList";

export default function IndividualAlbumArtistScreen() {
  const { id } = useLocalSearchParams();
  const { isLoading, tracks, fetchTracks, albums } = useMusicStore();

  const albumId = Number(id);

  const album = albums.find((album) => album.AlbumId === albumId);

  const tracksInAlbum = tracks.filter((track) => track.AlbumId === albumId);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && <Spinner />}
      <Header />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {album ? album.Title : `Unknown Album`}
        </Text>
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
