import { Ionicons } from "@expo/vector-icons";
import { View, Text, Image, StyleSheet } from "react-native";
import { MusicOptions } from "./Options";
import { useAuthStore } from "@/store/useAuthStore";

const Header = () => {
  const { user } = useAuthStore();
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Image
          source={require("@/assets/images/icon.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <View>
          <Text style={styles.title}>Shiona Music</Text>
          <Text
            style={styles.user}
            numberOfLines={1}
            ellipsizeMode="tail">
            Welcome, {user}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 20,
        }}>
        <Image
          source={require("@/assets/images/unknown_artist.png")}
          style={styles.userImg}
          resizeMode="contain"
        />
        <MusicOptions>
          <Ionicons
            name="options"
            size={30}
            color="red"
            style={styles.icon}
          />
        </MusicOptions>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: "transparent",
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 80,
    height: 80,
    marginRight: 8,
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  icon: {
    paddingRight: 10,
  },

  user: {
    fontStyle: "italic",
    color: "#aaa",
    fontSize: 12,
    marginTop: 4,
    width: 100,
    textTransform: "capitalize",
  },

  userImg: {
    width: 30,
    height: 30,
    borderRadius: 24,
  },
});
