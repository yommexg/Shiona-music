import { Ionicons } from "@expo/vector-icons";
import { View, Text, Image, TouchableOpacity } from "react-native";

const Header = () => {
  return (
    <View
      className="px-4 py-4 rounded-b-2xl shadow-lg shadow-black/30  flex-row justify-between items-center"
      style={{ justifyContent: "space-between" }}>
      <View className="flex-row items-center">
        <Image
          source={require("@/assets/images/icon.png")}
          className="w-20 h-20 mr-3"
          resizeMode="contain"
        />
        <Text className="text-white text-xl font-bold tracking-wide">
          Shiona Music
        </Text>
      </View>

      <Ionicons
        name="options"
        size={27}
        color="red"
        onPress={() => {}}
        style={{ paddingRight: 10 }}
      />
    </View>
  );
};

export default Header;
