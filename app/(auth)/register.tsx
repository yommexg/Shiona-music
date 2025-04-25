import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeInDown } from "react-native-reanimated";
import { router } from "expo-router";
import { useAuthStore } from "@/store/useAuthStore";
import Spinner from "@/components/Spinner";

export default function RegisterScreen() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { register, isLoading } = useAuthStore();

  const handleRegister = async () => {
    if (!user || !password || !confirmPassword) {
      Alert.alert("Missing Fields", "Please fill in all fields.");
      return;
    } else if (password !== confirmPassword) {
      Alert.alert("Password Mismatch", "Passwords do not match.");
      return;
    } else {
      register(user, password);
    }
  };

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
              entering={FadeInDown.springify()}>
              <Image
                source={require("@/assets/images/icon.png")}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.title}>Shiona Music</Text>
            </Animated.View>

            {/* Username Input */}
            <Animated.View entering={FadeInDown.delay(200).springify()}>
              <TextInput
                placeholder="Username"
                placeholderTextColor="#aaa"
                value={user}
                onChangeText={setUser}
                style={styles.input}
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
                style={styles.input}
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
                style={styles.input}
              />
            </Animated.View>

            {/* Register Button */}
            <Animated.View entering={FadeInDown.delay(500).springify()}>
              <TouchableOpacity
                style={styles.button}
                onPress={handleRegister}
                disabled={isLoading}>
                <Text style={styles.buttonText}>Register</Text>
              </TouchableOpacity>
            </Animated.View>

            {/* Login Link */}
            <Animated.View
              style={styles.loginRow}
              entering={FadeInDown.delay(600).springify()}>
              <Text style={styles.loginText}>Already have an account?</Text>
              <TouchableOpacity onPress={() => router.push("/login")}>
                <Text style={styles.loginLink}>Login</Text>
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
  button: {
    backgroundColor: "#dc2626",
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  loginRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  loginText: {
    color: "#a1a1aa",
  },
  loginLink: {
    color: "#ef4444",
    fontWeight: "600",
    marginLeft: 4,
  },
});
