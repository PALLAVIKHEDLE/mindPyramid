import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import dayjs from 'dayjs';
import { Calendar as DefaultCalendar } from 'react-native-calendars';
import Colors from '../../../style/colors';

const CalendarScreen = ({ setManualEntryTimestamp, highlightedDates }) => {
  const calculateStreak = () => {
    const pattern = [2, 3, 2, 3, 1, 3, 1]; // Desired streak pattern
    let streak = 0;
    let currentPatternIndex = 0;
    let consecutiveDays = 0;

    highlightedDates.forEach((timestamp, index) => {
      consecutiveDays++;
      
      // Check if the current consecutive streak matches the pattern
      if (consecutiveDays === pattern[currentPatternIndex]) {
        streak += consecutiveDays;
        currentPatternIndex++;
        consecutiveDays = 0;
      }
      
      // Check if the current index exceeds the pattern length, if so, break the loop
      if (currentPatternIndex >= pattern.length) {
        return;
      }
      
      // Check if there's a gap in the dates or it's the last date, reset consecutive days
      if (index + 1 >= highlightedDates.length || 
          (highlightedDates[index + 1] - timestamp) / (1000 * 60 * 60 * 24) > 1) {
        consecutiveDays = 0;
      }
    });
    return streak;
  };

  const streak = useMemo(() => calculateStreak(), [highlightedDates]);

  const markedDates = useMemo(() => {
    const markedDates = {};
    const pattern = [2, 3, 2, 3, 1, 3, 1]; // Desired streak pattern
    let currentPatternIndex = 0;
    let consecutiveDays = 0;
   

    highlightedDates.forEach((date, index) => {
      consecutiveDays++;

      // Check if the current consecutive streak matches the pattern
      if (consecutiveDays === pattern[currentPatternIndex]) {
        const formattedDate = dayjs(date).format('YYYY-MM-DD');
        markedDates[formattedDate] = {
          marked: true,
          selected:true,
        };
        currentPatternIndex++;
        consecutiveDays = 0;
      }
      
      // Check if the current index exceeds the pattern length, if so, break the loop
      if (currentPatternIndex >= pattern.length) {
        return;
      }
      
      // Check if there's a gap in the dates or it's the last date, reset consecutive days
      if (index + 1 >= highlightedDates.length || 
          (highlightedDates[index + 1] - date) / (1000 * 60 * 60 * 24) > 1) {
        consecutiveDays = 0;
      }
    });

    return markedDates;
  }, [highlightedDates]);

  const onManualInput = ({ day, month, year }) => {
    console.log('DATE select', day, month, year);
    // DateObject months go from 1 to 12, Date months go from 0 to 11
    const newTimestamp = new Date(year, month - 1, day).getTime();

    if (newTimestamp < Date.now()) {
      setManualEntryTimestamp(newTimestamp);
    }
  };

  return (
    <DefaultCalendar
      style={styles.calendar}
      markedDates={markedDates}
      onDayPress={onManualInput}
      theme={{
        backgroundColor: 'white',
        calendarBackground: 'white',
        textSectionTitleColor: Colors.lightBlue,
        selectedDayBackgroundColor: Colors.lightBlue,
        selectedDayTextColor: 'white',
        todayTextColor: Colors.lightBlue,
        dayTextColor: 'black',
        textDisabledColor: '#d9e1e8',
        dotColor: Colors.activeColor,
        selectedDotColor: Colors.lightBlue,
        arrowColor: 'black',
        monthTextColor: 'black',
        indicatorColor: Colors.lightBlue,
        textDayFontWeight: '300',
        textMonthFontWeight: 'bold',
        textDayHeaderFontWeight: '300',
        textDayFontSize: 16,
        textMonthFontSize: 16,
        textDayHeaderFontSize: 15,
      }}
    />
  );
};

const styles = StyleSheet.create({
  calendar: {
    marginRight: 14,
    marginBottom: 30,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
});

export default CalendarScreen;
