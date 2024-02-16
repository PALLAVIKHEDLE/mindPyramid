import React, { useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { AntDesign as Icon } from '@expo/vector-icons';
import { DateProvider } from './Calendar/DateContext';
import { LinearGradient } from "expo-linear-gradient";

import Calendar from './Calendar';
import Colors from '../../style/colors';
import ManualEntry from './ManualEntry';

export default function StatsScreen() {
  const [totalSessions, setTotalSessions] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [streak, setStreak] = useState(0);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [listenedState, setListenedState] = useState(0);
  const [manualEntryTimestamp, setManualEntryTimestamp] = useState(0);

  return (
    <LinearGradient colors={["#CADFED", "#EDF5F9"]} style={styles.container}>
        <View style={styles.cardsContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.cards}
          >
            <Card style={styles.card}>
              <Card.Content style={styles.cardContent}>
                <Icon name="Trophy" style={styles.icon} size={30} color={Colors.primary} />
                <Paragraph style={styles.pStyle}>Current Streak</Paragraph>
                <Title style={{color:'white'}}>{streak} day{streak === 1 ? '' : 's'}</Title>
              </Card.Content>
            </Card>
            <Card style={styles.card}>
              <Card.Content style={styles.cardContent}>
                <Icon name="calendar" style={styles.icon} size={30} />
                <Paragraph style={styles.pStyle}>Total Sessions</Paragraph>
                <Title style={{color:'white'}}>{totalSessions} session{totalSessions === 1 ? '' : 's'}</Title>
              </Card.Content>
            </Card>
            <Card style={styles.card}>
              <Card.Content style={styles.cardContent}>
                <Icon name="clockcircleo" style={styles.icon} size={30}  />
                <Paragraph style={styles.pStyle}>Time Meditating</Paragraph>
                <Title style={{color:'white'}}>{listenedState}</Title>
              </Card.Content>
            </Card>
          </ScrollView>
         </View>
        <Calendar key={Colors.primary} setManualEntryTimestamp={setManualEntryTimestamp} />
          </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 36,
    paddingLeft: 14,
  },
  cardsContainer: {
    maxHeight: 130, 
    marginBottom: 30,
  },
  cards: {
    flexDirection: 'row',
    alignItems: 'center', 
  },
  card: {
    width: 150,
    marginRight: 10,
    borderRadius: 10,
    elevation: 4,
    backgroundColor: '#FBB5A9',
  },
  cardContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginBottom: 10,
    color:'white',
    fontWeight:'bold'
  },
  pStyle:{
    fontWeight:'bold',
    color:'white',
  }
});
