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
  StyleSheet,
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
      { text: "Cancel", style: "cancel" },
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
    <SafeAreaView style={styles.container}>
      {isLoading && <Spinner />}

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled">
          <View style={styles.innerContainer}>
            {/* Logo and Title */}
            <Animated.View
              style={styles.logoContainer}
              entering={FadeInDown.duration(200).springify()}>
              <Image
                source={require("@/assets/images/icon.png")}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.title}>Shiona Music</Text>
            </Animated.View>

            {/* Username Input */}
            <Animated.View
              entering={FadeInDown.delay(200).duration(300).springify()}>
              <TextInput
                placeholder="Username"
                placeholderTextColor="#aaa"
                value={user}
                onChangeText={setUser}
                style={styles.input}
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
                style={styles.input}
              />
            </Animated.View>

            {/* Login Button */}
            <Animated.View
              entering={FadeInDown.delay(400).duration(300).springify()}>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={() => login(user, password)}
                disabled={isLoading}>
                <Text style={styles.loginText}>Login</Text>
              </TouchableOpacity>
            </Animated.View>

            {/* Sign Up Prompt */}
            <Animated.View
              style={styles.signupRow}
              entering={FadeInDown.delay(600).duration(300).springify()}>
              <Text style={styles.signupText}>Don't have an account?</Text>
              <TouchableOpacity onPress={() => router.push("/register")}>
                <Text style={styles.signupLink}>Sign Up</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2c2222",
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: 144,
    height: 144,
    marginBottom: 16,
  },
  title: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    fontStyle: "italic",
    letterSpacing: 1,
  },
  input: {
    backgroundColor: "#1E1E1E",
    color: "white",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  loginButton: {
    backgroundColor: "#dc2626",
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  loginText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  signupRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  signupText: {
    color: "#a1a1aa",
  },
  signupLink: {
    color: "#ef4444",
    fontWeight: "600",
    marginLeft: 4,
  },
});
