import { useState } from "react";
import {
  FlatList,
  Image,
  Text,
  View,
  StyleSheet,
  RefreshControl,
} from "react-native";
import { TrackListItem } from "./TrackListItem";
import { Track } from "@/utils/types";
import { useMusicStore } from "@/store/useMusicStore";

type TrackListProps = {
  tracks: Track[];
  onRefresh?: () => Promise<void>;
  loadMoreTracks?: () => Promise<void>;
};

export const TrackList = ({
  tracks,
  onRefresh,
  loadMoreTracks,
}: TrackListProps) => {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    if (!onRefresh) return;
    setRefreshing(true);
    await onRefresh();
    setRefreshing(false);
  };

  return (
    <FlatList
      data={tracks}
      contentContainerStyle={styles.listContainer}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      }
      onEndReached={loadMoreTracks}
      onEndReachedThreshold={0.5}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Image
            source={require("@/assets/images/unknown_track.png")}
            style={styles.emptyImage}
            resizeMode="contain"
          />
          <Text style={styles.emptyText}>No song Availiable 🎵</Text>
        </View>
      }
      renderItem={({ item: track }) => <TrackListItem track={track} />}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item.TrackId.toString()}
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
});
