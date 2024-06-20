import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Main from '../Main';
import Login from '../login';

const Stack = createStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      >
        <Stack.Screen name="home" component={Main} />
        <Stack.Screen name="login" component={Login} />
    </Stack.Navigator>
  )
}

export default RootNavigator