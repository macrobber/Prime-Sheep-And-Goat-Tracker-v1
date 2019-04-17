import React from 'react';
import { Alert } from 'react-native';
import {TouchableOpacity, TouchableHighlight, FlatList, StyleSheet, Text, View, TextInput, Image, Button} from 'react-native';
import {f, auth, database } from '../../config/config.js';

class editspecificram extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ewedata: [], // init array
            refresh: false, 
            loading: true,
            ramId: this.props.navigation.getParam('ramId', 'NO-ID'),
            ramName: this.props.navigation.getParam('ramName', 'NO-Name'),        
            ramKey: this.props.navigation.getParam('ramKey', 'NO-Name'),
        }
        this.state.ramId = this.state.ramId.toString();
        console.log('Inside const', this.state.ramKey);
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

        database.ref('rams/'+userID).once('value').then(function(snapshot) {
           const exist = (snapshot.val() != null );
           if(exist) data = snapshot.val();
           var ewedata = that.state.ewedata;

           var counter = 0;
           for(var ewe in data){
               var eweObj = data[ewe];
               var parentKey = Object.keys(data)[counter];
               counter++;


                ewedata.push({
                    ramId: eweObj.ramId,
                    ramName: eweObj.ramName,
                    ramKey: parentKey
                });
                that.setState({
                    refresh: false,
                    loading: false
                });               
           }
        }).catch(error => console.log(error));
    }

    saveEwe = () => {
        var tmpEweId = this.state.ramId;
        var tmpEweName = this.state.ramName;
        var tmpEweKey = this.state.ramKey;
        var TheUniqueKeyOfPush = f.database().ref().push().getKey();
        let userID = f.auth().currentUser.uid; // grab the current users userId


        if(tmpEweId != null){
            database.ref('rams/'+userID).child(tmpEweKey).child('ramId').set(tmpEweId);
        }
        if(tmpEweName != null){
            database.ref('rams/'+userID).child(tmpEweKey).child('ramName').set(tmpEweName);
        }

        this.setState({editingProfile: false})
        this.setState({refresh: !this.state.refresh})

        Alert.alert(
            'Ram Edited!',
            'Successfully Edited Record',
            [
              {text: 'Return to Home Page', onPress: () => this.props.navigation.navigate('Home')},              
              {text: 'Edit Screen', onPress: () => this.props.navigation.navigate('EditHome')},
            ],
            { cancelable: false }
          )

    }
    static navigationOptions = {
        title: 'Edit This Ram',
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
        var ramId = this.props.navigation.getParam('ramId', 'NO-ID');
        var ramName = this.props.navigation.getParam('ramName', 'NO-Name');
        var ramKey = this.props.navigation.getParam('ramKey', 'NO-Name');
        
        ramId.toString();
        ramName.toString();
        var eweIdTemp = ramId;
        this.setState.ramId = ramId;
        this.setState.ramName = ramName;
        this.setState.ramKey = ramKey;

        return(
            <View style={{flex: 1, backgroundColor: '#ffdf80' }}>

                {this.state.loading == true ? (
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text>Loading...</Text> 
                    </View>
                ) : (
                <View style={{alignItems: 'center', justifyContent: 'center', paddingBottom: 20, paddingTop: 20, backgroundColor: '#ffdf80'}}>
                    <Text>Ram ID: {ramId}</Text>
                    <Text>Ram Name: {ramName}</Text>
                    <TextInput
                                editable={true}
                                placeholder={'Ram Id'}
                                onChangeText={(text) => this.setState({ramId: text})}
                                value={this.state.ramId}
                                style={{backgroundColor: 'white',width: 250, marginVertical:10, padding:5, borderColor: 'grey', borderWidth: 1}}
                           />
                    <TextInput
                                editable={true}
                                placeholder={'Ram Id'}
                                onChangeText={(text) => this.setState({ramName: text})}
                                value={this.state.ramName}
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

export default editspecificram;