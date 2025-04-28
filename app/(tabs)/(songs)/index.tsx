import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { Alert, BackHandler, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useMusicStore } from "@/store/useMusicStore";

import Header from "@/components/Header";
import Spinner from "@/components/Spinner";
import { TrackList } from "@/components/TrackList";

export default function SongScreen() {
  const { isLoading, fetchTracks, tracks, currentPageTracks, totalTracks } =
    useMusicStore();

  const handleBackPress = () => {
    Alert.alert("Exit Shiona Music App", "Are you sure you want to quit?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
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

  const loadMoreTracks = async () => {
    if (!isLoading && tracks.length < totalTracks) {
      await fetchTracks(currentPageTracks + 1, 10);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && <Spinner />}
      <Header />
      <View style={styles.trackListWrapper}>
        <TrackList
          tracks={tracks}
          onRefresh={async () => await fetchTracks()}
          loadMoreTracks={loadMoreTracks}
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
  trackListWrapper: {
    marginVertical: 5,
    flex: 1,
    height: "80%",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
});
