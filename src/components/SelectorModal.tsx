import { Modal, Text, TouchableOpacity, View } from 'react-native';
import {EStyleSheet} from '../config/EStyleSheet';
import React, { useContext } from 'react';
import { AppContext } from '../context/AppProvider';
import LinearButton from './LinearButton';

type SelectorModalProps = {
  show: boolean;
  onSelect: (selected: string) => void;
  onClose: () => void;
}

const SelectorModal = ({show, onSelect, onClose}: SelectorModalProps) => {
  const {timerList} = useContext(AppContext);
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
          {timerList.map((item: any, index: number) => (
            <LinearButton 
              key={index}
              title={item.label}
              onPress={() => {
                onSelect(item);
                onClose();
              }}
              linearColors={item.linearColor}
              buttonStyle={styles.selectorBtn}
              textStyle={styles.slectorTxt}
            />
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
    fontWeight: '500',
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