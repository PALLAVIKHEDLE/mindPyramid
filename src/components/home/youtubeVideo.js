import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, ScrollView, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import videoList from './VideoList'

const YoutubeScreen = ({ navigation, route}) => {
    // const {videoList} = route.params; 

    const handleVideoPress = (videoId) => {
        navigation.navigate("VideoPlayer", { videoId: videoId });
      };
  return (
    <LinearGradient colors={["#CADFED", "#EDF5F9"]} style={styles.container}>
      <View style={styles.videoListContainer}>
        <ScrollView>
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
      </View>
    </LinearGradient>
  );
};

export default YoutubeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  videoListContainer: {
    flex: 1,
    width: '100%',
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
