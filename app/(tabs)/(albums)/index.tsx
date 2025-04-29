import { AlbumList } from "@/components/AlbumList";
import Header from "@/components/Header";
import Spinner from "@/components/Spinner";
import { useMusicStore } from "@/store/useMusicStore";

import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { Alert, BackHandler, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AlbumScreen() {
  const { isLoading, fetchAlbums, albums, currentPageAlbums, totalAlbums } =
    useMusicStore();

  const onRefresh = async () => await fetchAlbums(1, 10);

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

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && <Spinner />}
      <Header />
      <View style={styles.albumListWrapper}>
        <AlbumList
          albums={albums}
          pathname="./[id]"
          loadMoreAlbums={loadMoreAlbums}
          onRefresh={onRefresh}
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
});
