import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TabNavigator } from './TabNavigator';
import loginScreen from '../components/login/login';
import VideoPlayerScreen from '../components/home/VideoPlayer';


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
  </Stack.Navigator>
  )}