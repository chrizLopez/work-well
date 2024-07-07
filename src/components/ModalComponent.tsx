import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { EStyleSheet } from "../config/EStyleSheet";
import LinearButton from "./LinearButton";
import { getGoalsRequest, saveGoalRequest } from "../utils/requests";

const ModalComponent = ({ show, setShowModal, setShowLoader, getGoals }: any) => {
  const [goal, setGoal] = useState("");

  const saveGoal = async () => {
    if (!goal) return;
    setShowLoader(true);
    const res = await saveGoalRequest({ title: goal, description: "" });
    if (res) {
      getGoals();
      setShowModal(!show);
    }
    setShowLoader(false);
  }

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={show}
        onRequestClose={() => {
          setShowModal(!show);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.inputView}>
              <Text style={styles.lableTxt}>Goal Title</Text>
              <TextInput
                style={styles.inputStl}
                value={goal}
                onChangeText={(text) => setGoal(text)}
              />
            </View>
            <View style={styles.btnItems}>
              <Pressable style={styles.submitBtn} onPress={() => setShowModal(false)}>
                <Text style={styles.saveTxt}>Cancel</Text>
              </Pressable>
              <LinearButton
                title="Save"
                onPress={saveGoal}
                linearColors={["#0984E3", "#74B9FF"]}
                buttonStyle={styles.loginBtn}
                textStyle={styles.saveTxt}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalComponent;

const styles = EStyleSheet.create({
  btnItems: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: "10rem",
    alignItems: "center",
  },
  loginBtn: {
    paddingVertical: "10rem",
    borderRadius: "50rem",
    alignItems: "center",
    justifyContent: "center",
    width: "100rem",
  },
  saveTxt: {
    fontSize: "12rem",
    fontWeight: "500",
    color: "#fff",
  },
  submitBtn: {
    paddingVertical: "9rem",
    borderRadius: "50rem",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#282828CC",
    width: "100rem",
  },
  inputView: {
    marginVertical: "8rem",
    justifyContent: "space-around",
    marginTop: "10rem",
    alignItems: "center",
    fontSize: "12rem",
    width: "100%",
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
    width: "100%",
    padding: "5rem",
    borderRadius: "10rem",
    paddingHorizontal: "10rem",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "#282828F2",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "80%",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
