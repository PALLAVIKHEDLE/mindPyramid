import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Calendar as DefaultCalendar } from 'react-native-calendars';
import Colors from '../../../style/colors';

const CalendarScreen = ({ setManualEntryTimestamp }) => {
 
  const markedDates = [
    { date: '2024-02-15', duration: 5, remarks: 'I felt good' },
    { date: '2024-02-12', duration: 5, remarks: 'I felt good' },
    { date: '2024-02-13', duration: 5, remarks: 'I felt good' },
    { date: '2024-02-17', duration: 5, remarks: 'I felt good' }
  ];

console.log('markedDates',markedDates)

  const onManualInput = ({ day, month, year }) => {
    console.log('DATE select', day, month, year);
    const newTimestamp = new Date(year, month - 1, day).getTime();

    if (newTimestamp < Date.now()) {
      setManualEntryTimestamp(newTimestamp);
    }
  };

  return (
    <DefaultCalendar
      style={styles.calendar}
      markedDates={markedDates.reduce((acc, cur) => {
        acc[cur.date] = { marked: true, selected: true};
        return acc;
      }, {})}
    
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
