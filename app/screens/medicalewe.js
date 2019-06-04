// version 2 works but won't clear -  medialewe.js
import React from 'react';
import { Alert } from 'react-native';
import {TouchableOpacity, ActivityIndicator, ScrollView, TouchableHighlight, FlatList, StyleSheet, Text, View, TextInput, Image, Button} from 'react-native';
import {f, auth, database } from '../../config/config.js';
import {ListItem, SearchBar} from 'react-native-elements';

class medicalewe extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ewedata: [], // init array            
            refresh: false, 
            loading: true,
            filteredData: []
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
        database.ref('ewes/'+userID).orderByChild('eweId').once('value').then(function(snapshot)  {

//    const nodes = [];            
    var counter = 0;
    var ewedata = that.state.ewedata;
    const exist = (snapshot.val() != null );
    
    if(exist) data = snapshot.val();

    snapshot.forEach(c => { 
        i = c.val(); 
        console.log('Inside foreach - eweId - name - breed = ', i.eweId, i.eweName, i.breed);
            if(exist) data = c.val();        
//            this.arrayholder = i.eweId;
//            console.log('Inside arrayholder test  - this arrayholder = ', this.arrayholder);
            counter++;
             ewedata.push({
                 eweId: i.eweId,
                 eweName: i.eweName,
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
                 eweKey: c.key,                 
             });
             console.log('Inside push - just pushed', i.eweId);
             that.setState({
                 refresh: false,
                 loading: false
             });               
        
    })   
            //this.arrayholder = ewedata.eweId;
            var newKey = snapshot.ref.parent.key;
        }).catch(error => console.log(error));
    }

    loadNew = () => {
        this.loadFeed();
    }
    handlePress = (item, index) => {
//        console.log('inside editEwe', item, index);
        this.props.navigation.navigate('EditSpecificEwe')
      }

      static navigationOptions = {
        title: 'Add an Upkeep Record for Ewes',
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

      searchFilterFunction = text => {
        this.setState({
          value: text,
        });

        let filteredData = this.state.ewedata.filter(item => {
            return item.eweId.includes(text);
          });
        
          this.setState({filteredData: filteredData});

      };

      renderHeader = () => {
        return (
          <SearchBar
            placeholder="Search by ID..."
            lightTheme
            containerStyle={{ backgroundColor: '#ffdf80'  }} 
            round        
            icon={{ color: '#ffdf80' }}    
            onChangeText={text => this.searchFilterFunction(text)}
            autoCorrect={false}
            value={this.state.value}
          />
        );
      };      


      render() {
        return (
          <View style={{backgroundColor: '#ffdf80', height: '100%'}}>
          <ScrollView style={{backgroundColor: '#ffdf80'}}>
            {
              this.state.loading &&
    
              <ActivityIndicator
                size="large"
                color="#3498db"                
              />
    
            }
                <FlatList
                    refreshing={this.state.refresh}
                    onRefresh={this.loadNew}
                    data={this.state.filteredData && this.state.filteredData.length > 0 ? this.state.filteredData : this.state.ewedata}              
                    keyExtractor={(item, index) => index.toString()}
                    ListHeaderComponent={this.renderHeader}
                    extraData={this.props}
                    style={{flex: 1, backgroundColor: '#ffdf80'}}
                    renderItem={({item, index})=> (
                 <TouchableHighlight onPress={() => this.props.navigation.navigate('MedicalSpecificEwe', {
                    eweId: item.eweId,
                    eweName: item.eweName,
                    eweKey: item.eweKey,
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
                                <Text style={{fontWeight: 'bold'}}>ID:</Text>
                                <Text style={{textAlign: 'left'}}>{item.eweId}</Text>
                                <Text style={{fontWeight: 'bold'}}>></Text>                                
                            </View>
                        </View>
                </TouchableHighlight>                        
                    )}
                /> 
            </ScrollView>
          </View>
        );
      }
}

export default medicalewe;