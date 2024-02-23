import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  View,
  Dimensions,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { stories } from "./MeditationData";

// const API_KEY = "AIzaSyB4KLNvjwSM8pifgko4XXbSs16zCOnT6hU";

export default function HomeScreen() {
  const popularMP3ImageWidth = Dimensions.get("window").width;

  // Initialize state variables
  const navigation = useNavigation();
  const [videoList, setVideoList] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);

  // Fetch data from YouTube API and set state
  useEffect(() => {
    const fetchData = async () => {
      try {
        let query = selectedStory ? selectedStory.text : "nature sounds"; // Default search query if no story is selected
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q=${encodeURIComponent(
            query
          )}&key=${API_KEY}`
        );
        setVideoList(response.data.items);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedStory]);
  // console.log('VideoList',videoList)
  // Function to handle story press
  const handleStoryPress = (story) => {
    console.log("Story clicked:", story.text);
    setSelectedStory(story); // Set the selected story
  };

  // Function to handle video press
  const handleVideoPress = (videoId) => {
    navigation.navigate("VideoPlayer", { videoId: videoId });
  };

  return (
    <LinearGradient colors={["#CADFED", "#EDF5F9"]} style={styles.container}>
      <ScrollView>
        {/* Story section */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.storyContainer}
        >
          {stories.map((story) => (
            <TouchableOpacity
              key={story.id}
              style={styles.storyItem}
              onPress={() => handleStoryPress(story)}
            >
              <Image
                source={story.imageUrl}
                style={styles.storyThumbnail}
                onError={(error) =>
                  console.log("Image loading error:", error.nativeEvent.error)
                }
              />
              <Text style={styles.storyText}>{story.text}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        {/* Popular MP3 Card */}
        <TouchableOpacity
          style={[styles.popularMP3Container]}
          onPress={() => navigation.navigate("PopularMP3Screen")} 
        >
          <Image
            source={require("../../../assets/icon.png")}
            style={styles.popularMP3Image}
            resizeMode="contain"
          />
          <Text style={styles.popularMP3Text}>Popular MP3</Text>
        </TouchableOpacity>
        {/* Video section */}
        <ScrollView style={styles.videoContainer}>
          {videoList.map((video, index) => (
            <TouchableOpacity
              key={index}
              style={styles.videoItem}
              onPress={() => handleVideoPress(video.id.videoId)}
            >
              <Image
                source={{ uri: video.snippet.thumbnails.medium.url }}
                style={styles.thumbnail}
              />
              <Text style={styles.videoTitle}>{video.snippet.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScrollView>
    </LinearGradient>
  );
}
const windowWidth = Dimensions.get("window").width;
const popularMP3ContainerWidth = windowWidth - 20;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  storyContainer: {
    marginBottom: 15,
  },
  storyItem: {
    margin: 10,
  },
  storyThumbnail: {
    width: 125,
    height: 125,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
  },
  storyText: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: "bold",
  },
  videoContainer: {
    flex: 1,
    width: "100%",
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
  popularMP3Container: {
    alignItems: "center",
    width: popularMP3ContainerWidth,
  },
  popularMP3Image: {
    width: popularMP3ContainerWidth,
    height: 260,
    marginBottom: 5,
  },
  popularMP3Text: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
});
