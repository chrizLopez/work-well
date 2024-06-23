import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { EStyleSheet } from "../config/EStyleSheet";
import { useCountdown } from "react-native-countdown-circle-timer";
import Svg, { Path, LinearGradient, Stop, Defs } from "react-native-svg";
import Constants from "expo-constants";
import { secondsToMinutes } from "./helper";

type CountdownTimerProps = {
  duration: number;
  setTimer: (duration: any) => void;
  selected: any;
  onReset: () => void;
};

const CountdownTimer = ({ duration, setTimer, selected, onReset }: CountdownTimerProps) => {
  const [timerStarted, setTimerStarted] = useState(false);

  const startStopTimer = (taskname = "No Task name provided") => {
    setTimerStarted((prev) => !prev);
  };

  const completeHandler = () => {
    setTimerStarted(false);
    alert("Timer completed");
  };

  const resetHandler = () => {
    setTimer(selected.duration);
    onReset();
    setTimerStarted(false);
  };

  const onStartHandler = () => {
    startStopTimer();
  };

  const {
    path,
    pathLength,
    stroke,
    strokeDashoffset,
    remainingTime,
    elapsedTime,
    size,
    strokeWidth,
  } = useCountdown({
    isPlaying: timerStarted,
    duration,
    colors: 'url(#your-unique-id)',
    size: 280,
  });

  return (
    <View style={styles.container}>
      <View style={{ width: size, height: size, position: "relative", backgroundColor: '#282828', borderRadius: size, }}>
        <Svg width={size} height={size}>
          <Defs>
            <LinearGradient id="your-unique-id" x1="1" y1="0" x2="0" y2="0">
              <Stop offset="5%" stopColor={selected.linearColor[0]}/>
              <Stop offset="95%" stopColor={selected.linearColor[1]}/>
            </LinearGradient>
          </Defs>
          <Path
            d={path}
            fill="none"
            stroke="#d9d9d9"
            strokeWidth={strokeWidth}
          />
          {elapsedTime !== duration && (
            <Path
              d={path}
              fill="none"
              stroke={stroke}
              strokeLinecap="butt"
              strokeWidth={strokeWidth}
              strokeDasharray={pathLength}
              strokeDashoffset={strokeDashoffset}
            />
          )}
        </Svg>
        <View style={styles.time}>
          <Text style={styles.timerText}>
            {secondsToMinutes(remainingTime)}
          </Text>
          <Text style={styles.minutesTxt}>
            minutes
          </Text>
        </View>
      </View>
      <View style={styles.btnView}>
        <TouchableOpacity style={styles.startStopBtn} onPress={onStartHandler}>
          <Text style={styles.startStopText}>
            {timerStarted ? "Pause" : "Start"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.startStopBtn} onPress={resetHandler}>
          <Text style={styles.startStopText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CountdownTimer;

const styles = EStyleSheet.create({
  minutesTxt: {
    fontSize: "12rem",
    fontWeight: "500",
    color: "#666666",
  },
  startStopText: {
    fontSize: "15rem",
    fontWeight: "500",
    color: "#fff",
  },
  startStopBtn: {
    backgroundColor: "#282828CC",
    paddingVertical: "15rem",
    paddingHorizontal: "80rem",
    borderRadius: "50rem",
    borderWidth: "2rem",
    borderColor: "#66666659",
    marginVertical: "3rem",
  },
  btnView: {
    marginVertical: "20rem",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  time: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
  },
  timerText: {
    fontSize: "70rem",
    fontWeight: "500",
    color: "#fff",
  },
});
