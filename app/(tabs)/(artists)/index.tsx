import Header from "@/components/Header";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { Alert, BackHandler, Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ArtistScreen() {
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

  return (
    <SafeAreaView className="flex-1 bg-[#2c2222]">
      <Header />
      <View className="flex-1 justify-center items-center">
        <Text className="text-white text-lg">Your Artist go here 🎵</Text>
      </View>
    </SafeAreaView>
  );
}
