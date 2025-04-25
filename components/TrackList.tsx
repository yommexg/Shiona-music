import { FlatList, Image, Text, View, StyleSheet } from "react-native";
import { TrackListItem } from "./TrackListItem";
import { Track } from "@/utils/types";

type TrackListProps = {
  tracks: Track[];
};

export const TrackList = ({ tracks }: TrackListProps) => {
  return (
    <FlatList
      data={tracks}
      contentContainerStyle={styles.listContainer}
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
