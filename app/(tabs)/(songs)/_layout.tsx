import Header from "@/components/Header";
import { Stack } from "expo-router";

export default function SongLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
