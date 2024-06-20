import { Image, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { EStyleSheet } from "../config/EStyleSheet";

const activeAcheckBox = require("../assets/active-checkbox.png");
const inactiveCheckbox = require("../assets/inactive-checkbox.png");

const TaskHistoryItem = ({item, onRemoveItem}: any) => {
  const [active, setActive] = useState(item.isChecked);
  return (
    <View style={styles.listContainer}>
      <TouchableOpacity style={styles.checkboxView} onPress={() => setActive(!active)}>
        <Image source={active ? activeAcheckBox : inactiveCheckbox} style={styles.checkbox} />
      </TouchableOpacity>
      <View style={styles.listItems}>
        <View key={item.id} style={styles.itemList}>
          <Text style={styles.tasknameTxt}>
            {item.taskname !== "" ? item.taskname : "No task name"}
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
    backgroundColor: "#f9f9f9",
    padding: "10rem",
    marginVertical: "5rem",
    borderRadius: "10rem",
    justifyContent: "space-between",
    flex: 1
  },
  itemListContainer: {
    marginBottom: "5rem",
  },
  trash: {
    width: "20rem",
    height: "20rem",
  },
})