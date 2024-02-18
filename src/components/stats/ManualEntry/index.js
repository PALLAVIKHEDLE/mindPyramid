import React, { useState } from 'react';
import { Dialog, TextInput } from 'react-native-paper';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import Colors from '../../../style/colors';
import { MS_PER_MINUTE } from '../../../constants/units';

const ManualEntry = ({ onDismiss }) => {
  const [duration, setDuration] = useState('');
  const [defaultValue, setDefaultValue] = useState('');
  //   useEffect(() => {
//     if (!timestamp) {
//       return;
//     }

//     const newDuration = activity[timestamp]?.duration || -1;
//     setDuration(newDuration);
//     setDefaultValue(newDuration === -1 ? '' : Math.floor(newDuration / MS_PER_MINUTE).toString());
//   }, [activity, timestamp]);

  const onChangeText = (text) => {
    const value = Number(text);

    if (text === '' || Number.isNaN(value)) {
      setDuration(-1);
      return;
    }

    setDuration(value * MS_PER_MINUTE);
  };

  const onSubmit = () => {
    if (duration < 0) {
      return;
    }
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
        <TouchableOpacity style={styles.activeButton} onPress={() => onDismiss}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
         style={[styles.activeButton, duration < 0 ? styles.disableButton : null]}
          onPress={onSubmit}
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
