import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useContext, useState } from "react";
import { EStyleSheet } from "../config/EStyleSheet";
import TaskHistoryItem from "./TaskHistoryItem";
import { AppContext } from "../context/AppProvider";
import { Dropdown } from "react-native-element-dropdown";

type dropdownItemProps = {
  name: string;
  id: string;
  tasks: any[];
  checked: boolean;
};

const TaskHistory = () => {
  const { onAddTask, goals, setGoals } = useContext(AppContext);
  const [taskName, setTaskName] = useState("");
  const [selectedGoal, setSelectedGoal] = useState<dropdownItemProps | null>(null);
  const [counter, setCounter] = useState(0);

  const onChangeTexthandler = (text: string) => {
    setTaskName(text);
  };

  const removeItemHandler = (id: number) => {
    const ind = selectedGoal?.tasks.findIndex((item) => item.id === id);
    if (ind === undefined || ind === -1 || !selectedGoal) {
      return;
    }
    const newTasks = [...selectedGoal.tasks];
    newTasks.splice(ind, 1);
    const newGoal = { ...selectedGoal, tasks: newTasks };
    const indGoal = goals.findIndex((item) => item.id === selectedGoal.id);
    const newGoals = [...goals];
    newGoals[indGoal] = newGoal;
    setGoals(newGoals);
    setSelectedGoal(newGoal);

  };

  const addTaskHandler = () => {
    if (!selectedGoal) {
      return;
    }
    onAddTask(taskName, selectedGoal.id);
    setTaskName("");
  };

  const onPressCheckHandler = (isChecked: boolean, id: string) => {
    if (!selectedGoal) {
      return;
    }
    const ind = selectedGoal.tasks.findIndex((item) => item.id === id);
    if (ind === undefined || ind === -1) {
      return;
    }
    const newTasks = [...selectedGoal.tasks];
    newTasks[ind].checked = isChecked;
    const newGoal = { ...selectedGoal, tasks: newTasks };
    const indGoal = goals.findIndex((item) => item.id === selectedGoal.id);
    const newGoals = [...goals];
    newGoals[indGoal] = newGoal;
    setGoals(newGoals);
    setSelectedGoal(newGoal);
  }

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
          labelField="name"
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
      <View style={styles.itemListContainer}>
        {selectedGoal && selectedGoal.tasks.map((item: any) => (
          <TaskHistoryItem
            key={item.id}
            item={item}
            onRemoveItem={() => removeItemHandler(item.id)}
            onPressCheck={onPressCheckHandler}
          />
        ))}
      </View>
    </View>
  );
};

export default TaskHistory;

const styles = EStyleSheet.create({
  dropdown: {
    width: "100%",
    paddingHorizontal: "10rem",
    borderRadius: "10rem",
    borderWidth: "1rem",
    borderColor: "#CCCCCC",
    backgroundColor: "#E8E8E8"
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
    backgroundColor: '#E8E8E8',
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
    fontSize: '12rem',
    color: 'white',
    fontWeight: "500",
  }
});
