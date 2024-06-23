import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { EStyleSheet } from "../config/EStyleSheet";
import TaskHistory from "./TaskHistory";
import Settings from "./Settings";

const BottomSheetContents = ({onHide}: any) => {
  const [currentTab, setCurrentTab] = React.useState(0);
  return (
    <View>
      <View style={styles.tabView}>
        <TouchableOpacity
          style={[styles.tabItemView, currentTab === 0 && styles.tabItemActive]}
          onPress={() => setCurrentTab(0)}
        >
          <Text style={styles.tabItemText}>Task History</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabItemView, currentTab === 1 && styles.tabItemActive]}
          onPress={() => setCurrentTab(1)}
        >
          <Text style={styles.tabItemText}>Settings</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        {currentTab === 0 && <TaskHistory />}
        {currentTab === 1 && <Settings onHide={onHide} />}
      </View>
    </View>
  );
};

export default BottomSheetContents;

const styles = EStyleSheet.create({
  tabView: {
    flexDirection: "row",
    justifyContent: "space-around",
    // backgroundColor: "#f9f9f9",
    padding: "10rem",
  },
  tabItemView: {
    padding: "10rem",
    borderRadius: "10rem",
  },
  tabItemActive: {
    backgroundColor: "#f9f9f9",
  },
  tabItemText: {
    color: "#000",
    fontSize: "16rem",
  },
});
