import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useContext, useState } from "react";
import { EStyleSheet } from "../config/EStyleSheet";
import TaskHistoryItem from "./TaskHistoryItem";
import { AppContext } from "../context/AppProvider";

const TaskHistory = () => {
  const {taskHistory, onAddTask} = useContext(AppContext);
  const [taskName, setTaskName] = useState("");

  const onChangeTexthandler = (text: string) => {
    setTaskName(text);
  };

  const removeItemHandler = (id: number) => {
    // setTaskHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const addTaskHandler = () => {
    onAddTask(taskName);
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
        {taskHistory.map((item: any) => (
          <TaskHistoryItem key={item.id} item={item} onRemoveItem={() => removeItemHandler(item.id)} />
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
