import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useContext, useState } from "react";

import { ITEM_SELECTION } from "./static/TimerList";
import { EStyleSheet } from "../config/EStyleSheet";
import { AppContext } from "../context/AppProvider";

const Settings = ({onHide}: any) => {
  const {setTimerList} = useContext(AppContext);
  const [pomodoroTimer, setPomodoroTimer]: any = useState(
    ITEM_SELECTION[0].duration / 60
  );
  const [shortBreakTimer, setShortBreakTimer]: any = useState(
    ITEM_SELECTION[1].duration / 60
  );
  const [longBreakTimer, setLongBreakTimer]: any = useState(
    ITEM_SELECTION[2].duration / 60
  );

  const pomodoroTimerChangeHandler = (val: any) => {
    let num = parseInt(val);
    if (!num) {
      num = 0;
    }
    if (typeof num === "number") {
      setPomodoroTimer(num);
    }
  };

  const shortBreakTimerChangeHandler = (val: any) => {
    let num = parseInt(val);
    if (!num) {
      num = 0;
    }
    if (typeof num === "number") {
      setShortBreakTimer(num);
    }
  };

  const longBreakTimerChangeHandler = (val: any) => {
    let num = parseInt(val);
    if (!num) {
      num = 0;
    }
    if (typeof num === "number") {
      setLongBreakTimer(num);
    }
  };

  const submitHandler = () => {
    ITEM_SELECTION[0].duration = pomodoroTimer * 60;
    ITEM_SELECTION[1].duration = shortBreakTimer * 60;
    ITEM_SELECTION[2].duration = longBreakTimer * 60;

    setTimerList(ITEM_SELECTION);
    onHide();
  };

  return (
    <View>
      <View style={styles.inputView}>
        <Text style={styles.lableTxt}>Pomodoro</Text>
        <TextInput
          style={styles.inputStl}
          placeholder="Minutes"
          keyboardType="number-pad"
          value={pomodoroTimer.toString()}
          onChangeText={(text) => pomodoroTimerChangeHandler(text)}
        />
      </View>
      <View style={styles.inputView}>
        <Text style={styles.lableTxt}>Short Break</Text>
        <TextInput
          style={styles.inputStl}
          placeholder="Minutes"
          keyboardType="number-pad"
          value={shortBreakTimer.toString()}
          onChangeText={(text) => shortBreakTimerChangeHandler(text)}
        />
      </View>
      <View style={styles.inputView}>
        <Text style={styles.lableTxt}>Long Break</Text>
        <TextInput
          style={styles.inputStl}
          placeholder="Minutes"
          keyboardType="number-pad"
          value={longBreakTimer.toString()}
          onChangeText={(text) => longBreakTimerChangeHandler(text)}
        />
      </View>
      <View style={styles.submitBtnView}>
        <TouchableOpacity style={styles.submitBtn} onPress={submitHandler}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Settings;

const styles = EStyleSheet.create({
  submitBtn: {
    paddingVertical: "15rem",
    paddingHorizontal: "80rem",
    borderRadius: "50rem",
    borderWidth: "2rem",
    borderColor: "#66666659",
  },
  submitBtnView: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: "20rem",
  },
  inputView: {
    marginVertical: "10rem",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: "20rem",
    alignItems: "center",
  },
  lableTxt: {
    fontSize: "16rem",
    color: "#666666",
    marginBottom: "5rem",
  },
  inputStl: {
    backgroundColor: "#FFFFFF",
    fontSize: "16rem",
    borderWidth: "1rem",
    borderColor: "#CCCCCC",
    width: "40%",
    padding: "10rem",
    borderRadius: "10rem",
    // marginLeft: "10%",
  },
});
