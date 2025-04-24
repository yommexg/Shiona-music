import Spinner from "@/components/Spinner";
import { useAuthStore } from "@/store/useAuthStore";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { logout, isLoading } = useAuthStore();

  return (
    <SafeAreaView>
      {isLoading && <Spinner />}
      <TouchableOpacity onPress={() => logout()}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
