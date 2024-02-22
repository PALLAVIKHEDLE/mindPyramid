import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

// Import images from assets folder
import natureImage from "../../assets/nature.jpeg";
import bodyScanImage from "../../assets/bodyScan.jpeg";
import mindfulnessImage from "../../assets/mindfullness.jpeg";
import waterImage from "../../assets/water.jpeg";
import yogaImage from '../../assets/yoga.jpeg'
import movementImage from '../../assets/Movement.jpeg'
import soundImage from '../../assets/sound.jpeg'
import transcendentalImage from '../../assets/transcendental.jpeg'
import lovingKindnessImage from '../../assets/Loving-Kindness.jpeg'
import guidedImage from '../../assets/guided.jpeg'
const API_KEY = "AIzaSyBDoueRdkSmBjjG0yquqIYypvCA13k3uGo";

const SEARCH_QUERY = "nature sounds"; // Your search query

export default function PlayScreen() {
  const navigation = useNavigation();
  const [videoList, setVideoList] = useState([]);
  const [storyList, setStoryList] = useState([]);

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

    // Fetch story data
    const stories = [
      { id: 1, imageUrl: natureImage, text: "Nature" },
      { id: 2, imageUrl: guidedImage, text: "Guided" },
      { id: 3, imageUrl: yogaImage, text: "Yoga" },
      { id: 4, imageUrl: movementImage, text: "Movement" },
      { id: 5, imageUrl: waterImage, text: "Water" },
      { id: 6, imageUrl: lovingKindnessImage, text: "Loving-Kindness" },
      { id: 7, imageUrl: bodyScanImage, text: "Body Scan" },
      { id: 8, imageUrl: mindfulnessImage, text: "Mindfulness" },
      { id: 9, imageUrl: soundImage, text: "Sound" },
      { id: 10, imageUrl: transcendentalImage, text: "Transcendental" },
    ];

    setStoryList(stories);
  }, []);

  const handleVideoPress = (videoId) => {
    navigation.navigate("VideoPlayer", { videoId: videoId });
  };

  return (
    <LinearGradient
      colors={['#CADFED', '#EDF5F9']}
      style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}>
        {storyList.map((story, index) => (
          <TouchableOpacity
            key={story.id}
            style={styles.storyItem}
            onPress={() => console.log("Story clicked:", story.text)}>
            <Image
              source={story.imageUrl}
              style={styles.storyThumbnail}
              onError={(error) => console.log("Image loading error:", error.nativeEvent.error)}
            />
            <Text style={styles.storyText}>{story.text}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* List of videos */}
      {videoList.map((video, index) => (
        <TouchableOpacity
          key={index}
          style={styles.videoItem}
          onPress={() => handleVideoPress(video.id.videoId)}>
          <Image
            source={{ uri: video.snippet.thumbnails.medium.url }}
            style={styles.thumbnail}
          />
          <Text style={styles.videoTitle}>{video.snippet.title}</Text>
        </TouchableOpacity>
      ))}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  videoItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%",
  },
  thumbnail: {
    width: 120,
    height: 90,
    marginRight: 10,
  },
  videoTitle: {
    fontSize: 18,
  },
  storyItem: {
    margin: 10,
  },
  storyThumbnail: {
    width: 125,
    height: 125,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
  },
  storyText: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: "bold",
  },
});
