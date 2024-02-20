import React,{useContext} from 'react';
import { StyleSheet, View } from 'react-native';
import { Calendar as DefaultCalendar } from 'react-native-calendars';
import Colors from '../../../style/colors';
import StreakContext from '../streakContext';


const CalendarScreen = ({ setManualEntryTimestamp, setSelectedDate }) => {
  const { markedDates } = useContext(StreakContext); 

const onManualInput = ({ day, month, year }) => {
  console.log('DATE select', day, month, year);
  // month and day are formatted with leading zeros
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDay = day < 10 ? `0${day}` : day;
  
  const newTimestamp = new Date(year, month - 1, day).getTime();

  if (newTimestamp < Date.now()) {
    setManualEntryTimestamp(newTimestamp);
    setSelectedDate(`${year}-${formattedMonth}-${formattedDay}`); // Set the selectedDate with leading zeros
  }
};

  return (
    <DefaultCalendar
    style={styles.calendar}
    markedDates={markedDates.reduce((acc, cur) => {
      acc[cur.date] = { marked: true, selected: true, selectedColor: Colors.lightBlue };
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
