import React from 'react';
import { Image, TouchableHighlight, Button, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from "react-native-vector-icons/Ionicons";
import { createStackNavigator, createBottomTabNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';
import login from './app/screens/login.js';
import entry from './app/screens/entry.js';
import editewe from './app/screens/editewe.js';
import editram from './app/screens/editram.js';
import edit from './app/screens/edit.js';
import medical from './app/screens/medical.js';
import medicalewe from './app/screens/medicalewe.js';
import medicalspecificewe from './app/screens/medicalspecificewe.js';
import medicalram from './app/screens/medicalram.js';
import profile from './app/screens/profile.js';
import newewe from './app/screens/newewe.js';
import newram from './app/screens/newram.js';
import signup from './app/screens/signup';
import editspecificewe from './app/screens/editspecificewe.js';
import editspecificram from './app/screens/editspecificram.js';
//import loading from './app/screens/loading.js';
import {f, auth, database } from './config/config.js';
import DatePicker from 'react-native-datepicker';


class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
    headerStyle: {
      backgroundColor: '#355e3b',
      height: 42, 
      paddingTop: 30, 
    },
    headerTintColor: '#fff',
    headerTitleStyle: {      
      flex: 1,
      fontSize: 14,
      textAlign: 'center',
    },
  };

  state = { currentUser: null }
  constructor(props)
  {
    super(props);
    this.state = {
      loggedin: false,
      date:"15-05-2018"
  }

}
componentDidMount() {
  var that = this;
  f.auth().onAuthStateChanged(user => {
    if(user){
      //logged in
      that.setState({
          loggedin: true
      })
  }else{
      //not logged in
      that.setState({
          loggedin: false
      })

  }
    this.props.navigation.navigate(user ? 'Home' : 'Login')
  })

  }
  
  render() {
    const { currentUser } = this.state
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffdf80' }}>
        <Image
            style={{width: 155, height: 155}}
             source={{uri: 'https://www.primenumberfarms.com/wp-content/uploads/2017/10/PNFlogoSimple2.jpg'}}
        />

{this.state.loggedin == true ? (
// logged in
<TouchableHighlight 
                style ={{
                    height: 40,
                    width:160,
                    borderRadius:10,                    
                    marginLeft :50,
                    marginRight:50,
                    marginTop :20
                }}>
        <Button
          title="Log Out"
          color='#233067'
          onPress={() => auth.signOut()}
        />
</TouchableHighlight>
) : (
// Not logged in
<View>
<TouchableHighlight 
style ={{
    height: 40,
    width:160,
    borderRadius:10,                    
    marginLeft :50,
    marginRight:50,
    marginTop :20
}}>
<Button
title="Log In"
color='#233067'
onPress={() => this.props.navigation.navigate('Login')}
/>
</TouchableHighlight>
<TouchableHighlight 
style ={{
    height: 40,
    width:160,
    borderRadius:10,                    
    marginLeft :50,
    marginRight:50,
    marginTop :20
}}>
<Button
title="Sign Up"
color='#233067'
onPress={() => this.props.navigation.navigate('Signup')}
/>
</TouchableHighlight>
</View>
)}
<TouchableHighlight 
                style ={{
                    height: 40,
                    width:160,
                    borderRadius:10,                    
                    marginLeft :50,
                    marginRight:50,
                    marginTop :20
                }}>
        <Button
          title="About This App"
          color='#233067'
          onPress={() => this.props.navigation.navigate('Details')}
        />
</TouchableHighlight>

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
  static navigationOptions = {
    title: 'About',
    headerStyle: {
      backgroundColor: '#355e3b',
      height: 42, 
      paddingTop: 30, 
    },
    headerTintColor: '#fff',
    headerTitleStyle: {      
      flex: 1,
      fontSize: 14,
      textAlign: 'left',
    },
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffdf80' }}>
        <Text>Details!</Text>
        <Text>Add details about the app, Free Vs. Pro, redirect to more infor on website, etc.</Text>
      </View>
    );
  }
}

const HomeStack = createStackNavigator({
  Home: { screen: HomeScreen },
  Details: { screen: DetailsScreen },
  Login: {screen: login },
  Signup: {screen: signup },  
  //NewEwe: { screen: newewe },
  //Loading: {screen: loading },
},
);

const SettingsStack = createStackNavigator({
  Settings: { screen: SettingsScreen },
  Details: { screen: DetailsScreen },  
});

const EditEweStack = createStackNavigator({
  EditHome: { screen: edit },
  EditEwe: { screen: editewe },
  EditRam: { screen: editram },
  EditSpecificEwe: {screen: editspecificewe},
  EditSpecificRam: {screen: editspecificram},
});

const MedicalStack = createStackNavigator({
  MedicalHome: { screen: medical },
  MedicalEwe: { screen: medicalewe },
  MedicalRam: { screen: medicalram },
  MedicalSpecificEwe: {screen: medicalspecificewe},  
});

const EntryStack = createStackNavigator({
  EntryHome: { screen: entry },
  NewEwe: { screen: newewe },
  NewRam: { screen: newram },
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
    
    Entry: {screen: EntryStack,
      navigationOptions:{  
        tabBarLabel:'Entry',  
        header: null,
        tabBarIcon:({tintColor})=>(  
            <Icon name="ios-add-circle-outline" color={tintColor} size={25}/>  
        )  
      }  
    
    },
    Edit: {screen: EditEweStack,
      navigationOptions:{  
        tabBarLabel:'Edit',  
        tabBarIcon:({tintColor})=>(  
            <Icon name="ios-brush" color={tintColor} size={25}/>  
        )  
      }  
    
    },
    Medical: {screen: MedicalStack,
      navigationOptions:{  
        tabBarLabel:'Upkeep',  
        tabBarIcon:({tintColor})=>(  
            <Icon name="md-medical" color={tintColor} size={25}/>  
        )  
      }  
},
    Settings: { screen: profile,
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
console.disableYellowBox = true;