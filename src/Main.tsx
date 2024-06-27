import { ImageBackground, View, Image } from "react-native";
import React, { useContext, useRef, useState } from "react";
import SelectorModal from "./components/SelectorModal";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

import styles from "./styles";
import BottomSheetContents from "./components/BottomSheetContents";
import LinearButton from "./components/LinearButton";
import CountdownTimer from "./components/CountdownTimer";
import BottomButons from "./components/BottomButons";
import { AppContext } from "./context/AppProvider";

const logoImg = require("./assets/logo-small.png");

const Main = () => {
  const {timerList} = useContext(AppContext);
  const bottomSheetRef = useRef<BottomSheet>(null);

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
      {/* <SelectorModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSelect={selectedHandler}
      /> */}

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={["5%", "80%"]}
        backgroundStyle={styles.bottomSheet}
      >
        <BottomSheetView style={styles.contentContainer}>
          <BottomSheetContents onHide={hideBottomSheetHandler} />
        </BottomSheetView>
      </BottomSheet>

      <View style={styles.bottomButtonsView}>
        <BottomButons
          onPressHome={onPressHomeHandler}
          onPressPlus={() => bottomSheetRef.current?.expand()}
          onPressMenu={() => console.log("menu")}
        />
      </View>
    </View>
  );
};

export default Main;
