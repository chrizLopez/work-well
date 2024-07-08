import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import Collapsible from "react-native-collapsible";
import { EStyleSheet } from "../config/EStyleSheet";
import Checkbox from "expo-checkbox";
import { deleteTaskRequest, updateTaskRequest } from "../utils/requests";

const GoalItem = ({ goal, goals, setGoals, setShowLoader, getGoals }: any) => {
  const [isCollpased, setIsCollapsed] = useState(true);
  const [selected, setSelected]: any = useState({});
  const [checkedTaskCount, setCheckedTaskCount] = useState(0);
  const { title, items } = goal;
  useEffect(() => {
    setSelected(goal);
    setCheckedTaskCount(items.filter((task: any) => task.done).length);
  }, []);

  useEffect(() => {
    if (selected.tasks) {
      setCheckedTaskCount(selected.items.filter((task: any) => task.done).length);
    }
  }, [selected]);

  const onPressCheckHandler = async (isChecked: boolean, data: any) => {
    setShowLoader(true);
    data.done = isChecked;
    const res = await updateTaskRequest(data.id, data);
    if (res) {
      updateCheck(isChecked, data.id);
    }
    setShowLoader(false);
  }

  const updateCheck = (isChecked: boolean, id: string) => {
    if (!selected) {
      return;
    }
    const ind = selected.items.findIndex((item: any) => item.id === id);
    if (ind === undefined || ind === -1) {
      return;
    }
    const newTasks = [...selected.items];
    newTasks[ind].done = isChecked;
    const newGoal = { ...selected, tasks: newTasks };
    const indGoal = goals.findIndex((item: any) => item.id === goal.id);
    const newGoals = [...goals];
    newGoals[indGoal] = newGoal;
    setGoals(newGoals);
    setSelected(newGoal);
  };


  const removeItemHandler = async (id: number) => {
    const res = await deleteTaskRequest(id);
    if (res) {
      getGoals();
    }

  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setIsCollapsed(!isCollpased)}
        style={styles.itemTitleView}
      >
        <Text style={styles.itemTxt}>{title}</Text>
        <Text style={styles.itemTxt}>
          {checkedTaskCount}/{items.length}
        </Text>
      </TouchableOpacity>
      <Collapsible collapsed={isCollpased}>
        {items.map((task: any) => (
          <View style={styles.taskItem} key={task.id}>
            <View style={styles.leftItem}>
              <Checkbox
                style={styles.checkbox}
                value={task.done}
                onValueChange={(val) => onPressCheckHandler(val, task)}
                color={task.done ? "#74B9FFCC" : undefined}
              />
              <Text style={styles.tasknameTxt}>{task.title}</Text>
            </View>
            <TouchableOpacity onPress={() => removeItemHandler(task.id)}>
              <Image style={styles.deleteIco} source={require("../assets/icons/trash.png")} />
            </TouchableOpacity>
          </View>
        ))}
      </Collapsible>
    </View>
  );
};

export default GoalItem;

const styles = EStyleSheet.create({
  deleteIco: {
    width: "20rem",
    height: "20rem",
  },
  tasknameTxt: {
    fontSize: "12rem",
    fontWeight: "400",
    color: "#000000",
  },
  leftItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  checkbox: {
    borderRadius: "20rem",
  },
  itemTitleView: {
    padding: "10rem",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  taskItem: {
    padding: "12rem",
    paddingHorizontal: "20rem",
    backgroundColor: "#EEEEEE",
    marginBottom: "2rem",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container: {
    marginBottom: "2rem",
    backgroundColor: "#E8E8E8",
  },
  itemTxt: {
    fontSize: "12rem",
    fontWeight: "700",
    color: "#282828",
  },
});
