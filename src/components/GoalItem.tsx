import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import Collapsible from "react-native-collapsible";
import { EStyleSheet } from "../config/EStyleSheet";
import Checkbox from "expo-checkbox";

const GoalItem = ({ goal, goals, setGoals }: any) => {
  const [isCollpased, setIsCollapsed] = useState(true);
  const [selected, setSelected]: any = useState({});
  const [checkedTaskCount, setCheckedTaskCount] = useState(0);
  const { name, tasks } = goal;
  useEffect(() => {
    setSelected(goal);
    setCheckedTaskCount(tasks.filter((task: any) => task.checked).length);
  }, []);

  useEffect(() => {
    if (selected.tasks) {
      setCheckedTaskCount(selected.tasks.filter((task: any) => task.checked).length);
    }
  }, [selected]);

  const onPressCheckHandler = (isChecked: boolean, id: string) => {
    if (!selected) {
      return;
    }
    const ind = selected.tasks.findIndex((item: any) => item.id === id);
    if (ind === undefined || ind === -1) {
      return;
    }
    const newTasks = [...selected.tasks];
    newTasks[ind].checked = isChecked;
    const newGoal = { ...selected, tasks: newTasks };
    const indGoal = goals.findIndex((item: any) => item.id === goal.id);
    const newGoals = [...goals];
    newGoals[indGoal] = newGoal;
    setGoals(newGoals);
    setSelected(newGoal);
  };


  const removeItemHandler = (id: number) => {
    const ind = selected?.tasks.findIndex((item: any) => item.id === id);
    if (ind === undefined || ind === -1 || !selected) {
      return;
    }
    const newTasks = [...selected.tasks];
    newTasks.splice(ind, 1);
    const newGoal = { ...selected, tasks: newTasks };
    const indGoal = goals.findIndex((item:  any) => item.id === selected.id);
    const newGoals = [...goals];
    newGoals[indGoal] = newGoal;
    setGoals(newGoals);
    setSelected(newGoal);

  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setIsCollapsed(!isCollpased)}
        style={styles.itemTitleView}
      >
        <Text style={styles.itemTxt}>{name}</Text>
        <Text style={styles.itemTxt}>
          {checkedTaskCount}/{tasks.length}
        </Text>
      </TouchableOpacity>
      <Collapsible collapsed={isCollpased}>
        {tasks.map((task: any) => (
          <View style={styles.taskItem} key={task.id}>
            <View style={styles.leftItem}>
              <Checkbox
                style={styles.checkbox}
                value={task.checked}
                onValueChange={(val) => onPressCheckHandler(val, task.id)}
                color={task.checked ? "#74B9FFCC" : undefined}
              />
              <Text style={styles.tasknameTxt}>{task.name}</Text>
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
