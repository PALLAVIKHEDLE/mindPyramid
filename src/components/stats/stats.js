import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { AntDesign as Icon } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";

import Calendar from './Calendar';
import ManualEntry from './ManualEntry';

export default function StatsScreen() {
  const [totalSessions, setTotalSessions] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [streak, setStreak] = useState(0);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [listenedState, setListenedState] = useState(0);
  const [manualEntryTimestamp, setManualEntryTimestamp] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null); 
  const [markedDates, setMarkedDates] = useState([
    { date: '2024-02-15', duration: 5, remarks: 'I felt good' },
    { date: '2024-02-12', duration: 5, remarks: 'I felt good' },
    { date: '2024-02-13', duration: 5, remarks: 'I felt good' },
    { date: '2024-02-17', duration: 5, remarks: 'I felt good' }
  ]);

  const addMarkedDate = (newMarkedDate) => {
    setMarkedDates(prevMarkedDates => [...prevMarkedDates, newMarkedDate]);
  };

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
                <Icon name="Trophy" style={styles.icon} size={30} />
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
         <Calendar  setManualEntryTimestamp={setManualEntryTimestamp} markedDates={markedDates}  setSelectedDate={setSelectedDate} />
            {manualEntryTimestamp !== null && (
                <ManualEntry
                    timestamp={manualEntryTimestamp}
                    onDismiss={() => setManualEntryTimestamp(null)}
                    updateMarkedDates={addMarkedDate} 
                    markedDates={markedDates}
                    selectedDate={selectedDate} 
                />
            )}
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
