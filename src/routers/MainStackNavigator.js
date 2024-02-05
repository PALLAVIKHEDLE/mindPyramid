import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TabNavigator } from './TabNavigator';
// import MainScreen from '../components/mainScreen';

const Stack = createStackNavigator();

export const MainStackNavigator = ({}) => {
  return (
    <Stack.Navigator
    initialRouteName='Home'
    headerMode='none'
    mode='card'
  >
    {/* <Stack.Screen
      name='login'
      component={loginScreen}
    /> */}
    <Stack.Screen
      name='Home'
      component={TabNavigator}
    />
  </Stack.Navigator>
  )}