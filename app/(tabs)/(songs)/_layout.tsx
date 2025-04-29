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
      <Stack.Screen
        name="(add-song)"
        options={{
          title: "Add Song",
          headerStyle: {
            backgroundColor: "#1E1E1E",
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 18,
          },
        }}
      />
      <Stack.Screen
        name="(edit-song)"
        options={{
          title: "Edit Song",
          headerStyle: {
            backgroundColor: "#1E1E1E",
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 18,
          },
        }}
      />
    </Stack>
  );
}
