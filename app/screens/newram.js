import React from 'react';
import { Alert } from 'react-native';
import {TouchableOpacity, TouchableHighlight, Flatlist, StyleSheet, Text, View, TextInput, Image, Button} from 'react-native';
import {f, auth, database } from '../../config/config.js';

class newram extends React.Component{
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
        title: 'Add New Ram',
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

      saveAnimal = () => {
        var ramId = this.state.ramid;
        var userID = this.state.userId;
        var ramName = this.state.ramname;
        
        //database.ref('ewes').child(this.state.userId).push({eweId, eweName});
        database.ref('rams').child(userID).push({ramId, ramName});
        
        Alert.alert(
            'New Ram Added!',
            'Click Add New Ram to add another one',
            [
              {text: 'Return to Home Page', onPress: () => this.props.navigation.navigate('Home')},              
              {text: 'Add New Ram', onPress: () => this.props.navigation.navigate('NewRam')},
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
                <Text>Ram ID (Scrappie):</Text>
                            <TextInput
                                editable={true}
                                placeholder={'Ram ID (Scrappie Tag)'}
                                onChangeText={(text) => this.setState({ramid: text})}
                                value={this.state.ramid}                                                
                                style={{backgroundColor: 'white', width: 250, marginVertical:10, padding:5, borderColor: 'grey', borderWidth: 1}}
                           />
                            <TextInput
                                editable={true}
                                placeholder={'Ram Farm ID (Or Name)'}
                                onChangeText={(text) => this.setState({ramname: text})}
                                
                                style={{backgroundColor: 'white', width: 250, marginVertical:10, padding:5, borderColor: 'grey', borderWidth: 1}}
                           />
 
                            <TouchableOpacity style={{backgroundColor: '#5e3558', padding: 10, marginTop: 10}}
                             onPress={ () => this.saveAnimal()}>
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

export default newram;