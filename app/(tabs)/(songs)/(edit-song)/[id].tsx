import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMusicStore } from "@/store/useMusicStore";
import Spinner from "@/components/Spinner";
import { useLocalSearchParams } from "expo-router";

const EditSong = () => {
  const { id } = useLocalSearchParams();
  const { genres, albums, editTrack, tracks, isLoading } = useMusicStore();

  const trackId = Number(id);

  const track = tracks.find((track) => track.TrackId === trackId);

  const [title, setTitle] = useState(track?.Title ?? "");
  const [albumId, setAlbumId] = useState<number | null>(track?.AlbumId ?? null);
  const [genreId, setGenreId] = useState<number | null>(track?.GenreId ?? null);
  const [duration, setDuration] = useState(String(track?.Duration ?? ""));

  const handleSubmit = async () => {
    if (!title || !albumId || !genreId || !duration) {
      Alert.alert("Missing Fields", "Please fill in all fields.");
      return;
    }

    const updateSong = {
      Title: title,
      AlbumId: albumId,
      GenreId: genreId,
      Duration: Number(duration),
    };

    await editTrack(updateSong, trackId);
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && <Spinner />}
      <ScrollView contentContainerStyle={styles.inner}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Enter song title"
          placeholderTextColor="#aaa"
          style={styles.input}
        />

        <Text style={styles.label}>Select Album</Text>
        <RNPickerSelect
          onValueChange={(value) => setAlbumId(value)}
          items={albums.map((album) => ({
            label: album.Title,
            value: album.AlbumId,
          }))}
          placeholder={{ label: "Choose an album...", value: null }}
          style={pickerStyles}
          value={albumId}
        />

        <Text style={styles.label}>Select Genre</Text>
        <RNPickerSelect
          onValueChange={(value) => setGenreId(value)}
          items={genres.map((genre) => ({
            label: genre.Name,
            value: genre.GenreId,
          }))}
          placeholder={{ label: "Choose a genre...", value: null }}
          style={pickerStyles}
          value={genreId}
        />

        <Text style={styles.label}>Duration (seconds)</Text>
        <TextInput
          value={duration}
          onChangeText={setDuration}
          placeholder="e.g., 210"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}>
          <Text style={styles.buttonText}>Edit Song</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditSong;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2c2222",
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

const pickerStyles = {
  inputIOS: {
    backgroundColor: "#3a2e2e",
    padding: 12,
    borderRadius: 6,
    color: "white",
    fontSize: 16,
    marginTop: 5,
  },
  inputAndroid: {
    backgroundColor: "#3a2e2e",
    padding: 12,
    borderRadius: 6,
    color: "white",
    fontSize: 16,
    marginTop: 5,
  },
};
