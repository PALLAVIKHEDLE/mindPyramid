import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TabNavigator } from './TabNavigator';
import loginScreen from '../components/login/login';
import VideoPlayerScreen from '../components/home/VideoPlayer';
import PopularMP3Screen from '../components/home/PopularMP3';
import PlayerScreen from '../components/home/PlayerScreen';
import YoutubeScreen from '../components/home/youtubeVideo'



const Stack = createStackNavigator();

export const MainStackNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName='login'
      mode='card'
      screenOptions={{
        headerShown: true,
        headerBackTitleVisible: false,
        headerTintColor: 'black',
        headerStyle: {
          backgroundColor: '#CADFED', 
        }, 
      }}
    >
      <Stack.Screen
        name='login'
        component={loginScreen}
        options={{ headerShown: false }} 
      />
      <Stack.Screen
        name='Home'
        component={TabNavigator}
        options={{ headerShown: false }} 
      />
      <Stack.Screen
        name='VideoPlayer'
        component={VideoPlayerScreen}
        options={{ title: 'Video Player' }} 
      />
      <Stack.Screen
        name='PopularMP3Screen'
        component={PopularMP3Screen}
        options={{ title: 'Popular MP3' }} 
      />
      <Stack.Screen
        name='PlayerScreen'
        component={PlayerScreen}
        options={{ title: 'Player' }} 
      />
        <Stack.Screen
        name='YoutubeScreen'
        component={YoutubeScreen}
        options={{ title: 'Youtube Video' }} 
      />
    </Stack.Navigator>
  );
};
