import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, ScrollView, View, Modal } from "react-native";
import { LinearGradient } from "expo-linear-gradient";


const YoutubeVideo = ({ videoList, handleVideoPress, showVideoModal, setShowVideoModal }) => {
  console.log('youtubevideo',videoList)
  return (
    <>
    <LinearGradient colors={["#CADFED", "#EDF5F9"]}>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showVideoModal}
        onRequestClose={() => setShowVideoModal(false)}
      >

        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1} // To prevent the TouchableOpacity from triggering onPress immediately
          onPress={() => setShowVideoModal(false)}
        >
          <View style={[styles.modalContent, styles.videoContainer]}>
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
          </View>
        </TouchableOpacity>
      </Modal>
        </LinearGradient>
    </>
  );
};

export default YoutubeVideo;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    width: '100%',
    justifyContent: "center",
    alignItems: "center",
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


