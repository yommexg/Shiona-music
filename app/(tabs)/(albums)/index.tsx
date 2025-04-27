import Header from "@/components/Header";
import Spinner from "@/components/Spinner";
import { useMusicStore } from "@/store/useMusicStore";
import { Album } from "@/utils/types";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  Alert,
  BackHandler,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Album Card Component
const AlbumCard = ({ album }: { album: Album }) => {
  return (
    <TouchableOpacity
      style={styles.albumCard}
      onPress={() =>
        router.push({
          pathname: "/[id]",
          params: { id: album.AlbumId },
        })
      }>
      <Text style={styles.albumTitle}>{album.Title}</Text>
      <Text style={styles.artistName}>{album.Artist.Name}</Text>
      <Text style={styles.releaseYear}>{album.ReleaseYear}</Text>
    </TouchableOpacity>
  );
};

export default function AlbumScreen() {
  const { isLoading, fetchAlbums, albums, currentPageAlbums, totalAlbums } =
    useMusicStore();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => await fetchAlbums(1, 10);

  const handleRefresh = async () => {
    setRefreshing(true);
    await onRefresh();
    setRefreshing(false);
  };

  const loadMoreAlbums = async () => {
    if (!isLoading && albums.length < totalAlbums) {
      await fetchAlbums(currentPageAlbums + 1, 10);
    }
  };

  const handleBackPress = () => {
    Alert.alert("Exit Shiona Music App", "Are you sure you want to quit?", [
      { text: "Cancel", onPress: () => null, style: "cancel" },
      { text: "YES", onPress: () => BackHandler.exitApp() },
    ]);
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

  const renderAlbum = ({ item }: { item: Album }) => <AlbumCard album={item} />;

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && <Spinner />}
      <Header />
      <View style={styles.albumListWrapper}>
        <FlatList
          data={albums}
          renderItem={renderAlbum}
          keyExtractor={(item) => item.AlbumId.toString()}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
            />
          }
          showsVerticalScrollIndicator={false}
          onEndReached={loadMoreAlbums}
          onEndReachedThreshold={0.5}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Image
                source={require("@/assets/images/unknown_track.png")}
                style={styles.emptyImage}
                resizeMode="contain"
              />
              <Text style={styles.emptyText}>No Album Available 📂</Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2c2222",
    flex: 1,
  },
  albumListWrapper: {
    marginVertical: 5,
    flex: 1,
    height: "80%",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  listContainer: {
    paddingTop: 10,
    paddingBottom: 128,
  },
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
    gap: 20,
  },
  emptyImage: {
    width: 80,
    height: 80,
  },
  emptyText: {
    color: "white",
    fontSize: 18,
  },
  albumCard: {
    backgroundColor: "#3a2e2e",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  albumTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  artistName: {
    color: "#fff",
    fontSize: 14,
  },
  releaseYear: {
    color: "#fff",
    fontSize: 12,
  },
});
