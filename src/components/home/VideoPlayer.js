import React from 'react';
import { View, StyleSheet } from 'react-native';
import {YouTubePlayer} from 'react-native-youtube';

const VideoPlayerScreen = ({ videoId }) => {
    return (
        <View style={styles.container}>
            <YouTubePlayer
                videoID={videoId}
                style={styles.videoPlayer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    videoPlayer: {
        alignSelf: 'stretch',
        aspectRatio: 16 / 9,
    },
});

export default VideoPlayerScreen;
