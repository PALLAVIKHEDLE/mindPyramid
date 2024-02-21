import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function PlayerControls({ onPlay, onPause, onSeekForward, onSeekBackward }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onSeekBackward}>
        <FontAwesome name="backward" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={onPlay}>
        <FontAwesome name="play" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={onPause}>
        <FontAwesome name="pause" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={onSeekForward}>
        <FontAwesome name="forward" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
