import { Modal, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react';
import {EStyleSheet} from '../config/EStyleSheet';

type StartModalProps = {
  show: boolean;
  onClose: () => void;
  onStart: (data: any) => void;
}

const StartModal = ({show, onClose, onStart}: StartModalProps) => {
  const [taskName, setTaskName] = useState('');
  const onStartHandler = () => {
    onStart(taskName);
    onClose();
  }
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={show}
      onRequestClose={() => {
        onClose();
      }}>
      <View style={styles.selectorView}>
        <View style={styles.container}>
          <View>
            <Text style={styles.focusTxt}>Start Focus</Text>
            <TextInput
              style={styles.txtInput}
              placeholder='Task name'
              placeholderTextColor='#fff'
              multiline
              value={taskName}
              onChangeText={setTaskName}
            />
            <View style={styles.btnView}>
              <TouchableOpacity onPress={onClose} style={styles.cancelBtn}>
                <Text style={{color: '#fff'}}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onStartHandler} style={styles.startBtn}>
                <Text style={{color: '#fff'}}>Start</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default StartModal;

const styles = EStyleSheet.create({
  startBtn: {
    paddingVertical: '10rem',
    paddingHorizontal: '20rem',
    backgroundColor: '#f64082',
    borderRadius: '10rem',
  },
  cancelBtn: {
    paddingVertical: '10rem',
    paddingHorizontal: '20rem',
    borderRadius: '10rem',
    borderWidth: '1rem',
    borderColor: '#fff',
  },
  container: {
    backgroundColor: 'rgba(0,0,0,0.95)',
    paddingVertical: 50,
    paddingHorizontal: 40,
    borderRadius: 20,
  },
  focusTxt: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: '10rem',
  },
  selectorView: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
  },
  txtInput: {
    height: '90rem',
    width: '250rem',
    borderColor: 'gray',
    borderWidth: 1,
    color: '#fff',
    padding: '10rem',
    borderRadius: '10rem',
  },
  btnView: {
    flexDirection: 'row',
    marginTop: '30rem',
    justifyContent: 'flex-end',
    gap: '10rem',
  }
})