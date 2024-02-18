import React from  'react';
import { StyleSheet, Text, View } from 'react-native';
import dayjs from 'dayjs';
import { Calendar as DefaultCalendar } from 'react-native-calendars';
import Colors from '../../../style/colors';

const CalendarScreen = ({ setManualEntryTimestamp,highlightedDates }) => {
  const markedDates = {};

  highlightedDates.forEach(date => {
    const formattedDate = dayjs(date).format('YYYY-MM-DD');
    markedDates[formattedDate] = { marked: true, selected:true };
  });

const onManualInput = ({ day, month, year }) => {
    console.log('DATE select', day, month, year)
    // DateObject months go from 1 to 12, Date months go from 0 to 11
    const newTimestamp = new Date(year, month - 1, day).getTime()

    if (newTimestamp < Date.now()) {
      setManualEntryTimestamp(newTimestamp)
    }
  }

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
