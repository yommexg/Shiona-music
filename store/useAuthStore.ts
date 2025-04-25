import { Alert } from "react-native";
import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "./baseApi";
import { router } from "expo-router";

interface AuthState {
  user: string;
  token: string | null;
  isLoading: boolean;
  login: (user: string, password: string) => Promise<void>;
  register: (user: string, password: string) => Promise<void>;
  logout: () => void;
  loadToken: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: "",
  token: null,
  isLoading: false,

  login: async (user, password) => {
    set({ isLoading: true });
    try {
      if (!user || !password) {
        Alert.alert(
          "Missing Credentials",
          "Please enter both user and password."
        );
        set({ isLoading: false });
        return;
      }

      const response = await fetch(`${BASE_URL}/api/Auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Username: user, Password: password }),
      });

      const data = await response.json();
      if (response.ok) {
        await AsyncStorage.setItem("token", data.token);
        set({ user, token: data.token });
        router.replace("/(tabs)/(songs)");
      } else {
        Alert.alert("Login Failed", "Oops !!, Something went wrong");
        // throw new Error(data.message || "Login failed");
      }
    } catch (error) {
      Alert.alert("Login Failed", "Oops !!, Something went wrong");
      //   console.error("Login error:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  register: async (user, password) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`${BASE_URL}/api/Auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Username: user, Password: password }),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert(
          "Registration Successful",
          "Congratulations, You can now login"
        );
        set({ isLoading: false });
        router.push("/login");
      } else {
        Alert.alert("Registration Failed", "Oops !!, Something went wrong");
        throw new Error(data.message || "Registration failed");
      }
    } catch (error) {
      Alert.alert("Registration Failed", "Oops !!, Something went wrong");
      //   console.error("Register error:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    await AsyncStorage.removeItem("token");
    set({ token: null });
    router.push("/login");
  },

  loadToken: async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      set({ token });
      router.replace("/(tabs)/(songs)");
    } else {
      router.replace("/(auth)/login");
    }
  },
}));
