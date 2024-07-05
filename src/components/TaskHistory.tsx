import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { EStyleSheet } from "../config/EStyleSheet";
import TaskHistoryItem from "./TaskHistoryItem";
import { AppContext } from "../context/AppProvider";
import { Dropdown } from "react-native-element-dropdown";
import {
  addTaskRequest,
  getGoalsRequest,
  updateTaskRequest,
} from "../utils/requests";
import { ScrollView } from "react-native-gesture-handler";

type dropdownItemProps = {
  title: string;
  id: string;
  items: any[];
  description: string;
};

const TaskHistory = () => {
  const { onAddTask, goals, setGoals, setShowLoader } = useContext(AppContext);
  const [taskName, setTaskName] = useState("");
  const [selectedGoal, setSelectedGoal] = useState<dropdownItemProps | null>(
    null
  );

  useEffect(() => {
    getGoals();
  }, []);

  const getGoals = async () => {
    const res = await getGoalsRequest();
    setGoals(res.lists);
  };

  const onChangeTexthandler = (text: string) => {
    setTaskName(text);
  };

  const addTaskHandler = async () => {
    if (!selectedGoal) {
      return;
    }
    setShowLoader(true);
    const task = {
      title: taskName,
      done: false,
      listId: selectedGoal.id,
      taskType: 0,
      notes: "",
    };

    const res = await addTaskRequest(task);
    onAddTask(taskName, selectedGoal.id);
    setTaskName("");
    setShowLoader(false);
  };

  const onPressCheckHandler = async (isChecked: boolean, data: any) => {
    setShowLoader(true);
    data.done = isChecked;
    const res = await updateTaskRequest(data.id, data);
    if (res) {
      updateCheck(isChecked, data.id);
    }
    setShowLoader(false);
  };

  const updateCheck = (isChecked: boolean, id: string) => {
    if (!selectedGoal) {
      return;
    }
    const ind = selectedGoal.items.findIndex((item) => item.id === id);
    if (ind === undefined || ind === -1) {
      return;
    }
    const newTasks = [...selectedGoal.items];
    newTasks[ind].done = isChecked;
    const newGoal = { ...selectedGoal, tasks: newTasks };
    const indGoal = goals.findIndex((item) => item.id === selectedGoal.id);
    const newGoals = [...goals];
    newGoals[indGoal] = newGoal;
    setGoals(newGoals);
    setSelectedGoal(newGoal);
  };

  const removeItemHandler = (id: number) => {
    const ind = selectedGoal?.items.findIndex((item) => item.id === id);
    if (ind === undefined || ind === -1 || !selectedGoal) {
      return;
    }
    const newTasks = [...selectedGoal.items];
    newTasks.splice(ind, 1);
    const newGoal = { ...selectedGoal, tasks: newTasks };
    const indGoal = goals.findIndex((item) => item.id === selectedGoal.id);
    const newGoals = [...goals];
    newGoals[indGoal] = newGoal;
    setGoals(newGoals);
    setSelectedGoal(newGoal);
  };

  return (
    <View>
      <View>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={goals}
          maxHeight={300}
          labelField="title"
          valueField="id"
          placeholder="Select goal"
          searchPlaceholder="Search..."
          value={selectedGoal}
          onChange={(item: dropdownItemProps) => {
            setSelectedGoal(item);
          }}
        />
      </View>
      <View style={styles.addTaskView}>
        <TextInput
          placeholder="Task name"
          value={taskName}
          style={styles.inputTask}
          onChangeText={onChangeTexthandler}
        />
        <TouchableOpacity style={styles.addtaskBtn} onPress={addTaskHandler}>
          <Text style={styles.addtaskTxt}>Add Task</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.svStyle}>
        <ScrollView
          style={styles.itemListContainer}
          contentContainerStyle={styles.ccStyle}
          showsVerticalScrollIndicator={false}
        >
          {selectedGoal &&
            selectedGoal.items.map((item: any) => (
              <TaskHistoryItem
                key={item.id}
                item={item}
                onRemoveItem={() => {}}
                onPressCheck={onPressCheckHandler}
              />
            ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default TaskHistory;

const styles = EStyleSheet.create({
  svStyle: {
    height: "80%",
  },
  ccStyle: {
    paddingBottom: "100rem",
  },
  dropdown: {
    width: "100%",
    paddingHorizontal: "10rem",
    borderRadius: "10rem",
    borderWidth: "1rem",
    borderColor: "#CCCCCC",
    backgroundColor: "#E8E8E8",
  },
  addtaskBtn: {
    backgroundColor: "#282828CC",
    padding: "10rem",
    borderRadius: "20rem",
    paddingHorizontal: "20rem",
  },
  inputTask: {
    paddingVertical: "7rem",
    paddingHorizontal: "10rem",
    borderWidth: "1rem",
    borderColor: "#CCCCCC",
    width: "70%",
    backgroundColor: "#E8E8E8",
    borderRadius: "10rem",
  },
  addTaskView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: "5rem",
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
  addtaskTxt: {
    fontSize: "12rem",
    color: "white",
    fontWeight: "500",
  },
});
