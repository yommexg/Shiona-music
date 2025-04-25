import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { MenuProvider } from "react-native-popup-menu";

import "react-native-reanimated";

import "@/styles/global.css";
import { useAuthStore } from "@/store/useAuthStore";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const { loadToken } = useAuthStore();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
    loadToken();
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <MenuProvider>
      <Stack>
        <Stack.Screen
          name="(auth)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="light" />
    </MenuProvider>
  );
}
