import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";

import { EStyleSheet } from "../config/EStyleSheet";
import { AppContext } from "../context/AppProvider";
import GoalItem from "./GoalItem";
import ModalComponent from "./ModalComponent";
import { getGoalsRequest } from "../utils/requests";
import { handleError } from "../utils/errorHandler";

type GoalsHistoryProps = {};

const GoalsHistory = ({}: GoalsHistoryProps) => {
  const { goals, setGoals, setShowLoader } = useContext(AppContext);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getGoals();
  }, []);

  const getGoals = async () => {
    setShowLoader(true);
    try {
      const res = await getGoalsRequest();
      setGoals(res.lists);
    } catch (error) {
      handleError(error);
    }
    setShowLoader(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.ccStyle}>
      <ModalComponent
        show={showModal}
        setShowModal={setShowModal}
        setShowLoader={setShowLoader}
        getGoals={getGoals}
      />
      <View style={styles.settingsView}>
        <Text style={styles.settingsText}>Your Goals</Text>
      </View>
      <View style={styles.haderView}>
        <Text style={styles.headerTxt}>Goals</Text>
        <Text style={styles.headerTxt}>Status</Text>
      </View>
      <View>
        {goals.map((goal) => (
          <GoalItem
            key={goal.id}
            goal={goal}
            goals={goals}
            setGoals={setGoals}
            setShowLoader={setShowLoader}
            getGoals={getGoals}
          />
        ))}
      </View>

      <View style={styles.submitBtnView}>
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={() => setShowModal(true)}
        >
          <Text style={styles.saveTxt}>Add goal</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default GoalsHistory;

const styles = EStyleSheet.create({
  haderView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "10rem",
  },
  headerTxt: {
    fontSize: "16rem",
    fontWeight: "700",
    color: "#282828",
    marginBottom: "5rem",
  },
  ccStyle: {
    paddingBottom: "100rem",
  },
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
    marginBottom: "10rem",
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
