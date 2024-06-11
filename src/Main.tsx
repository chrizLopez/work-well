import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react';
import {EStyleSheet} from './config/EStyleSheet';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import SelectorModal from './components/SelectorModal';

const ITEM_SELECTION = [
  {
    id: 1,
    label: 'Pomodoro',
    duration: 1500,
  },
  {
    id: 2,
    label: 'Short Break',
    duration: 300,
  },
  {
    id: 3,
    label: 'Long Break',
    duration: 900,
  },
]

const Main = () => {
  const [timer, setTimer] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [keyReset, setKeyReset] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState('Pomodoro');

  const startStopTimer = () => {
    setIsPlaying((prev) => !prev);
  }

  const completeHandler = () => {
    setIsPlaying(false);
    alert('Timer completed');
  }

  const resetHandler = () => {
    setTimer(30);
    setKeyReset((prev) => prev + 1);
    setElapsedTime(0);
    setIsPlaying(false);
  }

  const selectedHandler = (selected: any) => {
    setSelected(selected.label);
    setTimer(selected.duration);
    setShowModal(false);
    setKeyReset((prev) => prev + 1);
  }

  const secondsToMinutes = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    // Ensure two digits for seconds
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${formattedSeconds}`;
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('./assets/background.jpeg')} style={{ width: '100%', height: '100%', position: 'absolute' }} />
      <View style={styles.contentView}>
        <View style={styles.dropdownView}>
          <TouchableOpacity style={styles.selectorBtn} onPress={() => setShowModal(true)}>
            <Text style={styles.slectorTxt}>{selected}</Text>
          </TouchableOpacity>
        </View>
        <View key={keyReset}>
          <CountdownCircleTimer
            isPlaying={isPlaying}
            duration={timer}
            colors={['#008000', '#ffff00', '#ffa500', '#ff0000']}
            colorsTime={[timer, timer * .75, timer * .5, timer * 0]}
            size={280}
            onComplete={completeHandler}
            onUpdate={setElapsedTime}
          >
            {({ remainingTime }) => <Text style={styles.timerText}>{secondsToMinutes(remainingTime)}</Text>}
          </CountdownCircleTimer>
        </View>
        <View style={styles.btnView}>
          <TouchableOpacity style={styles.startStopBtn} onPress={startStopTimer}>
            <Text style={styles.startStopText}>{isPlaying ? 'Pause' : 'Start'}</Text>
          </TouchableOpacity>
          {(elapsedTime !== timer && !isPlaying) && (
            <TouchableOpacity style={styles.resetBtn} onPress={resetHandler}>
              <Text style={styles.startStopText}>Reset</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <SelectorModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSelect={selectedHandler}
        items={ITEM_SELECTION}
      />
    </View>
  )
};

export default Main

const styles = EStyleSheet.create({
  selectorBtn: {
    paddingVertical: '10rem',
    width: '180rem',
    borderRadius: '50rem',
    marginVertical: '1rem',
    borderWidth: '2rem',
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slectorTxt: {
    fontSize: '18rem',
    fontWeight: 'bold',
    color: '#fff',
  },
  pickerLabel: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  dropdownPickerStl: {
    backgroundColor: 'transparent',
  },
  dropdownContainer: {
    alignItems: 'center',
  },
  startStopText: {
    fontSize: '20rem',
    fontWeight: 'bold',
    color: '#fff',
  },
  startStopBtn: {
    backgroundColor: '#f64082',
    paddingVertical: '20rem',
    paddingHorizontal: '80rem',
    borderRadius: '50rem',
  },
  resetBtn: {
    backgroundColor: 'transparent',
    paddingVertical: '18rem',
    paddingHorizontal: '75rem',
    borderRadius: '50rem',
    borderWidth: '2rem',
    borderColor: '#fff',
    marginTop: '10rem',
  },
  btnView: {
    marginVertical: '20rem',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdownView: {
    width: '100%',
    marginBottom: '20rem',
    zIndex: 1,
    alignItems: 'center',
  },
  pickerItem: {
    fontSize: '20rem',
    fontWeight: '600',
    backgroundColor: 'red',
    zIndex: 1000,
  },
  timerView: {
    backgroundColor: '#2b2b2b',
    padding: '30rem',
    paddingVertical: '80rem',
    borderRadius: '200rem',
  },
  timerText: {
    fontSize: '70rem',
    fontWeight: '500',
    color: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentView: {
    backgroundColor: '#2b2b2b20',
    padding: '10rem',
    borderRadius: '20rem',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
})