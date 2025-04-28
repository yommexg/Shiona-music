import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AddGenre = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>AddGenre</Text>
    </SafeAreaView>
  );
};

export default AddGenre;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2c2222",
    flex: 1,
  },
});
