import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { stories } from "./MeditationData";
import PopularMP3 from "./PopularMP3";
import YoutubeVideo from "./youtubeVideo"

const API_KEY = "YOUR_YOUTUBE_API_KEY"; // Replace with your API key

export default function HomeScreen() {
  const popularMP3ImageWidth = Dimensions.get("window").width;

  // Initialize state variables
  const navigation = useNavigation();
  const [videoList, setVideoList] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);
  const [showVideoModal, setShowVideoModal] = useState(false);

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
    setShowVideoModal(true); // Show the video modal
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
        <PopularMP3 navigation={navigation} />
      </ScrollView>
       <YoutubeVideo showVideoModal={showVideoModal} setShowVideoModal={setShowVideoModal} videoList={videoList} handleVideoPress={handleStoryPress}/>
  
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
  modalContainer: {
    flex: 1,
    width:'100%',
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: '80%', 
  },
  videoContainer: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  videoItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
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
