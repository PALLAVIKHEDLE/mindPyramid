import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Video } from 'expo-av';

const HomeScreen = () => {
  const [videoId, setVideoId] = useState('');
  const [videoThumbnail, setVideoThumbnail] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const youtubeApiKey = "AIzaSyBoDTPRS9QFCLQxTWZ9qOK0Zv4Z1VrR6ZM"; // Replace with your actual API key

  useEffect(() => {
    fetch(`https://www.googleapis.com/youtube/v3/search?key=${youtubeApiKey}&part=snippet&type=video&q=react%20native`)
      .then(response => response.json())
      .then(data => {
        console.log('data', data);
        const videoId = data.items[0].id.videoId;
        console.log('videoId', videoId);
        setVideoId(videoId);
        const thumbnailUrl = data.items[0].snippet.thumbnails.medium.url;
        console.log('thumbnailUrl', thumbnailUrl);
        setVideoThumbnail(thumbnailUrl);
        const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
        console.log('videoUrl', videoUrl);
        setVideoUrl(videoUrl);
      })
      .catch(error => console.error('Error fetching videos: ', error));
  }, []);

  return (
    <View style={styles.container}>
      {videoId ? (
        <>
          <Image source={{ uri: videoThumbnail }} style={styles.thumbnail} />
          <Video
            source={{ uri: videoUrl }}
            style={styles.video}
            useNativeControls
            resizeMode="contain"
            isLooping
            shouldPlay
          />
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnail: {
    width: 300,
    height: 200,
    marginBottom: 10,
  },
  video: {
    width: 300,
    height: 200,
  },
});

export default HomeScreen;
