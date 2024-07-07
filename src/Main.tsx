import { ImageBackground, View, Image, ActivityIndicator } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

import styles from "./styles";
import LinearButton from "./components/LinearButton";
import CountdownTimer from "./components/CountdownTimer";
import BottomButons from "./components/BottomButons";
import { AppContext } from "./context/AppProvider";
import Settings from "./components/Settings";
import TaskHistory from "./components/TaskHistory";

import GoalsHistory from "./components/GoalsHistory";
import Login from "./components/Login";

const Main = () => {
  const { timerList, setGoals, showLoader, isLoggedIn } = useContext(AppContext);
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
  const [settingsView, setSettingsView] = useState(1);
  
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

  const hideBottomSheetTaskHandler = () => {
    bottomSheetRefTask.current?.close();
  };

  const onPressHomeHandler = () => {
    setShowButtons(false);
    setShowSelector(true);
  };

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
          {settingsView === 1 && (
            <Settings
              onHide={hideBottomSheetHandler}
              setView={(type) => setSettingsView(type)}
            />
          )}
          {settingsView === 2 && <GoalsHistory />}
          {settingsView === 3 && <Login onHide={hideBottomSheetHandler} />}
        </BottomSheetView>
      </BottomSheet>

      <BottomSheet
        ref={bottomSheetRefTask}
        snapPoints={["5%", "70%"]}
        backgroundStyle={styles.bottomSheet}
      >
        <BottomSheetView style={styles.contentContainer}>
          {isLoggedIn ? (
            <TaskHistory />
          ) : (
            <Login onHide={hideBottomSheetTaskHandler} />
          )}
        </BottomSheetView>
      </BottomSheet>

      <View style={styles.bottomButtonsView}>
        <BottomButons
          onPressHome={onPressHomeHandler}
          onPressPlus={() => {
            setTimeout(() => {
              bottomSheetRefTask.current?.expand();
            }, 100);
            bottomSheetRef.current?.close();
          }}
          onPressMenu={() => {
            setTimeout(() => {
              bottomSheetRef.current?.expand();
            }, 100);
            bottomSheetRefTask.current?.close();
            setSettingsView(1);
          }}
        />
      </View>
      {showLoader && (
        <View style={styles.loaderView}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      )}
    </View>
  );
};

export default Main;
