import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import styles from './styles';

const imgBg = require('../assets/background.jpeg');

const Login = () => {
  return (
    <View style={styles.container}>
      <ImageBackground source={imgBg} style={{ width: '100%', height: '100%', position: 'absolute' }} />
      <View style={styles.contentView}>

        <View style={styles.inputView}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput style={styles.input} />
        </View>

        <View style={styles.inputView}>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput style={styles.input} secureTextEntry />
        </View>

        <TouchableOpacity
            style={styles.loginBtn}
          >
            <Text style={styles.loginTxt}>
              Login
            </Text>
          </TouchableOpacity>
      </View>
    </View>
  )
}

export default Login;
