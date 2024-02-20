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

  return (
    <StreakContext.Provider value={{ markedDates, addMarkedDate }}>
      {children}
    </StreakContext.Provider>
  );
};

export default StreakContext;
