import Header from "@/components/Header";
import { GenreOptions } from "@/components/Options";
import { useMusicStore } from "@/store/useMusicStore";
import { StopPropagation } from "@/utils/stopPropagation";
import { Genre } from "@/utils/types";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  Alert,
  BackHandler,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const GenreCard = ({ genre }: { genre: Genre }) => {
  return (
    <TouchableOpacity
      style={styles.genreCard}
      onPress={() => {
        router.push({
          pathname: "/[id]",
          params: { id: genre.GenreId },
        });
      }}>
      <View style={styles.menuContainer}>
        <StopPropagation>
          <GenreOptions genreId={genre.GenreId}>
            <Ionicons
              name="ellipsis-vertical"
              size={18}
              color="#fff"
            />
          </GenreOptions>
        </StopPropagation>
      </View>

      <FontAwesome
        name="book"
        size={32}
        color="white"
      />
      <Text style={styles.genreName}>{genre.Name}</Text>
    </TouchableOpacity>
  );
};

export default function GenreScreen() {
  const { isLoading, fetchGenres, genres, currentPageGenres, totalGenres } =
    useMusicStore();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => await fetchGenres(1, 10);

  const handleRefresh = async () => {
    setRefreshing(true);
    await onRefresh();
    setRefreshing(false);
  };

  const loadMoreGenres = async () => {
    if (!isLoading && genres.length < totalGenres) {
      await fetchGenres(currentPageGenres + 1, 10);
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

  const renderGenre = ({ item }: { item: Genre }) => <GenreCard genre={item} />;

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <FlatList
        data={genres}
        keyExtractor={(item) => item.GenreId.toString()}
        renderItem={renderGenre}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMoreGenres}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <FontAwesome
              name="book"
              size={50}
              color="white"
            />
            <Text style={styles.emptyText}>No Genre Available 📖</Text>
          </View>
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2c2222",
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 100,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 20,
  },
  genreCard: {
    backgroundColor: "#3a2e2e",
    flex: 1,
    borderRadius: 12,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    height: 140,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    position: "relative",
  },
  menuContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 10,
  },
  genreName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
    gap: 20,
  },
  emptyText: {
    color: "white",
    fontSize: 18,
  },
});
