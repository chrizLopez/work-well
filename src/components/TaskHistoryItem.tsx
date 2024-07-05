import { Image, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { EStyleSheet } from "../config/EStyleSheet";

const activeAcheckBox = require("../assets/active-checkbox.png");
const inactiveCheckbox = require("../assets/inactive-checkbox.png");

type TaskHistoryItemProps = {
  item: any;
  onRemoveItem: (id: string) => void;
  onPressCheck: (isChecked: boolean, id: string) => void;
}

const TaskHistoryItem = ({item, onRemoveItem, onPressCheck}: TaskHistoryItemProps) => {
const onCheckPressHandler = () => {
    const newVal = !item.done;
    onPressCheck(newVal, item);
  }

  return (
    <View style={styles.listContainer}>
      <TouchableOpacity style={styles.checkboxView} onPress={onCheckPressHandler}>
        <Image source={item.done ? activeAcheckBox : inactiveCheckbox} style={styles.checkbox} />
      </TouchableOpacity>
      <View style={styles.listItems}>
        <View key={item.id} style={styles.itemList}>
          <Text style={styles.tasknameTxt}>
            {item.title !== "" ? item.title : "No task name"}
          </Text>
        </View>
        <TouchableOpacity onPress={() => onRemoveItem(item.id)}>
          <Image
            style={styles.trash}
            source={require("../assets/icons/trash.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default TaskHistoryItem

const styles = EStyleSheet.create({
  checkboxView: {
    justifyContent: "center",
    alignItems: "center",
    paddingRight: "10rem",
  },
  listContainer: {
    flexDirection: "row",
    marginBottom: "5rem",
  },
  checkbox: {
    width: "20rem",
    height: "20rem",
  },
  listItems: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "#f9f9f9",
    padding: "10rem",
    marginVertical: "2rem",
    borderRadius: "10rem",
    justifyContent: "space-between",
    flex: 1,
    borderWidth: "1rem",
    borderColor: "#CCCCCC",
  },
  itemListContainer: {
    marginBottom: "5rem",
  },
  trash: {
    width: "20rem",
    height: "20rem",
  },
})