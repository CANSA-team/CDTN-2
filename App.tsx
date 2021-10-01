import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import SwitchNavigation from './src/components/SwitchNavigation';
//import OTPscreen from './src/screens/Auth/OTPscreen';
import ChangePassword from './src/screens/Auth/ChangePassword';
import Resgister from './src/screens/Auth/Register';
import Login from './src/screens/Auth/Login';



export default function App() {
  return (
      <Login/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
