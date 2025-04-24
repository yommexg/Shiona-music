import React from "react";
import { Stack, Tabs } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Tabs.Screen
        name="login"
        options={{
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="register"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
