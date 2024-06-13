import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import SelectorModal from './components/SelectorModal';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

import styles from './styles';
import StartModal from './components/StartModal';
import { generateId } from './components/helper';
import TaskHistory from './components/TaskHistory';

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
  const bottomSheetRef = useRef<BottomSheet>(null);

  const [timer, setTimer] = useState(1500);
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [keyReset, setKeyReset] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(
    {
      id: 1,
      label: 'Pomodoro',
      duration: 1500,
    }
  );
  const [showStartModal, setShowStartModal] = useState(false);
  const [taskHistory, setTaskHistory] = useState([] as any[]);
  const [currentTask, setCurrentTask] = useState({} as any);

  const startStopTimer = (taskname = 'No Task name provided') => {
    if (!isPlaying && elapsedTime === timer) {
      const cTask = {
        id: generateId(),
        data: selected,
        taskname,
      };

      setTaskHistory((prev) => [...prev, cTask]);
      setCurrentTask(cTask);
    }
    setIsPlaying((prev) => !prev);
  }

  const completeHandler = () => {
    setIsPlaying(false);
    alert('Timer completed');
  }

  const resetHandler = () => {
    setTimer(selected.duration);
    setKeyReset((prev) => prev + 1);
    setElapsedTime(0);
    setIsPlaying(false);
  }

  const selectedHandler = (selected: any) => {
    setSelected(selected);
    setTimer(selected.duration);
    setShowModal(false);
    setKeyReset((prev) => prev + 1);
  }

  const onStartHandler = () => {
    if (isPlaying) {
      startStopTimer();
      return;
    }
    setShowStartModal(true);
  }

  const removeItemHandler = (id: number) => {
    setTaskHistory((prev) => prev.filter((item) => item.id !== id));
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
      <View style={styles.logoView}>
        <Image source={require('./assets/logo-small.png')} height={20}/>
      </View>
      <ImageBackground source={require('./assets/background.jpeg')} style={{ width: '100%', height: '100%', position: 'absolute' }} />
      <View style={styles.contentView}>
        <View style={styles.dropdownView}>
          <TouchableOpacity style={styles.selectorBtn} onPress={() => setShowModal(true)}>
            <Text style={styles.slectorTxt}>{selected.label}</Text>
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
          <TouchableOpacity style={styles.startStopBtn} onPress={onStartHandler}>
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

      <StartModal
        show={showStartModal}
        onClose={() => setShowStartModal(false)}
        onStart={startStopTimer}
      />

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={['5%', '80%']}
        backgroundStyle={styles.bottomSheet}
      >
        <BottomSheetView
          style={styles.contentContainer}
        >
          <TaskHistory data={taskHistory} removeItem={removeItemHandler} />
        </BottomSheetView>
      </BottomSheet>
    </View>
  )
};

export default Main;