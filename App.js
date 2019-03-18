import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createBottomTabNavigator } from 'react-navigation';
import { SafeAreaView } from 'react-navigation';

import login from './app/screens/login.js';
import entry from './app/screens/entry.js';
import edit from './app/screens/edit.js';
import medical from './app/screens/medical.js';
import profile from './app/screens/profile.js';


const MainStack = createBottomTabNavigator (
  {
    Home: { screen: login},
    Entry: {screen: entry},
    Edit: {screen: edit},
    Medical: {screen: medical},
    Profile: {screen: profile},
  },
  {
    tabBarOptions: {
      activeTintColor: 'yellow',
      inactiveTintColor: 'white',
      labelStyle: {
        fontSize: 16,
        paddingBottom: 15
        
      },
      tabStyle: {
        width: 100,
      },
      style: {
        backgroundColor: '#355e3b',
        inactiveTintColor: 'yellow',
        color: 'white'
      },
    }
  }
  
)

export default class App extends React.Component {
  render() {
    return (
      <MainStack/>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
