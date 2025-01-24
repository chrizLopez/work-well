import {
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";

import { EStyleSheet } from "../config/EStyleSheet";
import LinearButton from "./LinearButton";
import { loginRequest, signupRequest } from "../utils/requests";
import { AppContext } from "../context/AppProvider";
import { handleError } from "../utils/errorHandler";
import Toast from "react-native-toast-message";
import { ScrollView } from "react-native-gesture-handler";

type LoginProps = {
  onHide: () => void;
};

const Login = ({ onHide }: LoginProps) => {
  const { setShowLoader, setToken, setIsLoggedIn } = useContext(AppContext);
  const [type, setType] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setEmail("");
    setPassword("");
  }, [type]);

  const loginHandler = async () => {
    setShowLoader(true);
    try {
      const res = await loginRequest(email, password);
      if (res.accessToken) {
        setToken(res.accessToken);
        setIsLoggedIn(true);
        onHide();
        Toast.show({
          text1: "Success",
          text2: "Login Successful",
          type: "success",
        });
      }
    } catch (error) {
      handleError(error);
    }
    setShowLoader(false);
  };

  const signupHandler = async () => {
    if (!email || !password) {
      Toast.show({
        text1: "Error",
        text2: "Please fill all fields",
        type: "error",
      });
      return;
    }
    setShowLoader(true);
    try {
      const res = await signupRequest(email, password);
      console.log('signup', res);
      if (res.status === 200) {
        Toast.show({
          text1: "Success",
          text2: "Signup Successful, Please login to continue",
          type: "success",
        });
      }
    } catch (error) {
      handleError(error);
      setShowLoader(false);
    }
    setShowLoader(false);
  }

  return (
    <ScrollView contentContainerStyle={styles.ccStyle}>
      <View style={styles.settingsView}>
        <Text style={styles.settingsText}>{type.charAt(0).toUpperCase() + type.slice(1)}</Text>
      </View>
      <View style={styles.inputView}>
        <Text style={styles.lableTxt}>Email</Text>
        <TextInput
          style={styles.inputStl}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.inputView}>
        <Text style={styles.lableTxt}>Password</Text>
        <TextInput
          style={styles.inputStl}
          placeholder="Password"
          value={password}
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      {type === "login" && (
        <>
          <Text style={styles.forgotPasswordTxt}>Forgot Password?</Text>
          <View style={styles.submitBtnView}>
            <LinearButton
              title={"Login"}
              onPress={loginHandler}
              linearColors={["#0984E3", "#74B9FF"]}
              buttonStyle={styles.loginBtn}
              textStyle={styles.saveTxt}
            />
          </View>
          <View style={styles.submitBtnView}>
            <TouchableOpacity style={styles.submitBtn} onPress={() => setType('signup')}>
              <Text style={styles.saveTxt}>Signup</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      {type === "signup" && (
        <>
          <View style={styles.submitBtnView}>
            <LinearButton
              title={"Signup"}
              onPress={signupHandler}
              linearColors={["#0984E3", "#74B9FF"]}
              buttonStyle={styles.loginBtn}
              textStyle={styles.saveTxt}
            />
          </View>
          <TouchableOpacity style={styles.backToLoginBtn} onPress={() => setType('login')}>
            <Text style={styles.loginTxt}>Back to Login</Text>
          </TouchableOpacity>
          <Text style={styles.signupAltTxt}>Or Sign Up using</Text>
          <View style={styles.signupAltsView}>
            <TouchableOpacity>
              <Image
                style={styles.iconSignups}
                source={require("../assets/icons/icon-fb.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                style={styles.iconSignups}
                source={require("../assets/icons/icon-tw.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                style={styles.iconSignups}
                source={require("../assets/icons/icon-g.png")}
              />
            </TouchableOpacity>
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default Login;

const styles = EStyleSheet.create({
  backToLoginBtn: {
    alignItems: "center",
    marginTop: "10rem",
  },
  loginTxt: {
    fontSize: "16rem",
    color: "#0984E3",
    textAlign: "center",
    marginVertical: "10rem",
    textDecorationLine: "underline",
  },
  ccStyle: {
    paddingBottom: "90rem",
  },
  signupAltsView: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: "20rem",
    marginHorizontal: "50rem",
  },
  iconSignups: {
    width: "46rem",
    height: "46rem",
  },
  signupAltTxt: {
    fontSize: "12rem",
    color: "#444444",
    textAlign: "center",
    marginTop: "30rem",
  },
  forgotPasswordTxt: {
    fontSize: "12rem",
    color: "#282828",
    textAlign: "center",
    marginTop: "10rem",
  },
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
    marginBottom: "20rem",
  },
  settingsText: {
    fontSize: "24rem",
    fontWeight: "700",
    color: "#282828",
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
  submitBtn: {
    paddingVertical: "15rem",
    borderRadius: "50rem",
    width: "232rem",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#282828CC",
  },
  inputView: {
    marginVertical: "8rem",
    justifyContent: "space-around",
    marginTop: "10rem",
    alignItems: "center",
    fontSize: "12rem",
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
    width: "60%",
    padding: "5rem",
    borderRadius: "10rem",
    paddingHorizontal: "10rem",
  },
});
