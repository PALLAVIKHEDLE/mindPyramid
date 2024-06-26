import React, { useState, useEffect, useRef, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Svg, { Circle, Text as SvgText } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";
import { Picker } from "@react-native-picker/picker";
import StreakContext from '../stats/streakContext';

const TimerScreen = () => {
  const { addMarkedDate, timerData } = useContext(StreakContext);
  const HOURS_LIMIT = 24;
  const MINUTES_LIMIT = 60;
  const SECONDS_LIMIT = 60;

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerInterval = useRef(null);
  const startTime = useRef(null);
  const circleWidth = 150;

  useEffect(() => {
    updateTimeLeft();
  }, [hours, minutes, seconds]);

  const reset = () => {
    clearInterval(timerInterval.current);
    resetVars();
    setIsRunning(false); // Reset running state
  };

  const toggleTimer = () => {
    if (isRunning) {
      pause();
    } else {
      start();
    }
  };

  const start = () => {
    startTime.current = Date.now();
    setTimeLeft(hours * 3600 + minutes * 60 + seconds);
    setIsRunning(true);
    timerInterval.current = setInterval(() => {
      const currentTime = Date.now();
      const elapsedTimeInSeconds = (currentTime - startTime.current) / 1000;
      setTimeLeft((prevTimeLeft) => {
        const updatedTimeLeft = Math.max(0, prevTimeLeft - elapsedTimeInSeconds);
        if (updatedTimeLeft <= 0) {
          timeIsUp();
          clearInterval(timerInterval.current);
          return 0; // Ensure timeLeft doesn't go negative
        }
        return updatedTimeLeft;
      });
      startTime.current = currentTime; // Update start time for the next interval
    }, 1000);
  };

  const pause = () => {
    clearInterval(timerInterval.current);
    setIsRunning(false);
    startTime.current = Date.now(); // Save the current time for accurate resume
  };

  const renderTime = () => {
    const hoursLeft = Math.floor(timeLeft / 3600)
      .toString()
      .padStart(2, "0");
    const minutesLeft = Math.floor((timeLeft % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const secondsLeft = Math.floor(timeLeft % 60)
      .toString()
      .padStart(2, "0");
    return `${hoursLeft}:${minutesLeft}:${secondsLeft}`;
  };

  const timeIsUp = () => {
    clearInterval(timerInterval.current);
    Alert.alert("Add Streak", "Do you want to add this in streak?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { 
        text: "OK",  
        onPress: () => {
          addToStreak((hours * 3600 + minutes * 60 + seconds) / 60);
          reset();
        },
      },
    ]);
  };

  const addToStreak = (duration) => {  
    const {date } = timerData;
    addMarkedDate({ date, duration, remarks: "Added from timer" });
  };


  const resetVars = () => {
    setTimeLeft(0);
    startTime.current = null;
  };

  const updateTimeLeft = () => {
    setTimeLeft(hours * 3600 + minutes * 60 + seconds);
  };


  return (
    <LinearGradient colors={["#CADFED", "#EDF5F9"]} style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>HOURS</Text>
        <Text style={styles.headingText}>MINUTES</Text>
        <Text style={styles.headingText}>SECONDS</Text>
      </View>

      <View style={styles.pickerContainer}>
        <Picker
          style={styles.picker}
          selectedValue={hours}
          onValueChange={(itemValue) => setHours(itemValue)}
        >
          {[...Array(HOURS_LIMIT + 1).keys()].map((value) => (
            <Picker.Item
              key={value}
              label={value.toString().padStart(2, "0")}
              value={value}
            />
          ))}
        </Picker>
        <Picker
          style={styles.picker}
          selectedValue={minutes}
          onValueChange={(itemValue) => setMinutes(itemValue)}
        >
          {[...Array(MINUTES_LIMIT + 1).keys()].map((value) => (
            <Picker.Item
              key={value}
              label={value.toString().padStart(2, "0")}
              value={value}
            />
          ))}
        </Picker>
        <Picker
          style={styles.picker}
          selectedValue={seconds}
          onValueChange={(itemValue) => setSeconds(itemValue)}
        >
          {[...Array(SECONDS_LIMIT + 1).keys()].map((value) => (
            <Picker.Item
              key={value}
              label={value.toString().padStart(2, "0")}
              value={value}
            />
          ))}
        </Picker>
      </View>

      <View style={styles.circleContainer}>
        <Svg height={circleWidth} width={circleWidth}>
          <Circle
            cx={circleWidth / 2}
            cy={circleWidth / 2}
            r={circleWidth / 2 - 10}
            strokeWidth="5"
            fill="#FFC8BF"
          />
          <SvgText
            x="50%"
            y="50%"
            fontSize="22"
            textAnchor="middle"
            dy="6"
            fill="white"
          >
            {renderTime()}
          </SvgText>
        </Svg>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleTimer}>
          <Text style={styles.buttonText}>{isRunning ? "Pause" : "Start"}</Text>
        </TouchableOpacity>
        { !isRunning && (
          <TouchableOpacity style={styles.button} onPress={reset}>
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
        )}
      </View>
    </LinearGradient>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 150,
  },
  headingContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  headingText: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 10,
    marginBottom: 10,
  },
  picker: {
    width: 100,
    height: 50,
  },
  circleContainer: {
    alignItems: "center",
    marginTop: 22,
  },
  buttonsContainer: {
    flexDirection: "row",
    marginTop: 34,
  },
  button: {
    width: "25%",
    padding: 12,
    backgroundColor: "#FBB5A9",
    borderRadius: 15,
    marginRight: 5,
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "bold",
    color:'white'
  },
});

export default TimerScreen;
