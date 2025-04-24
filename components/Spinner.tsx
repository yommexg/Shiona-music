import { View, Text, ActivityIndicator } from "react-native";

const Spinner = () => {
  return (
    <View className="absolute z-50 w-full h-full justify-center items-center">
      <View className="absolute w-full h-full bg-black opacity-40" />
      <ActivityIndicator
        size="large"
        color="#fff"
      />
    </View>
  );
};

export default Spinner;
