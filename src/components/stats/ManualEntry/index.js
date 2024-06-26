import React, { useState, useEffect,useContext } from 'react';
import { Dialog, TextInput } from 'react-native-paper';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import Colors from '../../../style/colors';
import StreakContext from '../streakContext';


const ManualEntry = ({ onDismiss ,selectedDate}) => {
  const { markedDates, addMarkedDate } = useContext(StreakContext); 
  const [duration, setDuration] = useState('');
  const [defaultValue, setDefaultValue] = useState('');

  useEffect(() => {
    const selectedDateData = markedDates.find(date => date.date === selectedDate);
    if (selectedDateData) {
      setDefaultValue(selectedDateData.duration.toString()); 
    } else {
      setDefaultValue(''); 
    }
  }, [selectedDate, markedDates]);

  const onChangeText = (text) => {
    const value = Number(text);
    if (text === '' || Number.isNaN(value)) {
      setDuration(-1);
      return;
    }
    setDuration(value);
  };

  const onSubmit = () => {
    if (duration < 0 || !selectedDate) {
      return;
    }
    const newMarkedDate = {
      date: selectedDate,
      duration: duration,
      remarks: 'Some remarks' 
    };
    addMarkedDate(newMarkedDate);
    onDismiss();
  };

  return (
    <Dialog visible={true} onDismiss={onDismiss} style={{ backgroundColor: '#EDF5F9' }}>
      <Dialog.Title style={{color:Colors.lightBlue}}>Manual Entry</Dialog.Title>
      <Dialog.Content>
        <TextInput
           key={defaultValue}
           autoFocus
          defaultValue={defaultValue}
          keyboardType="number-pad"
          label="Time in minutes"
          maxLength={3}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmit}
          style={{ backgroundColor: '#EDF5F9' }}
          theme={{colors:{ primary: Colors.activeColor }}}
        />
      </Dialog.Content>
      <Dialog.Actions>
        <TouchableOpacity style={styles.activeButton} onPress={() => onDismiss()}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
         style={[styles.activeButton, duration < 0 ? styles.disableButton : null]}
          onPress={()=>onSubmit()}
          disabled={duration < 0}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </Dialog.Actions>
    </Dialog>
  );
};

const styles = StyleSheet.create({
    activeButton: {
      width: "25%",
      padding: 12,
      backgroundColor: "#FBB5A9",
      borderRadius: 15,
      marginRight: 5,
    },
    disableButton: {
        width: "25%",
        padding: 12,
        backgroundColor: Colors.grey,
        borderRadius: 15,
        marginRight: 5,
      },
    buttonText: {
      textAlign: "center",
      fontWeight: "bold",
      color:'white'
    },
  });
export default ManualEntry;
