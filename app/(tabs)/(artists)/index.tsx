import Header from "@/components/Header";
import Spinner from "@/components/Spinner";
import { useMusicStore } from "@/store/useMusicStore";
import { StopPropagation } from "@/utils/stopPropagation";
import { Artist } from "@/utils/types";
import { Ionicons } from "@expo/vector-icons";
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

// Artist Card Component
const ArtistCard = ({ artist }: { artist: Artist }) => {
  return (
    <TouchableOpacity
      style={styles.artistCard}
      onPress={() =>
        router.push({
          pathname: "/[id]",
          params: { id: artist.ArtistId },
        })
      }>
      <Image
        source={require("@/assets/images/unknown_artist.png")}
        style={styles.artistImage}
      />
      <View style={styles.artistDetails}>
        <Text style={styles.artistName}>{artist.Name}</Text>
        <Text style={styles.artistSubtitle}>View Albums →</Text>
      </View>

      <StopPropagation>
        {/* <TrackOptions trackId={track.TrackId}> */}
        <Ionicons
          name="ellipsis-vertical"
          size={18}
          color="#fff"
        />
        {/* </TrackOptions> */}
      </StopPropagation>
    </TouchableOpacity>
  );
};

export default function ArtistScreen() {
  const { isLoading, fetchArtists, artists, currentPageArtists, totalArtists } =
    useMusicStore();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => await fetchArtists(1, 10);

  const handleRefresh = async () => {
    setRefreshing(true);
    await onRefresh();
    setRefreshing(false);
  };

  const loadMoreArtists = async () => {
    if (!isLoading && artists.length < totalArtists) {
      await fetchArtists(currentPageArtists + 1, 10);
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

  const renderArtist = ({ item }: { item: Artist }) => (
    <ArtistCard artist={item} />
  );

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && <Spinner />}
      <Header />
      <View style={styles.artistListWrapper}>
        <FlatList
          data={artists}
          renderItem={renderArtist}
          keyExtractor={(item) => item.ArtistId.toString()}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
            />
          }
          showsVerticalScrollIndicator={false}
          onEndReached={loadMoreArtists}
          onEndReachedThreshold={0.5}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Image
                source={require("@/assets/images/unknown_artist.png")}
                style={styles.emptyImage}
                resizeMode="contain"
              />
              <Text style={styles.emptyText}>No Artist Available 🧑‍🎨</Text>
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
  artistListWrapper: {
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
  artistCard: {
    backgroundColor: "#3a2e2e",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  artistTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  // artistName: {
  //   color: "#fff",
  //   fontSize: 14,
  // },
  releaseYear: {
    color: "#fff",
    fontSize: 12,
  },

  // artistCard: {
  //   backgroundColor: "#3a2e2e",
  //   padding: 12,
  //   borderRadius: 12,
  //   marginBottom: 16,
  //   flexDirection: "row",
  //   alignItems: "center",
  //   shadowColor: "#000",
  //   shadowOpacity: 0.2,
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowRadius: 6,
  //   elevation: 4,
  // },

  artistImage: {
    width: 55,
    height: 55,
    borderRadius: 100,
    marginRight: 15,
    backgroundColor: "#4e3f3f",
  },

  artistDetails: {
    flex: 1,
    justifyContent: "center",
  },

  artistName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  artistSubtitle: {
    color: "#bbb",
    fontSize: 13,
    marginTop: 4,
  },
});
