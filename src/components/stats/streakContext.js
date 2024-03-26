import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StreakContext = createContext();

export const StreakProvider = ({ children }) => {
  const [markedDates, setMarkedDates] = useState([
    { date: '2024-02-15', duration: 5, remarks: 'I felt good' },
    { date: '2024-02-12', duration: 5, remarks: 'I felt good' },
    { date: '2024-02-13', duration: 5, remarks: 'I felt good' },
    { date: '2024-02-17', duration: 5, remarks: 'I felt good' }
  ]);

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0');
const day = String(currentDate.getDate()).padStart(2, '0');
  
  const [timerData, setTimerData] = useState({ duration: 0, date:  (`${year}-${month}-${day}`) });

  useEffect(() => {
    const fetchMarkedDates = async () => {
      try {
        const savedMarkedDates = await AsyncStorage.getItem('markedDates');
        if (savedMarkedDates !== null) {
          setMarkedDates(JSON.parse(savedMarkedDates));
        }
      } catch (error) {
        console.error('Error fetching marked dates from AsyncStorage:', error);
      }
    };

    fetchMarkedDates();
  }, []);

  useEffect(() => {
    const saveMarkedDates = async () => {
      try {
        await AsyncStorage.setItem('markedDates', JSON.stringify(markedDates));
      } catch (error) {
        console.error('Error saving marked dates to AsyncStorage:', error);
      }
    };

    saveMarkedDates();
  }, [markedDates]);

  const addMarkedDate = (newMarkedDate) => {
    setMarkedDates(prevMarkedDates => [...prevMarkedDates, newMarkedDate]);
  };

  const setTimer = (duration, date) => {
    setTimerData({ duration, date });
  };

   // Add timer data to marked dates when timer completes
   useEffect(() => {
    if (timerData.date && timerData.duration > 0) {
      const { date, duration } = timerData;
      addMarkedDate({ date, duration, remarks: 'Timer completed' });
      // Reset timer data after adding to marked dates
      setTimerData({ duration: 0, date: null });
    }
  }, [timerData]);

  return (
    <StreakContext.Provider value={{ markedDates, addMarkedDate, timerData, setTimer ,setMarkedDates}}>
      {children}
    </StreakContext.Provider>
  );
};

export default StreakContext;
