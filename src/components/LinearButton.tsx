import { Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { EStyleSheet } from '../config/EStyleSheet';

type LinearButtonProps = {
  title: string;
  onPress: () => void;
  buttonStyle?: any;
  textStyle?: any;
  linearColors?: string[];
}

const LinearButton = ({title, onPress, buttonStyle, textStyle, linearColors}: LinearButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={linearColors || []}
        style={[styles.linearButton, buttonStyle]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  )
}

export default LinearButton

const styles = EStyleSheet.create({

})