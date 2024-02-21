import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Fontisto, FontAwesome, Entypo } from '@expo/vector-icons';
import Colors from '../style/colors';

// import HomeScreen from '../components/home/home';
// import HomeScreen from '../components/home/homeAudio';
import HomeScreen from '../components/home/PlayScreen';

import SettingScreen from '../components/setting/setting';
import TimerScreen from '../components/timer/timer';
import StatsScreen from '../components/stats/stats';


const Tab = createMaterialBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <View style={{flex:1}}>
      <Tab.Navigator
        barStyle={{
          borderWidth: 0.5,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          borderColor: 'transparent',
          overflow: 'hidden',
          backgroundColor: Colors.black,
        }}
        activeColor={Colors.activeColor}
        inactiveColor={Colors.grey}
      >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <Fontisto name="home" size={20} color={color} />
              ),
            }}
          />
         
          <Tab.Screen
            name="Stats"
            component={StatsScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <FontAwesome name="calendar" size={20} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Timer"
            component={TimerScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <Entypo name="stopwatch" size={20} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Setting"
            component={SettingScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <FontAwesome name="gear" size={22} color={color} />
              ),
            }}

          />
        </Tab.Navigator>
    </View>
  );
};
