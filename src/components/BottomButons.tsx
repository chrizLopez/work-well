import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { EStyleSheet } from "../config/EStyleSheet";

const homeIcon = require("../assets/bottom-icons/home.png");
const plusIcon = require("../assets/bottom-icons/plus.png");
const menuIcon = require("../assets/bottom-icons/menu.png");

type BottomButonsProps = {
  onPressHome: () => void;
  onPressPlus: () => void;
  onPressMenu: () => void;
};

const BottomButons = ({
  onPressHome,
  onPressPlus,
  onPressMenu,
}: BottomButonsProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPressHome}>
        <Image source={homeIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onPressPlus}>
        <Image source={plusIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onPressMenu}>
        <Image source={menuIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default BottomButons;

const styles = EStyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
  },
});
