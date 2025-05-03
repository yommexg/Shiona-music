import { useState } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
} from "react-native";

import { Album } from "@/utils/types";
import { Ionicons } from "@expo/vector-icons";
import { ExternalPathString, RelativePathString, router } from "expo-router";
import { AlbumOptions } from "./Options";
import { StopPropagation } from "@/utils/stopPropagation";

type AlbumListProps = {
  albums: Album[];
  pathname: RelativePathString | ExternalPathString;
  onRefresh?: () => Promise<void>;
  loadMoreAlbums?: () => Promise<void>;
};

const AlbumCard = ({
  album,
  pathname,
}: {
  album: Album;
  pathname: RelativePathString | ExternalPathString;
}) => {
  return (
    <TouchableOpacity
      style={styles.albumCard}
      onPress={() =>
        router.push({
          pathname,
          params: { id: album.AlbumId },
        })
      }>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
        <Ionicons
          name="albums"
          size={35}
          color="white"
        />
        <View>
          <Text style={styles.albumTitle}>{album.Title}</Text>
          <Text style={styles.artistName}>{album.Artist.Name}</Text>
          <Text style={styles.releaseYear}>{album.ReleaseYear}</Text>
        </View>
      </View>
      <View>
        <StopPropagation>
          <AlbumOptions albumId={album.AlbumId}>
            <Ionicons
              name="ellipsis-vertical"
              size={18}
              color="#fff"
            />
          </AlbumOptions>
        </StopPropagation>
      </View>
    </TouchableOpacity>
  );
};

export const AlbumList = ({
  albums,
  onRefresh,
  loadMoreAlbums,
  pathname,
}: AlbumListProps) => {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    if (!onRefresh) return;
    setRefreshing(true);
    await onRefresh();
    setRefreshing(false);
  };

  const renderAlbum = ({ item }: { item: Album }) => (
    <AlbumCard
      album={item}
      pathname={pathname}
    />
  );

  return (
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
          <Ionicons
            name="albums"
            size={60}
            color="white"
          />
          <Text style={styles.emptyText}>No Album Available 📂</Text>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
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
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    justifyContent: "space-between",
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
