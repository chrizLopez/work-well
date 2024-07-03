import {
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";

import { ITEM_SELECTION } from "./static/TimerList";
import { EStyleSheet } from "../config/EStyleSheet";
import { AppContext } from "../context/AppProvider";
import LinearButton from "./LinearButton";

const Settings = ({ onHide }: any) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const { setTimerList, isLoggedIn } = useContext(AppContext);

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

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };

  const onPressAccountHandler = () => {
    // onHide();
    
  }

  return (
    <View>
      <View style={styles.settingsView}>
        <Text style={styles.settingsText}>Settings</Text>
      </View>
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
      <View style={styles.inputView}>
        <Text style={styles.lableTxt}>Theme</Text>
        <View style={styles.darkModeView}>
          <Switch
            trackColor={{ false: "#767577", true: "#A29BFE" }}
            thumbColor={isEnabled ? "#fff" : "#fff"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
            style={styles.switchTgl}
          />
        <Text style={styles.drkmdTxt}>Dark Mode</Text>
      </View>
        </View>
      <View style={styles.submitBtnView}>
        <TouchableOpacity style={styles.submitBtn} onPress={submitHandler}>
          <Text style={styles.saveTxt}>Save Settings</Text>
        </TouchableOpacity>
        <LinearButton
          title={isLoggedIn ? 'User Account' : 'Login Account'}
          onPress={onPressAccountHandler}
          linearColors={["#0984E3", "#74B9FF"]}
          buttonStyle={styles.loginBtn}
          textStyle={styles.saveTxt}
        />
      </View>
    </View>
  );
};

export default Settings;

const styles = EStyleSheet.create({
  saveTxt: {
    fontSize: "16rem",
    fontWeight: "500",
    color: "#fff",
  },
  drkmdTxt: {
    fontSize: "16rem",
    color: "#666666",
    fontWeight: "400",
    marginLeft: "10rem",
  },
  darkModeView: {
    flexDirection: "row",
    alignItems: "center",
  },
  switchTgl: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  settingsView: {
    alignItems: "center",
    width: "100%",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#CCCCCC",
    paddingBottom: "5rem",
  },
  settingsText: {
    fontSize: "24rem",
    fontWeight: "700",
    color: "#282828",
  },
  submitBtn: {
    paddingVertical: "15rem",
    borderRadius: "50rem",
    width: "232rem",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#282828CC",
  },
  loginBtn: {
    paddingVertical: "13rem",
    borderRadius: "50rem",
    width: "232rem",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "10rem",
  },
  submitBtnView: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: "20rem",
  },
  inputView: {
    marginVertical: "8rem",
    justifyContent: "space-around",
    marginTop: "10rem",
    alignItems: "center",
  },
  lableTxt: {
    fontSize: "16rem",
    color: "#282828",
    marginBottom: "5rem",
    fontWeight: "400",
  },
  inputStl: {
    backgroundColor: "#E8E8E8",
    fontSize: "16rem",
    borderWidth: "1rem",
    borderColor: "#CCCCCC",
    width: "50%",
    padding: "5rem",
    borderRadius: "10rem",
    textAlign: "center",
  },
});
