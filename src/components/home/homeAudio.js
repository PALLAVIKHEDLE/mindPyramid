import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, FlatList, Text } from 'react-native';
import { Audio } from 'expo-av';

const HomeScreen = () => {
  const [songs, setSongs] = useState([]);
  const [sound, setSound] = useState(null);

  useEffect(() => {
    async function fetchSongs() {
      try {
        const youtubeApiKey = "AIzaSyBoDTPRS9QFCLQxTWZ9qOK0Zv4Z1VrR6ZM"; // Replace with your YouTube Data API key
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${youtubeApiKey}&part=snippet&type=video&q=react%20native`);
        const data = await response.json();
        console.log('Fetched songs:', data.items);
        setSongs(data.items);
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    }

    fetchSongs();

    return () => {
      if (sound !== null) {
        console.log('Unloading sound');
        sound.unloadAsync();
      }
    };
  }, []);

  const playSound = async (videoId) => {
    try {
      console.log('Attempting to play sound');
      if (sound !== null) {
        console.log('Unloading previous sound');
        await sound.unloadAsync();
      }
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: `https://www.youtube.com/watch?v=${videoId}` }
      );
      console.log('Sound loaded:', newSound);
      setSound(newSound);
      await newSound.playAsync();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  const renderSong = ({ item }) => (
    <TouchableOpacity onPress={() => playSound(item.id.videoId)}>
      <Image source={{ uri: item.snippet.thumbnails.medium.url }} style={styles.thumbnail} />
      <Text style={styles.title}>{item.snippet.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={songs}
        renderItem={renderSong}
        keyExtractor={(item) => item.id.videoId}
        contentContainerStyle={styles.songList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  songList: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  thumbnail: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  title: {
    textAlign: 'center',
  },
});

export default HomeScreen;
