import { SafeAreaView } from "react-native-safe-area-context";
import { Text, StyleSheet, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { useMusicStore } from "@/store/useMusicStore";

import Header from "@/components/Header";
import Spinner from "@/components/Spinner";
import { AlbumList } from "@/components/AlbumList";

export default function IndividualArtistScreen() {
  const { id } = useLocalSearchParams();
  const { isLoading, albums, fetchAlbums, artists } = useMusicStore();

  const artistId = Number(id);

  const artist = artists.find((artist) => artist.ArtistId === artistId);

  const albumsInArtist = albums.filter((album) => album.ArtistId === artistId);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && <Spinner />}
      <Header />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {artist ? artist.Name : `Unknown Artist`}
        </Text>
      </View>

      <View style={styles.albumListWrapper}>
        <AlbumList
          pathname="./(album-artist)/[id]"
          albums={albumsInArtist}
          onRefresh={async () => await fetchAlbums()}
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
  albumListWrapper: {
    marginVertical: 5,
    flex: 1,
    height: "80%",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
});
