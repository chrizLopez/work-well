import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {EStyleSheet} from '../config/EStyleSheet';

const TaskHistory = ({data, removeItem}: any) => {
  return (
    <View>
      <Text style={styles.headerTxt}>TaskHistory</Text>
      <View style={styles.itemListContainer}>
        {data.map((item: any) => (
          <View style={styles.listItems}>
            <View key={item.id} style={styles.itemList}>
              <Text style={styles.tasknameTxt}>{item.taskname !== '' ? item.taskname : 'No task name'}</Text>
            </View>
            <TouchableOpacity onPress={() => removeItem(item.id)}>
              <Image style={styles.trash} source={require('../assets/icons/trash.png')} />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  )
}

export default TaskHistory

const styles = EStyleSheet.create({
  trash: {
    width: '20rem',
    height: '20rem',
  },
  listItems: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: '10rem',
    marginVertical: '5rem',
    borderRadius: '10rem',
    justifyContent: 'space-between',
  },
  itemListContainer: {
    marginVertical: '20rem',
  },
  headerTxt: {
    fontSize: '20rem',
    fontWeight: 'bold',
  },
  itemList: {
  },
  tasknameTxt: {
    fontSize: '16rem',
  }
})