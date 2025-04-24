import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeInDown } from "react-native-reanimated";
import { router } from "expo-router";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = () => {
    setIsLoading(true);
    // Simulate registration call
    setTimeout(() => {
      setIsLoading(false);
      // Proceed with actual registration logic
    }, 2000);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#463838]">
      {isLoading && (
        <View className="absolute z-50 w-full h-full justify-center items-center">
          <View className="absolute w-full h-full bg-black opacity-40" />
          <ActivityIndicator
            size="large"
            color="#fff"
          />
        </View>
      )}

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
              entering={FadeInDown.springify()}>
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
            <Animated.View entering={FadeInDown.delay(200).springify()}>
              <TextInput
                placeholder="Email"
                placeholderTextColor="#aaa"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                className="bg-[#1E1E1E] text-white px-4 py-3 rounded-2xl mb-4 border border-[#2a2a2a]"
              />
            </Animated.View>

            {/* Password Input */}
            <Animated.View entering={FadeInDown.delay(300).springify()}>
              <TextInput
                placeholder="Password"
                placeholderTextColor="#aaa"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                className="bg-[#1E1E1E] text-white px-4 py-3 rounded-2xl mb-4 border border-[#2a2a2a]"
              />
            </Animated.View>

            {/* Confirm Password Input */}
            <Animated.View entering={FadeInDown.delay(400).springify()}>
              <TextInput
                placeholder="Confirm Password"
                placeholderTextColor="#aaa"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                className="bg-[#1E1E1E] text-white px-4 py-3 rounded-2xl mb-6 border border-[#2a2a2a]"
              />
            </Animated.View>

            {/* Register Button */}
            <Animated.View entering={FadeInDown.delay(500).springify()}>
              <TouchableOpacity
                className="bg-red-600 rounded-2xl py-3 mb-4 items-center"
                onPress={handleRegister}
                disabled={isLoading}>
                <Text className="text-white text-lg font-semibold">
                  Register
                </Text>
              </TouchableOpacity>
            </Animated.View>

            {/* Already have an account */}
            <Animated.View
              className="flex-row justify-center mt-6"
              entering={FadeInDown.delay(600).springify()}>
              <Text className="text-gray-400">Already have an account?</Text>
              <TouchableOpacity onPress={() => router.push("/login")}>
                <Text className="text-red-500 font-semibold ml-1">Login</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
