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
                    eweKey: parentKey
                });
                that.setState({
                    refresh: false,
                    loading: false
                });               
           }
        }).catch(error => console.log(error));
    }

/*    loadNew = () => {
        this.loadFeed();
    }
*/    
    saveEwe = () => {
        var tmpEweId = this.state.eweId;
        var tmpEweName = this.state.eweName;
        var tmpEweKey = this.state.eweKey;
        var TheUniqueKeyOfPush = f.database().ref().push().getKey();
        let userID = f.auth().currentUser.uid; // grab the current users userId

        //database.ref('ewes/'+userID).once('value').then(function(snapshot)

        if(tmpEweId != null){
            database.ref('ewes/'+userID).child(tmpEweKey).child('eweId').set(tmpEweId);
            //this.stsate.refresh = true;
            this.setState.refresh = true;
            //database.ref('ewes/'+userID).child(tmpEweKey).set(tmpEweId);
            //database.ref('ewes/'+userID).child(this.state.userId).child('eweId').set(tmpEweId);
            //database.ref('ewes/'+userID).child(TheUniqueKeyOfPush).child('eweId').set(tmpEweId);
        }
        if(tmpEweName != null){
            //database.ref('ewes/'+userID).child(this.state.userId).child('eweName').set(tmpEweName);
            database.ref('ewes/'+userID).child(tmpEweKey).child('eweName').set(tmpEweName);
        }

        this.setState({editingProfile: false})

    }


    render()
    {
        var eweId = this.props.navigation.getParam('eweId', 'NO-ID');
        var eweName = this.props.navigation.getParam('eweName', 'NO-Name');
        var eweKey = this.props.navigation.getParam('eweKey', 'NO-Name');
        
        eweId.toString();
        eweName.toString();
        var eweIdTemp = eweId;
        this.setState.eweId = eweId;
        this.setState.eweName = eweName;
        this.setState.eweKey = eweKey;

        //const eweId = navigation.getParam('eweId', 'NO-ID');
        //const eweName = navigation.getParam('eweName', 'NO-Name');
        return(
            <View style={{flex: 1}}>
                <View style={{height: 70, paddingTop: 30, backgroundColor: 'lightgrey'}}>
                    <Text>Edit Specific Ewe</Text>
                </View>

                {this.state.loading == true ? (
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text>Loading...</Text> 
                    </View>
                ) : (
                <View style={{alignItems: 'center', justifyContent: 'center', paddingBottom: 20, paddingTop: 20, backgroundColor: '#CCB266'}}>
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