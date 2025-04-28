import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AddAlbum = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>AddAlbum</Text>
    </SafeAreaView>
  );
};

export default AddAlbum;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2c2222",
    flex: 1,
  },
});
