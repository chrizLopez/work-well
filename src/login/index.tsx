import { ImageBackground, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import styles from './styles';

const imgBg = require('../assets/background.jpeg');

const Login = () => {
  return (
    <View style={styles.container}>
      <ImageBackground source={imgBg} style={{ width: '100%', height: '100%', position: 'absolute' }} />
      <View style={styles.contentView}>
        <Text>Login Page</Text>

        <View style={styles.inputView}>
          <Text style={styles.inputLabel}>Username</Text>
          <TextInput style={styles.input} />
        </View>
      </View>
    </View>
  )
}

export default Login;
