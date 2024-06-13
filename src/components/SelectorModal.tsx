import { Modal, Text, TouchableOpacity, View } from 'react-native';
import {EStyleSheet} from '../config/EStyleSheet';
import React from 'react';

type SelectorModalProps = {
  show: boolean;
  onSelect: (selected: string) => void;
  onClose: () => void;
  items: any;
}

const SelectorModal = ({show, onSelect, onClose, items}: SelectorModalProps) => {
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
          {items.map((item: any, index: number) => (
            <TouchableOpacity
              key={index}
              style={styles.selectorBtn}
              onPress={() => {
                onSelect(item);
                onClose();
              }}>
              <Text style={styles.slectorTxt}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  )
}

export default SelectorModal

const styles = EStyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.95)',
    paddingVertical: '80rem',
    paddingHorizontal: '50rem',
    borderRadius: '20rem',
  },
  slectorTxt: {
    fontSize: '18rem',
    fontWeight: 'bold',
    color: '#fff',
  },
  selectorView: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
  },
  selectorBtn: {
    paddingVertical: '10rem',
    paddingHorizontal: '50rem',
    borderRadius: '50rem',
    marginVertical: '5rem',
    borderWidth: '2rem',
    borderColor: '#fff',
  }
})