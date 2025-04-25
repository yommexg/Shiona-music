import { Ionicons } from "@expo/vector-icons";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { MusicOptions } from "./Options";

const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Image
          source={require("@/assets/images/icon.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Shiona Music</Text>
      </View>
      <MusicOptions>
        <Ionicons
          name="options"
          size={30}
          color="red"
          style={styles.icon}
        />
      </MusicOptions>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
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
    marginRight: 12,
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
});
