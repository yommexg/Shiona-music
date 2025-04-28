import { Tabs } from "expo-router";
import { FontAwesome, FontAwesome6, Ionicons } from "@expo/vector-icons";
import FloatingPlayer from "@/components/FloatingPlayer";
import { useAuthStore } from "@/store/useAuthStore";
import { useMusicStore } from "@/store/useMusicStore";
import { useEffect } from "react";

export default function TabLayout() {
  const { fetchTracks, fetchAlbums, fetchArtists, fetchGenres } =
    useMusicStore();
  const { token } = useAuthStore();

  useEffect(() => {
    if (token) {
      fetchTracks();
      fetchAlbums();
      fetchArtists();
      fetchGenres();
    }
  }, [token]);

  return (
    <>
      <Tabs
        initialRouteName="(songs)"
        screenOptions={{
          tabBarActiveTintColor: "red",
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: "500",
          },
          headerShown: false,
          tabBarStyle: {
            position: "absolute",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderTopWidth: 0,
            backgroundColor: "#1E1E1E",
          },
        }}>
        <Tabs.Screen
          name="(genres)"
          options={{
            title: "Genres",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome
                name="book"
                size={size}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="(albums)"
          options={{
            title: "Albums",
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="albums"
                size={size}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="(songs)"
          options={{
            title: "Songs",
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="musical-notes-sharp"
                size={size}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="(artists)"
          options={{
            title: "Artists",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome6
                name="users-line"
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
      <FloatingPlayer />
    </>
  );
}
