import React, { useContext } from "react";
import { Text, StyleSheet, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from '@expo/vector-icons';
import StreakContext from '../stats/streakContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingScreen = ({ navigation }) => {
  const { markedDates, setMarkedDates } = useContext(StreakContext);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("@user");
      // Navigate back to login screen
      navigation.navigate('login');
    } catch (error) {
      console.error('Error while logging out:', error);
    }
  };
  const handleClearStats = () => {
    Alert.alert("Alert Title", "Do you want to clear the streak?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK",  onPress: () => {
        setMarkedDates([]);
      },
    },
    ]);
  
  };

  const handleReminder = () => {
    // Handle reminder functionality
  };

  return (
    <>
      <LinearGradient colors={["#CADFED", "#EDF5F9"]} style={styles.container}>
        {/* <TouchableOpacity onPress={handleReminder} style={styles.card}>
          <Ionicons name="alarm-outline" size={24} color='white' style={styles.icon} />
          <Text style={styles.cardText}>Set Reminder</Text>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={handleClearStats} style={styles.card}>
          <Ionicons name="flame-outline" size={24} color='white' style={styles.icon} />
          <Text style={styles.cardText}>Clear Stats</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout} style={styles.card}>
          <Ionicons name="log-out-outline" size={24} color='white' style={styles.icon} />
          <Text style={styles.cardText}>Logout</Text>
        </TouchableOpacity>
      </LinearGradient>
    </>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: '#FBB5A9',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardText: {
    fontSize: 18,
    fontWeight: "bold",
    color: 'white',
    textAlign: "center",
    marginLeft: 10, // Add some spacing between icon and text
  },
  icon: {
    marginRight: 10, // Add some spacing between icon and text
  },
});
