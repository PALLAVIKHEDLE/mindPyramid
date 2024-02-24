import React from 'react';
import { WebView } from 'react-native-webview';

const VideoPlayerScreen = ({ route, navigation }) => {
  const { videoId } = route.params;
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;

    return (
      <>
      <WebView
        source={{ uri: embedUrl }}
        style={{ flex: 1 }}
      />
    </>
    );
};

export default VideoPlayerScreen;
