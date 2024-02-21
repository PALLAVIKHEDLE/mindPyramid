import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const API_KEY = 'AIzaSyBoDTPRS9QFCLQxTWZ9qOK0Zv4Z1VrR6ZM'; // Your YouTube Data API key
const SEARCH_QUERY = 'nature sounds'; // Your search query

export default function PlayScreen() {
  const navigation = useNavigation();
  const [videoList, setVideoList] = useState([]);

  useEffect(() => {
    // Fetch video data from YouTube API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${SEARCH_QUERY}&key=${API_KEY}`
        );
        setVideoList(response.data.items);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleVideoPress = (videoId,thumbnailUrl) => {
    console.log('handleVideoPress',videoId,thumbnailUrl)
    navigation.navigate('VideoPlayer', { videoId ,thumbnailUrl});
  };

  return (
    <View style={styles.container}>
      {videoList.map((video,index) => (
        <TouchableOpacity
          key={index}
          style={styles.videoItem}
          onPress={() => handleVideoPress(video.id.videoId, video.snippet.thumbnails.medium.url)}>
          <Image
            source={{ uri: video.snippet.thumbnails.medium.url }}
            style={styles.thumbnail}
          />
          <Text style={styles.videoTitle}>{video.snippet.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  thumbnail: {
    width: 120,
    height: 90,
    marginRight: 10,
  },
  videoTitle: {
    fontSize: 18,
  },
});
