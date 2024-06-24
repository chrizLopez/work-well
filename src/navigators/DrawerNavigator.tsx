import { Text, Image, View, TouchableOpacity } from "react-native";
import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import RootNavigator from "./RootNavigator";
import { EStyleSheet } from "../config/EStyleSheet";
import Ionicons from '@expo/vector-icons/Ionicons';
import ProfilePage from "../profile";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const headerComponent = ({ navigation, route, options }: any) => {
    console.log("options", navigation);
    return (
      <View style={styles.logoView}>
        <TouchableOpacity style={styles.menuIconView} onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={35} color="white" />
        </TouchableOpacity>
        <View>
          <Image source={require("../assets/logo-small.png")} height={20} />
        </View>
      </View>
    );
  };

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        header: headerComponent,
        headerTransparent: true,
        drawerStyle: styles.drawerStyle,
        drawerType: "front",
        drawerActiveBackgroundColor: "#00000040",
        drawerLabelStyle: styles.drawerLabelStyle,
        drawerActiveTintColor: "white",
      }}
    >
      <Drawer.Screen name="Home" component={RootNavigator} />
      <Drawer.Screen name="Profile" component={ProfilePage} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

const styles = EStyleSheet.create({
  drawerLabelStyle: {
    // color: "white",
    fontSize: "16rem",
    fontWeight: "500",
  },
  drawerStyle: {
    width: "40%",
    // backgroundColor: "#00000040",
  },
  menuIconView: {
    marginLeft: "10rem",
  },
  logoView: {
    zIndex: 1,
    top: "60rem",
    right: 0,
    left: 0,
    backgroundColor: "#00000020",
    paddingVertical: "10rem",
    alignItems: "center",
    flexDirection: "row",
    gap: "20rem",
  },
});
