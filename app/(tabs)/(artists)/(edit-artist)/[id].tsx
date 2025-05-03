import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMusicStore } from "@/store/useMusicStore";
import Spinner from "@/components/Spinner";
import { useLocalSearchParams } from "expo-router";

const EditArtist = () => {
  const { editArtist, isLoading, artists } = useMusicStore();
  const { id } = useLocalSearchParams();

  const artistId = Number(id);

  const artist = artists.find((artist) => artist.ArtistId === artistId);

  const [name, setName] = useState(artist?.Name ?? "");

  const handleSubmit = async () => {
    if (!name.trim()) {
      Alert.alert("Validation Error", "Artist name cannot be empty.");
      return;
    }

    await editArtist({ Name: name }, artistId);
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && <Spinner />}
      <ScrollView contentContainerStyle={styles.inner}>
        <Text style={styles.label}>Artist Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Artist name"
          placeholderTextColor="#aaa"
          value={name}
          onChangeText={setName}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}>
          <Text style={styles.buttonText}>Edit Artist Name</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditArtist;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2c2222",
    flex: 1,
  },
  inner: {
    padding: 20,
    gap: 20,
  },
  label: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#3a2e2e",
    padding: 12,
    borderRadius: 6,
    color: "white",
    fontSize: 16,
  },
  button: {
    backgroundColor: "red",
    padding: 14,
    borderRadius: 6,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});
