import React from 'react';
import { Button } from 'react-native';
import { WebView } from 'react-native-webview';

const VideoPlayerScreen = ({ route, navigation }) => {
  const { videoId } = route.params;
  console.log('videoId',videoId)
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;

    return (
      <>
      <WebView
        source={{ uri: embedUrl }}
        style={{ flex: 1 }}
      />
      <Button
        title="Go Back"
        onPress={() => navigation.goBack()}
      />
    </>
    );
};

export default VideoPlayerScreen;
