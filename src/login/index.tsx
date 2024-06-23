import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import styles from './styles';
import { StackNavigationProp } from '@react-navigation/stack';

const imgBg = require('../assets/background.jpeg');

type LoginProps = {
  navigation: StackNavigationProp<any>;
}

const Login = ({navigation}: LoginProps) => {
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
            onPress={() => navigation.navigate('home')}
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
