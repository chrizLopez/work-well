import {
  Image,
  ImageBackground,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import SelectorModal from "./components/SelectorModal";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

import styles from "./styles";
import BottomSheetContents from "./components/BottomSheetContents";
import LinearButton from "./components/LinearButton";
import CountdownTimer from "./components/CountdownTimer";

const Main = ({ navigation }: any) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const [timer, setTimer] = useState(1500);
  const [keyReset, setKeyReset] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState({
    id: 1,
    label: "Pomodoro",
    duration: 1500,
    isChecked: false,
    linearColor: ["#A29BFE", "#74B9FF"],
  });

  const handleKeyReset = () => {
    setKeyReset((prev) => prev + 1);
  }

  const selectedHandler = (selected: any) => {
    setSelected(selected);
    setTimer(selected.duration);
    setShowModal(false);
    handleKeyReset();
  };

  const onPressHandler = () => {
    navigation.navigate("login");
  };

  const hideBottomSheetHandler = () => {
    bottomSheetRef.current?.close();
  }

  return (
    <View style={styles.container}>
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

          <CountdownTimer
            duration={timer}
            setTimer={(duration: any) => setTimer(duration)}
            selected={selected}
            onReset={handleKeyReset}
          />
        </View>

      </View>
      <SelectorModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSelect={selectedHandler}
      />

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={["5%", "80%"]}
        backgroundStyle={styles.bottomSheet}
      >
        <BottomSheetView style={styles.contentContainer}>
          <BottomSheetContents onHide={hideBottomSheetHandler}/>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

export default Main;
