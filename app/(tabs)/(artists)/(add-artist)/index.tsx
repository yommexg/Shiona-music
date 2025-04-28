import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AddArtist = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>AddArtist</Text>
    </SafeAreaView>
  );
};

export default AddArtist;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2c2222",
    flex: 1,
  },
});
