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

const Goals = () => {

  return (
    <View>
      <View style={styles.settingsView}>
        <Text style={styles.settingsText}>Settings</Text>
      </View>
    
      <View style={styles.submitBtnView}>
        <TouchableOpacity style={styles.submitBtn}>
          <Text style={styles.saveTxt}>Save Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Goals;

const styles = EStyleSheet.create({
  saveTxt: {
    fontSize: "16rem",
    fontWeight: "500",
    color: "#fff",
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
  submitBtnView: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: "20rem",
  },
});
