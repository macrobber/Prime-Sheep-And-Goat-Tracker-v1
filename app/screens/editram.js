import React from 'react';
import { Alert } from 'react-native';
import {TouchableOpacity, TouchableHighlight, FlatList, StyleSheet, Text, View, TextInput, Image, Button} from 'react-native';
import {f, auth, database } from '../../config/config.js';

class editewe extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ewedata: [], // init array
            refresh: false, 
            loading: true,
        }
       
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

//        database.ref('ewes/'+userID).once('value').then(function(snapshot)  {
        database.ref('rams/'+userID).orderByChild('ramId').once('value').then(function(snapshot)  {

    const nodes = [];            
    var counter = 0;
    var ewedata = that.state.ewedata;
    const exist = (snapshot.val() != null );
    if(exist) data = snapshot.val();

    snapshot.forEach(c => { 
        i = c.val(); 
        console.log('Inside foreach - ramId - name - breed = ', i.ramId, i.ramName, i.breed);
            if(exist) data = c.val();        
            
            counter++;
             ewedata.push({
                 ramId: i.ramId,
                 ramName: i.ramName,
                 breed: i.breed,                 
                 dob: i.dob,                 
                 bof: i.bof,
                 pfid: i.pfid,
                 pdate: i.pdate,
                 sellername: i.sellername,
                 pprice: i.pprice,
                 ddate: i.ddate,
                 sdate: i.sdate,
                 sprice: i.sprice,
                 notes: i.notes,
                 ramKey: c.key,                 
             });
             console.log('Inside push - just pushed', i.eweId);
             that.setState({
                 refresh: false,
                 loading: false
             });               
        
    })   
            var newKey = snapshot.ref.parent.key;
        }).catch(error => console.log(error));
    }

    loadNew = () => {
        this.loadFeed();
    }
    handlePress = (item, index) => {
        console.log('inside editRam', item, index);
        this.props.navigation.navigate('EditSpecificRam')
      }

      static navigationOptions = {
        title: 'Edit Ram',
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
        return(
            <View style={{flex: 1, backgroundColor: '#ffdf80'}}>
                <View style={{height: 50, paddingTop: 5, color: '#ffdf80', backgroundColor: '#827242', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: '#ffdf80'}}>Press Any Row to Edit</Text>
                </View>

                {this.state.loading == true ? (
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text>Loading...</Text> 
                    </View>
                ) : (
                <FlatList
                    refreshing={this.state.refresh}
                    onRefresh={this.loadNew}
                    data={this.state.ewedata}                
                    keyExtractor={(item, index) => index.toString()}
                    extraData={this.props}
                    style={{flex: 1, backgroundColor: '#ffdf80'}}
                    renderItem={({item, index})=> (
                 <TouchableHighlight onPress={() => this.props.navigation.navigate('EditSpecificRam', {
                    ramId: item.ramId,
                    ramName: item.ramName,
                    ramKey: item.ramKey,
                    breed: item.breed,
                    dob: item.dob,
                    bof: item.bof,
                    pfid: item.pfid,
                    pdate: item.pdate,
                    sellername: item.sellername,
                    pprice: item.pprice,
                    ddate: item.ddate,
                    sdate: item.sdate,
                    notes: item.notes,
                    sprice: item.sprice,
                  })}>                        
                        <View key={index} style={{width: '100%', overflow: 'hidden', marginBottom: 5, justifyContent: 'space-between', borderBottomWidth: 1, borderColor: 'grey'}}>
                            <View style={{padding: 15, width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Text>{item.ramId}</Text>
                                <Text>{item.ramName}</Text>                                
                            </View>
                        </View>
                </TouchableHighlight>                        
                    )}
                /> 
                )}
            </View>
        )
    }
}

export default editewe;