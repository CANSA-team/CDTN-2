
import React from 'react';
import { StyleSheet, View } from 'react-native';
import SwitchNavigation from './src/components/SwitchNavigation';
import EditProfile from './src/screens/EditProfile';
import Search from './src/screens/Search';


export default function App() {
  return (
      <EditProfile />  
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
