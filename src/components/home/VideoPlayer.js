import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Video } from 'expo-av';
import PlayerControls from './PlayerControls';

export default function VideoPlayerScreen({ route }) {
  const { videoId } = route.params;

  return (
    <View style={styles.container}>
      <Video
        source={{ uri: `https://www.youtube.com/watch?v=${videoId}` }}
        style={styles.video}
        useNativeControls // This enables native playback controls
        resizeMode="contain" // Adjust this as needed
        shouldPlay // This will start the video automatically
      />
      <Text>Video Player Screen</Text>
      <Text>Video ID: {videoId}</Text>
      {/* <PlayerControls videoId={videoId} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    width: '100%',
    height: 300,
  },
});
