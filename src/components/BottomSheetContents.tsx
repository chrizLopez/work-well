import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { EStyleSheet } from "../config/EStyleSheet";
import TaskHistory from "./TaskHistory";

const BottomSheetContents = () => {
  const [currentTab, setCurrentTab] = React.useState(0);
  return (
    <View>
      <View style={styles.tabView}>
        <View style={styles.tabItemView}>
          <Text style={styles.tabItemText}>Task History</Text>
        </View>
        <View style={styles.tabItemView}>
          <Text style={styles.tabItemText}>Settings</Text>
        </View>
      </View>
      <View style={styles.content}>
        {currentTab === 0 && <TaskHistory />}
        {currentTab === 1 && <Text>Settings</Text>}
      </View>
    </View>
  );
};

export default BottomSheetContents;

const styles = EStyleSheet.create({});
