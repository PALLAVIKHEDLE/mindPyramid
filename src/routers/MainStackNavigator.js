import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TabNavigator } from './TabNavigator';
import loginScreen from '../components/login/login';
import VideoPlayerScreen from '../components/home/VideoPlayer';
import PopularMP3Screen from '../components/home/PopularMP3'
import PlayerScreen from '../components/home/PlayerScreen';


const Stack = createStackNavigator();

export const MainStackNavigator = ({}) => {
  return (
    <Stack.Navigator
    initialRouteName='login'
    headerMode='none'
    mode='card'
  >
    <Stack.Screen
      name='login'
      component={loginScreen}
    />
    <Stack.Screen
      name='Home'
      component={TabNavigator}
    />
    <Stack.Screen
      name='VideoPlayer'
      component={VideoPlayerScreen}
    />
    <Stack.Screen
      name="PopularMP3Screen"
      component={PopularMP3Screen}
    />
     <Stack.Screen
      name="PlayerScreen"
      component={PlayerScreen}
    />
  </Stack.Navigator>
  )}