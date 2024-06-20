import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import React from "react";
import { EStyleSheet } from "../config/EStyleSheet";
import TaskHistoryItem from "./TaskHistoryItem";

const activeAcheckBox = require("../assets/active-checkbox.png");
const inactiveCheckbox = require("../assets/inactive-checkbox.png");

const TaskHistory = ({ data, removeItem, onAddTask }: any) => {
  const [taskName, setTaskName] = React.useState("");

  const onChangeTexthandler = (text: string) => {
    setTaskName(text);
  };

  const addTaskHandler = () => {
    onAddTask(taskName);
    setTaskName("");
  }
  return (
    <View>
      <View style={styles.addTaskView}>
        <TextInput
          placeholder="Task name"
          value={taskName}
          style={styles.inputTask}
          onChangeText={onChangeTexthandler}
        />
        <TouchableOpacity
          style={styles.addtaskBtn}
          onPress={addTaskHandler}
        >
          <Text>Add Task</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.itemListContainer}>
        {data.map((item: any) => (
          <TaskHistoryItem key={item.id} item={item} onRemoveItem={removeItem} />
        ))}
      </View>
    </View>
  );
};

export default TaskHistory;

const styles = EStyleSheet.create({
  addtaskBtn: {
    backgroundColor: "#f9f9f9",
    padding: "10rem",
    borderRadius: "10rem",
  },
  inputTask: {
    paddingVertical: "7rem",
    paddingHorizontal: "10rem",
  },
  addTaskView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: "20rem",
    alignItems: "center",
    borderBottomWidth: "1rem",
    borderBottomColor: "#f9f9f9",
    paddingVertical: "10rem",
  },
  headerTxt: {
    fontSize: "20rem",
    fontWeight: "bold",
  },
  itemList: {},
  tasknameTxt: {
    fontSize: "16rem",
  },
});
