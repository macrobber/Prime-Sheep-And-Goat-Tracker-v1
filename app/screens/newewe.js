import React from 'react';
import { Alert } from 'react-native';
import {TouchableOpacity, TouchableHighlight, Flatlist, StyleSheet, Text, View, TextInput, Image, Button} from 'react-native';
import {f, auth, database } from '../../config/config.js';

class newewe extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            loggedin: false,
            eweid: ""
        }
    }
    componentDidMount = () => {
        var that = this;
        f.auth().onAuthStateChanged(function(user){
            if(user){
                //logged in
                that.setState({
                    loggedin: true
                })
                that.fetchUserInfo(user.uid);
            }else{
                //not logged in
                that.setState({
                    loggedin: false
                })
            }
        })
    }
    static navigationOptions = {
        title: 'Add New Ewe',
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
      fetchUserInfo = (userId) => {
        var that = this;
        database.ref('users').child(userId).once('value').then(function(snapshot){
            const exists = (snapshot.val() != null);
            if(exists) data = snapshot.val();
            that.setState({
                email: data.email,
                fname: data.fname,
                lname: data.lname,
                city: data.city,
                state: data.state,
                avatar: data.avatar,
                loggedin: true,
                userId: userId
            })
        });
    }

      saveMom = () => {
        var eweId = this.state.eweid;
        var userID = this.state.userId;
        var eweName = this.state.ewename;
        var breed = this.state.breed;
        var dob = this.state.dob;
        
        //database.ref('ewes').child(this.state.userId).push({eweId, eweName});
        database.ref('ewes').child(userID).push({eweId, eweName, breed, dob});
        
        Alert.alert(
            'New Ewe Added!',
            'Click Add New Ewe to add another one',
            [
              {text: 'Return to Home Page', onPress: () => this.props.navigation.navigate('Home')},              
              {text: 'Add New Ewe', onPress: () => this.props.navigation.navigate('NewEwe')},
            ],
            { cancelable: false }
          )
        this.props.navigation.navigate('EntryHome')
      }
    
    render()
    {
        return(
            <View style={{flex: 1, backgroundColor: '#ffdf80' }}>
            {this.state.loggedin == true ? (
                // logged in                
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffdf80' }}>
                <Text>Here we will input new entries...</Text>
                <Text>Ewe ID (Scrappie):</Text>
                            <TextInput
                                editable={true}
                                placeholder={'Ewe ID (Scrappie Tag)'}
                                onChangeText={(text) => this.setState({eweid: text})}
                                value={this.state.eweid}                                                
                                style={{backgroundColor: 'white', width: 250, marginVertical:10, padding:5, borderColor: 'grey', borderWidth: 1}}
                           />
                            <TextInput
                                editable={true}
                                placeholder={'Ewe Farm ID (Or Name)'}
                                onChangeText={(text) => this.setState({ewename: text})}
                                
                                style={{backgroundColor: 'white', width: 250, marginVertical:10, padding:5, borderColor: 'grey', borderWidth: 1}}
                           />
                            <TextInput
                                editable={true}
                                placeholder={'Breed'}
                                onChangeText={(text) => this.setState({breed: text})}
                                
                                style={{backgroundColor: 'white', width: 250, marginVertical:10, padding:5, borderColor: 'grey', borderWidth: 1}}
                           />
                            <TextInput
                                editable={true}
                                placeholder={'Date of Birth'}
                                onChangeText={(text) => this.setState({dob: text})}
                                
                                style={{backgroundColor: 'white', width: 250, marginVertical:10, padding:5, borderColor: 'grey', borderWidth: 1}}
                           />
 
 
                            <TouchableOpacity style={{backgroundColor: '#5e3558', padding: 10, marginTop: 10}}
                             onPress={ () => this.saveMom()}>
                                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>Save Changes</Text>
                            </TouchableOpacity>                            
                            <TouchableOpacity style={{backgroundColor: '#b8352a', padding: 10, marginTop: 20}}
                             onPress={ () => this.props.navigation.navigate('EntryHome')}>
                                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>Cancel Changes</Text>
                            </TouchableOpacity>                            


                </View>

            ) : (
                // not logged in
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffdf80' }}>
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
                </View>
            )}
            </View>
        )
    }
}

export default newewe;