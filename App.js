import React from 'react';
import { Button, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from "react-native-vector-icons/Ionicons";
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import login from './app/screens/login.js';
import entry from './app/screens/entry.js';
import edit from './app/screens/edit.js';
import medical from './app/screens/medical.js';
import profile from './app/screens/profile.js';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
        <Button
          title="Go to Settings"
          onPress={() => this.props.navigation.navigate('Settings')}
        />
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    );
  }
}

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Details!</Text>
      </View>
    );
  }
}

const HomeStack = createStackNavigator({
  Home: { screen: HomeScreen },
  Details: { screen: DetailsScreen },
});

const SettingsStack = createStackNavigator({
  Settings: { screen: SettingsScreen },
  Details: { screen: DetailsScreen },
});


export default createAppContainer(createBottomTabNavigator(
  {
    Home: { screen: HomeStack,
      navigationOptions:{  
        tabBarLabel:'Home',  
        tabBarIcon:({tintColor})=>(  
            <Icon name="ios-home" color={tintColor} size={25}/>  
        )  
      }  
     },
    
    Entry: {screen: entry,
      navigationOptions:{  
        tabBarLabel:'Entry',  
        tabBarIcon:({tintColor})=>(  
            <Icon name="ios-add-circle-outline" color={tintColor} size={25}/>  
        )  
      }  
    
    },
    Edit: {screen: edit,
      navigationOptions:{  
        tabBarLabel:'Edit',  
        tabBarIcon:({tintColor})=>(  
            <Icon name="ios-brush" color={tintColor} size={25}/>  
        )  
      }  
    
    },
    Medical: {screen: medical,
      navigationOptions:{  
        tabBarLabel:'Medical',  
        tabBarIcon:({tintColor})=>(  
            <Icon name="md-medical" color={tintColor} size={25}/>  
        )  
      }  
},
    Settings: { screen: SettingsStack,
      navigationOptions:{  
        tabBarLabel:'Settings',  
        tabBarIcon:({tintColor})=>(  
            <Icon name="ios-settings" color={tintColor} size={25}/>  
        )  
      }  
    
    },
  //  Profile: {screen: profile},    
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-home${focused ? '' : '-outline'}`;
        } else if (routeName === 'Medical') {
          iconName = `md-medical${focused ? '' : '-outline'}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'yellow',
      inactiveTintColor: 'white',
      showIcon: true,
      labelStyle: {
        fontSize: 14,
        paddingBottom: 0,
        paddingTop: 0
        
      },
      tabStyle: {
        width: 100,
      },
      style: {
        backgroundColor: '#355e3b',
        inactiveTintColor: 'yellow',
        color: 'white'
      },
    },
  }
));
