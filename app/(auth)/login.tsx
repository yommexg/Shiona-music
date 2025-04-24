import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  BackHandler,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeInDown } from "react-native-reanimated";
import { router, useFocusEffect } from "expo-router";

import { useAuthStore } from "@/store/useAuthStore";

import Spinner from "@/components/Spinner";

export default function LoginScreen() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useAuthStore();

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
      {isLoading && <Spinner />}

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled">
          <View className="flex-1 justify-center px-6">
            {/* Logo and Title */}
            <Animated.View
              className="items-center mb-10"
              entering={FadeInDown.duration(200).springify()}>
              <Image
                source={require("@/assets/images/icon.png")}
                className="w-36 h-36 mb-4"
                resizeMode="contain"
              />
              <Text className="text-white text-3xl font-bold italic tracking-wide">
                Shiona Music
              </Text>
            </Animated.View>

            {/* Email Input */}
            <Animated.View
              entering={FadeInDown.delay(200).duration(300).springify()}>
              <TextInput
                placeholder="Username"
                placeholderTextColor="#aaa"
                value={user}
                onChangeText={setUser}
                className="bg-[#1E1E1E] text-white px-4 py-3 rounded-2xl mb-4 border border-[#2a2a2a]"
              />
            </Animated.View>

            {/* Password Input */}
            <Animated.View
              entering={FadeInDown.delay(300).duration(300).springify()}>
              <TextInput
                placeholder="Password"
                placeholderTextColor="#aaa"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                className="bg-[#1E1E1E] text-white px-4 py-3 rounded-2xl mb-6 border border-[#2a2a2a]"
              />
            </Animated.View>

            {/* Login Button */}
            <Animated.View
              entering={FadeInDown.delay(400).duration(300).springify()}>
              <TouchableOpacity
                className="bg-red-600 rounded-2xl py-3 mb-4 items-center"
                onPress={() => login(user, password)}
                disabled={isLoading}>
                <Text className="text-white text-lg font-semibold">Login</Text>
              </TouchableOpacity>
            </Animated.View>

            {/* Sign Up */}
            <Animated.View
              className="flex-row justify-center mt-6"
              entering={FadeInDown.delay(600).duration(300).springify()}>
              <Text className="text-gray-400">Don't have an account?</Text>
              <TouchableOpacity onPress={() => router.push("/register")}>
                <Text className="text-red-500 font-semibold ml-1">Sign Up</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
