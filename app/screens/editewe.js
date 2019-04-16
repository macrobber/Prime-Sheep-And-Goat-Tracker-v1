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
        database.ref('ewes/'+userID).orderByChild('eweId').once('value').then(function(snapshot)  {

    const nodes = [];            
    var counter = 0;
    var ewedata = that.state.ewedata;
    const exist = (snapshot.val() != null );
    if(exist) data = snapshot.val();

    snapshot.forEach(c => { 
        i = c.val(); 
        console.log('Inside foreach', i.eweId, i.eweName);
            if(exist) data = c.val();        
            
            counter++;
             ewedata.push({
                 eweId: i.eweId,
                 eweName: i.eweName,
                 //eweKey: parentKey
             });
             console.log('Inside push - just pushed', i.eweId);
             that.setState({
                 refresh: false,
                 loading: false
             });               
        
    })   

//           const exist = (snapshot.val() != null );
//           if(exist) data = snapshot.val();
          // var ewedata = that.state.ewedata;
  
            // Now simply find the parent and return the name.
            var newKey = snapshot.ref.parent.key;
            //console.log('Inside push - just pushed', eweObj.eweId);


/*
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
                console.log('Inside push - just pushed', eweObj.eweId);
                that.setState({
                    refresh: false,
                    loading: false
                });               
           }
*/
        }).catch(error => console.log(error));

        //}).catch(error => console.log(error));
    }

    loadNew = () => {
        this.loadFeed();
    }
    handlePress = (item, index) => {
        console.log(item, index);
        this.props.navigation.navigate('EditSpecificEwe')
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
                 <TouchableHighlight onPress={() => this.props.navigation.navigate('EditSpecificEwe', {
                    eweId: item.eweId,
                    eweName: item.eweName,
                    eweKey: item.eweKey,
                  })}>                        
                        <View key={index} style={{width: '100%', overflow: 'hidden', marginBottom: 5, justifyContent: 'space-between', borderBottomWidth: 1, borderColor: 'grey'}}>
                            <View style={{padding: 15, width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Text>{item.eweId}</Text>
                                <Text>{item.eweName}</Text>                                
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