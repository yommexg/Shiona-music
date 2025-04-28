import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AddSong = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>AddSong</Text>
    </SafeAreaView>
  );
};

export default AddSong;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2c2222",
    flex: 1,
  },
});
