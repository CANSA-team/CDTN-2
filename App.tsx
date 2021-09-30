
import React from 'react';
import { StyleSheet, View } from 'react-native';
import SwitchNavigation from './src/components/SwitchNavigation';
import Search from './src/screens/Search';


export default function App() {
  return (
      <Search />  
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
