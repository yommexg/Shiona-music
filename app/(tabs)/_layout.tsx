import { Tabs } from "expo-router";
import { FontAwesome, FontAwesome6, Ionicons } from "@expo/vector-icons";
import FloatingPlayer from "@/components/FloatingPlayer";
import { useAuthStore } from "@/store/useAuthStore";
import { useMusicStore } from "@/store/useMusicStore";
import { useEffect } from "react";

export default function TabLayout() {
  const { fetchTracks, fetchAlbums } = useMusicStore();
  const { token } = useAuthStore();

  useEffect(() => {
    if (token) {
      fetchTracks();
      fetchAlbums();
    }
  }, [token]);

  return (
    <>
      <Tabs
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
            tabBarIcon: ({ color }) => (
              <Ionicons
                name="musical-notes-sharp"
                size={24}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="(artists)"
          options={{
            title: "Artists",
            tabBarIcon: ({ color }) => (
              <FontAwesome6
                name="users-line"
                size={20}
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
