import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";

import Colors from '../../style/colors';

const PlayerScreen = ({ route }) => {
  const { title, image, uri } = route.params;

  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [positionTime, setPositionTime] = useState('00:00');
  const [durationTime, setDurationTime] = useState('00:00');
  const [isLoadingAudio, setIsLoadingAudio] = useState(true);
 
  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded && !status.isPlaying) {
      setIsPlaying(false);
    }
    const position = status.positionMillis ? status.positionMillis : 0;
    const duration = status.durationMillis ? status.durationMillis : 0;
    setPositionTime(formatTime(position));
    setDurationTime(formatTime(duration));
  };

  useEffect(() => {
    const loadAudio = async () => {
      let filename = uri.split('/').pop() ?? '';
      setIsLoadingAudio(true);

      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
      });

      try {
        const { sound: soundObject } = await Audio.Sound.createAsync(
          { uri },
          {},
          onPlaybackStatusUpdate
        );
        setSound(soundObject);
      } catch (error) {
        console.log('Error loading audio:', error);
      }

      setIsLoadingAudio(false);
    };

    loadAudio();
  }, [uri]);

  useEffect(() => {
    if (sound) {
      const updatePlaybackStatus = (status) => {
        onPlaybackStatusUpdate(status);
      };

      sound.setOnPlaybackStatusUpdate(updatePlaybackStatus);

      return () => {
        sound.unloadAsync(); // Unload sound when component unmounts
      };
    }
  }, [sound]);

  const formatTime = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds - minutes * 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const playSound = async () => {
    try {
      await sound.playAsync();
      setIsPlaying(true);
    } catch (error) {
      console.log('Error playing sound: ', error);
    }
  };

  const pauseSound = async () => {
    try {
      await sound.pauseAsync();
      setIsPlaying(false);
    } catch (error) {
      console.log('Error pausing sound: ', error);
    }
  };

  const stopSound = async () => {
    try {
      await sound.stopAsync();
      setIsPlaying(false);
    } catch (error) {
      console.log('Error stopping sound: ', error);
    }
  };

  const replay = async () => {
    try {
      await sound.setPositionAsync(0);
      await sound.playAsync();
      setIsPlaying(true);
    } catch (error) {
      console.log('Error replaying sound: ', error);
    }
  };

  const forward = async () => {
    try {
      const status = await sound.getStatusAsync();
      await sound.setPositionAsync(status.positionMillis + 10000); // Forward 10 seconds
    } catch (error) {
      console.log('Error forwarding sound: ', error);
    }
  };

  return (
    <LinearGradient
      colors={["#CADFED", "#EDF5F9"]}
      style={styles.container}
    >
      <Image source={image} style={styles.thumbnail} resizeMode="contain" />
      <Text style={styles.title}>{title}</Text>
      <View style={styles.controls}>
        <AntDesign name="stepbackward" size={30} onPress={replay} />
        <TouchableOpacity style={styles.controlButton} onPress={isPlaying ? pauseSound : playSound}>
          <AntDesign name={isPlaying ? 'pausecircle' : 'playcircleo'} size={60} color="black" />
        </TouchableOpacity>
        <AntDesign name="stepforward" size={30} onPress={forward} />
        <TouchableOpacity onPress={stopSound}>
          <MaterialIcons name="stop" size={40}  />
        </TouchableOpacity>
      </View>
      <View style={styles.timeContainer}>
        <Text style={styles.time}>{positionTime}</Text>
        <Text style={styles.time}>{durationTime}</Text>
      </View>

    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.lightBlue,
  },
  thumbnail: {
    width: '80%',
    height: 300,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Colors.activeColor,
    alignItems:'center'
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginLeft:40
  },
  controlButton: {
    backgroundColor: Colors.activeColor,
    borderRadius: 50,
    marginHorizontal: 20,
    padding: 10,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  time: {
    color: 'black',
    fontSize: 16,
  }
});

export default PlayerScreen;
