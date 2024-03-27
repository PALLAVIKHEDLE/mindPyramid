import React, { useState,useContext, useEffect } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { AntDesign as Icon } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
import StreakContext from './streakContext';


import Calendar from './Calendar';
import ManualEntry from './ManualEntry';

export default function StatsScreen() {
  const [totalSessions, setTotalSessions] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [streak, setStreak] = useState(0);
  const [manualEntryTimestamp, setManualEntryTimestamp] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null); 
 
  const { markedDates } = useContext(StreakContext); 

  useEffect(() => {
    let currentStreak = 0;
    let currentDate = null;
  
    // Sort the markedDates array by date
    const sortedDates = markedDates.sort((a, b) => new Date(a.date) - new Date(b.date));
  
    // Loop through sorted dates to find the streak
    sortedDates.forEach(date => {
      const timestamp = new Date(date.date).getTime();
  
      if (!currentDate) {
        // If currentDate is null, set it and increment streak
        currentDate = timestamp;
        currentStreak++;
      } else {
        // Check if the difference between the current date and previous date is exactly one day
        if (timestamp - currentDate === 86400000) { // The number 86400000 represents the number of milliseconds in one day.
          // 1 second = 1000 milliseconds
          // 1 minute = 60 seconds = 60 * 1000 milliseconds = 60000 milliseconds
          // 1 hour = 60 minutes = 60 * 60000 milliseconds = 3600000 milliseconds
          // 1 day = 24 hours = 24 * 3600000 milliseconds = 86400000 milliseconds
          currentStreak++;
        } else if (timestamp - currentDate > 86400000) {
          // If there is a gap between dates, reset the streak count
          currentStreak = 1;
        }
        currentDate = timestamp;
      }
    });
  
    // Set the streak state
    setStreak(currentStreak);
  
    // Calculate total sessions and total duration
    setTotalSessions(sortedDates.length);
    const meditationTime = sortedDates.reduce((acc, curr) => acc + curr.duration, 0);
    setTotalDuration(meditationTime);
  
  }, [markedDates]);
  
  


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
                <Title style={{color:'white'}}>{totalDuration}</Title>
              </Card.Content>
            </Card>
          </ScrollView>
         </View>
         <Calendar  setManualEntryTimestamp={setManualEntryTimestamp}
           setSelectedDate={setSelectedDate} />
            {manualEntryTimestamp !== null && (
                <ManualEntry
                    timestamp={manualEntryTimestamp}
                    onDismiss={() => setManualEntryTimestamp(null)}
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
    marginBottom: 50,
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
    marginBottom: 20, 
  },
  cardContent: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  icon: {
    marginBottom: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  pStyle: {
    fontWeight: 'bold',
    color: 'white',
  },
});
