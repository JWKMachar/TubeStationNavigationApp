import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Router, Route, Link } from './react-router';
import useDepencency from './api';
import { AntDesign } from '@expo/vector-icons';
import NavigationBar from './screens/NavigationBar'


const App = () => {
  return (
    <NavigationBar/>
  );
}

export default App;