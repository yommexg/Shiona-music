import { View, ActivityIndicator, StyleSheet } from "react-native";

const Spinner = () => {
  return (
    <View style={styles.container}>
      <View style={styles.overlay} />
      <ActivityIndicator
        size="large"
        color="#fff"
      />
    </View>
  );
};

export default Spinner;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 50,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "black",
    opacity: 0.4,
  },
});
