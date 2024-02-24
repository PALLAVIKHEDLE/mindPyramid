import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  View
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { stories } from "./MeditationData";
import PopularMP3 from "./PopularMP3";

const API_KEY = "YOUR_YOUTUBE_API_KEY"; // Replace with your API key

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

  // Function to handle story press
  const handleStoryPress = (story) => {
    setSelectedStory(story); // Set the selected story
    navigation.navigate("YoutubeScreen", {videoList:videoList}); // Navigate to the YoutubeScreen component
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
        <PopularMP3 navigation={navigation} />
      </ScrollView>
    </LinearGradient>
  );
}

const windowWidth = Dimensions.get("window").width;

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
});
