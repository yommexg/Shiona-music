import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import { useMusicStore } from "@/store/useMusicStore";
import Spinner from "@/components/Spinner";

const EditAlbum = () => {
  const { artists, editAlbum, isLoading } = useMusicStore();

  const [title, setTitle] = useState("");
  const [artistId, setArtistId] = useState<number | null>(null);
  const [releaseYear, setReleaseYear] = useState("");

  const handleSubmit = async () => {
    if (!title || !artistId || !releaseYear) {
      Alert.alert("Validation", "All fields are required.");
      return;
    }

    const newAlbum = {
      Title: title,
      ArtistId: artistId,
      ReleaseYear: parseInt(releaseYear),
    };

    await editAlbum(newAlbum);
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && <Spinner />}
      <ScrollView contentContainerStyle={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter album title"
          placeholderTextColor="#999"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Artist</Text>
        <Picker
          selectedValue={artistId}
          onValueChange={(value) => setArtistId(value)}
          style={styles.picker}>
          <Picker.Item
            label="Select artist"
            value={null}
          />
          {artists.map((artist) => (
            <Picker.Item
              key={artist.ArtistId}
              label={artist.Name}
              value={artist.ArtistId}
            />
          ))}
        </Picker>

        <Text style={styles.label}>Release Year</Text>
        <Picker
          selectedValue={releaseYear}
          onValueChange={(value) => setReleaseYear(value)}
          style={styles.picker}>
          <Picker.Item
            label="Select year"
            value=""
          />
          {Array.from({ length: 50 }, (_, i) => {
            const year = new Date().getFullYear() - i;
            return (
              <Picker.Item
                key={year}
                label={year.toString()}
                value={year.toString()}
              />
            );
          })}
        </Picker>

        <View style={styles.buttonContainer}>
          <Button
            title="Add Album"
            onPress={handleSubmit}
            color="red"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditAlbum;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2c2222",
    flex: 1,
  },
  form: {
    padding: 20,
  },
  label: {
    color: "white",
    marginBottom: 8,
    fontSize: 16,
  },
  input: {
    borderColor: "#555",
    borderWidth: 1,
    padding: 10,
    marginBottom: 16,
    borderRadius: 6,
    color: "white",
  },
  picker: {
    backgroundColor: "#1e1e1e",
    color: "white",
    marginBottom: 16,
  },
  buttonContainer: {
    marginTop: 10,
  },
});
