import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Svg, { Circle, Text as SvgText } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";

const TimerScreen = () => {
  const FULL_DASH_ARRAY = 283;
  const TIME_LIMIT = 60;

  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const timerInterval = useRef(null);
  const startTime = useRef(null);
  const circleWidth = 200; // Set a default width for the circle

  useEffect(() => {
    setTimeLeft(TIME_LIMIT);
  }, []);

  const reset = () => {
    clearInterval(timerInterval.current);
    resetVars();
  };

  // const start = (withReset = false) => {
  //   if (withReset) {
  //     resetVars();
  //   }
  //   startTimer();
  // };

  const start = (withReset = false) => {
    if (withReset) {
      resetVars();
    }
    if (!startTime.current) {
      startTimer();
    } else {
      const elapsedTime = (Date.now() - startTime.current) / 1000;
      setTimeLeft((prevTimeLeft) => Math.max(0, TIME_LIMIT - elapsedTime));
      startTimer();
    }
  };

  const pause = () => {
    clearInterval(timerInterval.current);
    startTime.current = Date.now();
  };

  const startTimer = () => {
    startTime.current = Date.now() - (TIME_LIMIT - timeLeft) * 1000;
    timerInterval.current = setInterval(() => {
      const elapsedTime = (Date.now() - startTime.current) / 1000;
      setTimeLeft((prevTimeLeft) => Math.max(0, TIME_LIMIT - elapsedTime));
      if (elapsedTime >= TIME_LIMIT) {
        timeIsUp();
      }
    }, 1000);
  };

  const timeIsUp = () => {
    clearInterval(timerInterval.current);
    Alert.alert('Alert Title', 'Do you want to add this in streak?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);
    reset();
  };

  const resetVars = () => {
    setTimeLeft(TIME_LIMIT);
    startTime.current = null;
  };

  const calculateTimeFraction = () => {
    return timeLeft / TIME_LIMIT;
  };

  const setCircleDasharray = (width) => {
    const radius = width / 2 - 10; 
    const circumference = 2 * Math.PI * radius;
    const timeFraction = calculateTimeFraction();
    const strokeDasharray = `${(timeFraction * circumference).toFixed(0)} ${circumference}`;
    return strokeDasharray;
  };

  return (
    <LinearGradient colors={['#CADFED', '#EDF5F9']} style={styles.container}>
      <View style={styles.circleContainer}>
        <Svg height={circleWidth} width={circleWidth}>
          <Circle
            cx={circleWidth / 2}
            cy={circleWidth / 2}
            r={circleWidth / 2 - 10}
            stroke="grey"
            strokeWidth="3"
            fill="none"
          />
          <Circle
            cx={circleWidth / 2}
            cy={circleWidth / 2}
            r={circleWidth / 2 - 10}
            stroke="#F89C8C"
            strokeWidth="3"
            fill="none"
            strokeDasharray={setCircleDasharray(circleWidth)}
            strokeLinecap="round"
          />
          <SvgText
            x="50%"
            y="56%"
            fontSize="20"
            textAnchor="middle"
            stroke="black"
            fill="black"
          >
            {timeLeft.toFixed(0)}
          </SvgText>
        </Svg>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => start(true)}>
          <Text>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={pause}>
          <Text>Pause</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={reset}>
          <Text>Reset</Text>
        </TouchableOpacity>
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
  circleContainer: {
    alignItems: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  button: {
    marginHorizontal: 10,
    padding: 7,
    backgroundColor: "#FFB8B8",
    borderRadius: 6,
  },
});

export default TimerScreen;
