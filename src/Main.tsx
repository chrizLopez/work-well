import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import SelectorModal from "./components/SelectorModal";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

import styles from "./styles";
import StartModal from "./components/StartModal";
import { generateId } from "./components/helper";
import TaskHistory from "./components/TaskHistory";
import BottomSheetContents from "./components/BottomSheetContents";
import LinearButton from "./components/LinearButton";

const ITEM_SELECTION = [
  {
    id: 1,
    label: "Pomodoro",
    duration: 1500,
  },
  {
    id: 2,
    label: "Short Break",
    duration: 300,
  },
  {
    id: 3,
    label: "Long Break",
    duration: 900,
  },
];

const Main = ({ navigation }: any) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const [timer, setTimer] = useState(1500);
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [keyReset, setKeyReset] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState({
    id: 1,
    label: "Pomodoro",
    duration: 1500,
    isChecked: false,
    linearColor: ["#A29BFE", "#74B9FF"],
  });
  const [showStartModal, setShowStartModal] = useState(false);

  const startStopTimer = (taskname = "No Task name provided") => {
    setIsPlaying((prev) => !prev);
  };

  const completeHandler = () => {
    setIsPlaying(false);
    alert("Timer completed");
  };

  const resetHandler = () => {
    setTimer(selected.duration);
    setKeyReset((prev) => prev + 1);
    setElapsedTime(0);
    setIsPlaying(false);
  };

  const selectedHandler = (selected: any) => {
    setSelected(selected);
    setTimer(selected.duration);
    setShowModal(false);
    setKeyReset((prev) => prev + 1);
  };

  const onStartHandler = () => {
    startStopTimer();
    // setShowStartModal(true);
  };

  const secondsToMinutes = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    // Ensure two digits for seconds
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${formattedSeconds}`;
  };

  const onPressHandler = () => {
    navigation.navigate("login");
  };

  console.log("Main", selected);

  return (
    <View style={styles.container}>
      <View style={styles.logoView}>
        <TouchableWithoutFeedback onPress={onPressHandler}>
          <Image source={require("./assets/logo-small.png")} height={20} />
        </TouchableWithoutFeedback>
      </View>
      <ImageBackground
        source={require("./assets/background.jpeg")}
        style={{ width: "100%", height: "100%", position: "absolute" }}
      />
      <View style={styles.contentView}>
        <View style={styles.dropdownView}>
          <LinearButton
            title={selected.label}
            onPress={() => setShowModal(true)}
            linearColors={selected.linearColor}
            buttonStyle={styles.selectorBtn}
            textStyle={styles.slectorTxt}
          />
        </View>
        <View key={keyReset}>
          <CountdownCircleTimer
            isPlaying={isPlaying}
            duration={timer}
            colors={["#f99ca0", "#faaeba", "#fccfee", "#fccfee"]}
            colorsTime={[timer, timer * 0.75, timer * 0.5, timer * 0]}
            size={280}
            onComplete={completeHandler}
            onUpdate={setElapsedTime}
          >
            {({ remainingTime }) => (
              <Text style={styles.timerText}>
                {secondsToMinutes(remainingTime)}
              </Text>
            )}
          </CountdownCircleTimer>
        </View>
        <View style={styles.btnView}>
          <TouchableOpacity
            style={styles.startStopBtn}
            onPress={onStartHandler}
          >
            <Text style={styles.startStopText}>
              {isPlaying ? "Pause" : "Start"}
            </Text>
          </TouchableOpacity>
          {elapsedTime !== timer && !isPlaying && (
            <TouchableOpacity style={styles.resetBtn} onPress={resetHandler}>
              <Text style={styles.startStopText}>Reset</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <SelectorModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSelect={selectedHandler}
      />

      <StartModal
        show={showStartModal}
        onClose={() => setShowStartModal(false)}
        onStart={startStopTimer}
      />

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={["5%", "80%"]}
        backgroundStyle={styles.bottomSheet}
      >
        <BottomSheetView style={styles.contentContainer}>
          <BottomSheetContents />
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

export default Main;
