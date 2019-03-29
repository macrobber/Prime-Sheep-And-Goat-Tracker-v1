import React from 'react';
import { Alert } from 'react-native';
import {TouchableOpacity, TouchableHighlight, Flatlist, StyleSheet, Text, View, TextInput, Image, Button} from 'react-native';
import {f, auth, database } from '../../config/config.js';


class editewe extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            loggedin: false,
            eweid: "",
            data: [],
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
        title: 'Edit Ewe',
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

      viewMom = () => {
        var eweId = this.state.eweid;
        var userID = this.state.userId;
        var eweName = this.state.ewename;
        
        var tempEweName;
        var tempEweID;
        //database.ref('ewes').child(this.state.userId).push({eweId, eweName});
  //      database.ref('ewes').child(userID).push({eweId, eweName});
  
  // works // database.ref('ewes').child(userID).once('value', function (snapshot) {
    var ref = f.database().ref('ewes/' + userID);
    var query = ref.orderByChild(userID);
    query.once("value", function(snapshot) {
      snapshot.forEach(function(child) {
        tempEweName = child.val().eweName;  // grabs the ewe name from the user
        tempEweID = child.val().eweId; // grabs the ewe ID from the user
        console.log('tempEweID', tempEweID);
        console.log('tempName', tempEweName);
        
      });
    

//      console.log(snapshot.val(''))
  })
        
//        this.props.navigation.navigate('EditHome')
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
 
                            <TouchableOpacity style={{backgroundColor: '#5e3558', padding: 10, marginTop: 10}}
                             onPress={ () => this.viewMom()}>
                                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>View Ewes</Text>
                            </TouchableOpacity>                            
                            <TouchableOpacity style={{backgroundColor: '#b8352a', padding: 10, marginTop: 20}}
                             onPress={ () => this.props.navigation.navigate('EditHome')}>
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

export default editewe;