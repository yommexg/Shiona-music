import { Stack } from "expo-router";

export default function GenresLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(add-genre)"
        options={{
          title: "Add Genre",
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
        name="(edit-genre)"
        options={{
          title: "Edit Genre",
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
