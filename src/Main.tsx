import { ImageBackground, View, Image } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import SelectorModal from "./components/SelectorModal";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

import styles from "./styles";
import BottomSheetContents from "./components/BottomSheetContents";
import LinearButton from "./components/LinearButton";
import CountdownTimer from "./components/CountdownTimer";
import BottomButons from "./components/BottomButons";
import { AppContext } from "./context/AppProvider";
import Settings from "./components/Settings";
import TaskHistory from "./components/TaskHistory";

import { GOAL_LIST } from "./components/static/InitialGoals";

const Main = () => {
  const {timerList, setGoals} = useContext(AppContext);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const bottomSheetRefTask = useRef<BottomSheet>(null);

  const [timer, setTimer] = useState(1500);
  const [keyReset, setKeyReset] = useState(0);
  const [showSelector, setShowSelector] = useState(true);
  const [showButtons, setShowButtons] = useState(false);
  const [selected, setSelected] = useState({
    id: 1,
    label: "Pomodoro",
    duration: 1500,
    isChecked: false,
    linearColor: ["#A29BFE", "#74B9FF"],
  });

  useEffect(() => {
    setGoals(GOAL_LIST);
    console.log("GOAL_LIST set");
  }, []);

  const handleKeyReset = () => {
    setKeyReset((prev) => prev + 1);
  };

  const selectedHandler = (selected: any) => {
    setSelected(selected);
    setTimer(selected.duration);
    handleKeyReset();

    setShowButtons(true);
    setShowSelector(false);
  };

  const hideBottomSheetHandler = () => {
    bottomSheetRef.current?.close();
  };

  const onPressHomeHandler = () => {
    setShowButtons(false);
    setShowSelector(true);
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoView}>
        <Image
          source={require("./assets/logo-small.png")}
          style={styles.logo}
        />
      </View>
      <ImageBackground
        source={require("./assets/background.jpeg")}
        style={{ width: "100%", height: "100%", position: "absolute" }}
      />
      <View style={styles.contentView}>
        <View key={keyReset} style={styles.timerView}>
          <CountdownTimer
            duration={timer}
            setTimer={(duration: any) => setTimer(duration)}
            selected={selected}
            onReset={handleKeyReset}
            showButtons={showButtons}
          />
        </View>

        <View>
          {showSelector && (
            <View style={styles.timerContainer}>
              {timerList.map((item: any, index: number) => (
                <LinearButton 
                  key={index}
                  title={item.label}
                  onPress={() => {
                    selectedHandler(item);
                  }}
                  linearColors={item.linearColor}
                  buttonStyle={styles.selectorBtn}
                  textStyle={styles.slectorTxt}
                />
              ))}
            </View>
          )}
        </View>
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={["5%", "70%"]}
        backgroundStyle={styles.bottomSheet}
      >
        <BottomSheetView style={styles.contentContainer}>
          <Settings onHide={hideBottomSheetHandler} />
        </BottomSheetView>
      </BottomSheet>

      <BottomSheet
        ref={bottomSheetRefTask}
        snapPoints={["5%", "70%"]}
        backgroundStyle={styles.bottomSheet}
      >
        <BottomSheetView style={styles.contentContainer}>
          <TaskHistory />
        </BottomSheetView>
      </BottomSheet>

      <View style={styles.bottomButtonsView}>
        <BottomButons
          onPressHome={onPressHomeHandler}
          onPressPlus={() => {
            setTimeout(() => {
              bottomSheetRefTask.current?.expand();
            }, 500);
            bottomSheetRef.current?.close();
          }}
          onPressMenu={() => {
            setTimeout(() => {
              bottomSheetRef.current?.expand();
            }, 500);
            bottomSheetRefTask.current?.close();
          }}
        />
      </View>
    </View>
  );
};

export default Main;
