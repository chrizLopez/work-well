import { Text, TouchableOpacity, View } from 'react-native';
import {EStyleSheet} from '../config/EStyleSheet';
import React from 'react'

const Selector = () => {
  return (
    <View style={styles.selectorView}>
      <TouchableOpacity style={styles.selectorBtn}>
        <Text style={styles.slectorTxt}>Pomodoro</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.selectorBtn}>
        <Text>Short Break</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.selectorBtn}>
        <Text>Long Break</Text>
      </TouchableOpacity> */}
    </View>
  )
}

export default Selector

const styles = EStyleSheet.create({
  slectorTxt: {
    fontSize: '18rem',
    fontWeight: 'bold',
    color: '#fff',
  },
  selectorView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectorBtn: {
    paddingVertical: '10rem',
    paddingHorizontal: '50rem',
    borderRadius: '50rem',
    marginVertical: '1rem',
    borderWidth: '2rem',
    borderColor: '#fff',
  }
})