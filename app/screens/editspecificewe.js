import React from 'react';
import { Alert } from 'react-native';
import {TouchableOpacity, TouchableHighlight, FlatList, StyleSheet, Text, View, TextInput, Image, Button} from 'react-native';
import {f, auth, database } from '../../config/config.js';

class editspecificewe extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ewedata: [], // init array
            refresh: false, 
            loading: true,
            eweId: this.props.navigation.getParam('eweId', 'NO-ID'),
            eweName: this.props.navigation.getParam('eweName', 'NO-Name'),        
            eweKey: this.props.navigation.getParam('eweKey', 'NO-Name'),
            breed: this.props.navigation.getParam('breed', 'NO-Name'),
        }
        this.state.eweId = this.state.eweId.toString();
        console.log('Inside const', this.state.eweKey);
    }
// On load default runs
    componentDidMount=() => {
        // Load feed
        this.loadFeed(); // on page load, call load feed...
        
    }
// called from componentDidMount and loadNew
    loadFeed = () => {
        this.setState({
            refresh: true,
            ewedata: []
        });

        var that = this; // temp as you cannot access this once you call FB
        
        let userID = f.auth().currentUser.uid; // grab the current users userId

        database.ref('ewes/'+userID).once('value').then(function(snapshot) {
           const exist = (snapshot.val() != null );
           if(exist) data = snapshot.val();
           var ewedata = that.state.ewedata;

           var counter = 0;
           for(var ewe in data){
               var eweObj = data[ewe];
               var parentKey = Object.keys(data)[counter];
               counter++;


                ewedata.push({
                    eweId: eweObj.eweId,
                    eweName: eweObj.eweName,
                    breed: eweObj.breed,
                    eweKey: parentKey
                });
                that.setState({
                    refresh: false,
                    loading: false
                });               
           }
        }).catch(error => console.log(error));
    }

    saveEwe = () => {
        var tmpEweId = this.state.eweId;
        var tmpEweName = this.state.eweName;
        var tmpEweKey = this.state.eweKey;
        var tmpBreed = this.state.breed;

        console.log('**inisde saveEwe - eweId ewename and breed = ', tmpEweId, tmpEweName, tmpBreed);

        var TheUniqueKeyOfPush = f.database().ref().push().getKey();
        let userID = f.auth().currentUser.uid; // grab the current users userId


        if(tmpEweId != null){
            database.ref('ewes/'+userID).child(tmpEweKey).child('eweId').set(tmpEweId);
        }
        if(tmpEweName != null){
            database.ref('ewes/'+userID).child(tmpEweKey).child('eweName').set(tmpEweName);
        }
        
        if(tmpBreed != null){
            database.ref('ewes/'+userID).child(tmpEweKey).child('breed').set(tmpBreed);
        }

        this.setState({editingProfile: false})
        this.setState({refresh: !this.state.refresh})

        Alert.alert(
            'Ewe Edited!',
            'Successfully Edited Record',
            [
              {text: 'Return to Home Page', onPress: () => this.props.navigation.navigate('Home')},              
              {text: 'Edit Screen', onPress: () => this.props.navigation.navigate('EditHome')},
            ],
            { cancelable: false }
          )

    }
    static navigationOptions = {
        title: 'Edit This Ewe',
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



    render()
    {
        var eweId = this.props.navigation.getParam('eweId', 'NO-ID');
        var eweName = this.props.navigation.getParam('eweName', 'NO-Name');
        var eweKey = this.props.navigation.getParam('eweKey', 'NO-Name');
        var breed = this.props.navigation.getParam('breed', 'NO-Name');
        
        eweId.toString();
        eweName.toString();
        //breed.toString();
        var eweIdTemp = eweId;
        this.setState.eweId = eweId;
        this.setState.eweName = eweName;
        this.setState.eweKey = eweKey;
        this.setState.breed = breed;

        return(
            <View style={{flex: 1, backgroundColor: '#ffdf80' }}>

                {this.state.loading == true ? (
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text>Loading...</Text> 
                    </View>
                ) : (
                <View style={{alignItems: 'center', justifyContent: 'center', paddingBottom: 20, paddingTop: 20, backgroundColor: '#ffdf80'}}>
                    <Text>Ewe ID: {eweId}</Text>
                    <Text>Ewe Name: {eweName}</Text>
                    <TextInput
                                editable={true}
                                placeholder={'Ewe Id'}
                                onChangeText={(text) => this.setState({eweId: text})}
                                value={this.state.eweId}
                                style={{backgroundColor: 'white',width: 250, marginVertical:10, padding:5, borderColor: 'grey', borderWidth: 1}}
                           />
                    <TextInput
                                editable={true}
                                placeholder={'Ewe Id'}
                                onChangeText={(text) => this.setState({eweName: text})}
                                value={this.state.eweName}
                                style={{backgroundColor: 'white',width: 250, marginVertical:10, padding:5, borderColor: 'grey', borderWidth: 1}}
                           />
                    <TextInput
                                editable={true}
                                placeholder={'Breed'}
                                onChangeText={(text) => this.setState({breed: text})}
                                value={this.state.breed}
                                style={{backgroundColor: 'white',width: 250, marginVertical:10, padding:5, borderColor: 'grey', borderWidth: 1}}
                           />                           

                    <TouchableOpacity style={{backgroundColor: '#5e3558', padding: 10, marginTop: 10}}
                             onPress={ () => this.saveEwe()}>
                        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>Save Changes</Text>
                    </TouchableOpacity>                            
                    <TouchableOpacity style={{backgroundColor: '#b8352a', padding: 10, marginTop: 20}}
                             onPress={ () => this.props.navigation.pop()}>
                                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>Cancel Changes</Text>
                            </TouchableOpacity>                            

                </View>
                
            )}
            </View>
        )
    }
}

export default editspecificewe;