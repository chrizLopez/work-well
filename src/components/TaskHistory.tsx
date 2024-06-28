import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useContext, useState } from "react";
import { EStyleSheet } from "../config/EStyleSheet";
import TaskHistoryItem from "./TaskHistoryItem";
import { AppContext } from "../context/AppProvider";
import { Dropdown } from "react-native-element-dropdown";

type dropdownItemProps = {
  label: string;
  value: string;
};

const data: dropdownItemProps[] = [
  { label: "Goal 1", value: "1" },
  { label: "Goal 2", value: "2" },
  { label: "Goal 3", value: "3" },
  { label: "Goal 4", value: "4" },
  { label: "Goal 5", value: "5" },
  { label: "Goal 6", value: "6" },
  { label: "Goal 7", value: "7" },
  { label: "Goal 8", value: "8" },
];

const TaskHistory = () => {
  const { taskHistory, onAddTask } = useContext(AppContext);
  const [taskName, setTaskName] = useState("");
  const [value, setValue]: any = useState(null);

  const onChangeTexthandler = (text: string) => {
    setTaskName(text);
  };

  const removeItemHandler = (id: number) => {
    // setTaskHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const addTaskHandler = () => {
    onAddTask(taskName);
    setTaskName("");
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
          data={data}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Select goal"
          searchPlaceholder="Search..."
          value={value}
          onChange={(item: dropdownItemProps) => {
            setValue(item.value);
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
        {taskHistory.map((item: any) => (
          <TaskHistoryItem
            key={item.id}
            item={item}
            onRemoveItem={() => removeItemHandler(item.id)}
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
