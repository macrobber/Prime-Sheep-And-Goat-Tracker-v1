import React from 'react';
import { Alert } from 'react-native';
import {TouchableOpacity, CheckBox, ScrollView, TouchableHighlight, FlatList, StyleSheet, Text, View, TextInput, Image, Button} from 'react-native';
import {f, auth, database } from '../../config/config.js';
import DatePicker from 'react-native-datepicker';

class medicalspecificewe extends React.Component{
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
            dob: this.props.navigation.getParam('dob', 'NO-Name'),
            bof: this.props.navigation.getParam('bof', 'NO-Name'),
            pfid: this.props.navigation.getParam('pfid', 'NO-Name'),
            pdate: this.props.navigation.getParam('pdate', 'NO-Name'),
            sellername: this.props.navigation.getParam('sellername', 'NO-Name'),
            pprice: this.props.navigation.getParam('pprice', 'NO-Name'),
            ddate: this.props.navigation.getParam('ddate', 'NO-Name'),
            sdate: this.props.navigation.getParam('sdate', 'NO-Name'),
            sprice: this.props.navigation.getParam('sprice', 'NO-Name'),
            notes: this.props.navigation.getParam('notes', 'NO-Name'),
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
                    dob: eweObj.dob,
                    bof: eweObj.bof,                    
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
        var tmpDob = this.state.dob;
        var tmpBof = this.state.bof;
        var tmpPfid = this.state.pfid;
        var tmpPdate = this.state.pdate;
        var tmpSellername = this.state.sellername;
        var tmpPprice = this.state.pprice;
        var tmpDdate = this.state.ddate;
        var tmpSdate = this.state.sdate;
        var tmpSprice = this.state.sprice;
        var tmpNotes = this.state.notes;

        console.log('**inside saveEwe - eweId ewename and breed = ', tmpEweId, tmpEweName, tmpBreed);

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
        if(tmpDob != null){
            database.ref('ewes/'+userID).child(tmpEweKey).child('dob').set(tmpDob);
        }
        if(tmpBof != null){
            database.ref('ewes/'+userID).child(tmpEweKey).child('bof').set(tmpBof);
        }
        if(tmpPfid != null){
            database.ref('ewes/'+userID).child(tmpEweKey).child('pfid').set(tmpPfid);
        }
        if(tmpPdate != null){
            database.ref('ewes/'+userID).child(tmpEweKey).child('pdate').set(tmpPdate);
        }
        if(tmpSellername != null){
            database.ref('ewes/'+userID).child(tmpEweKey).child('sellername').set(tmpSellername);
        }
        if(tmpPprice != null){
            database.ref('ewes/'+userID).child(tmpEweKey).child('pprice').set(tmpPprice);
        }
        if(tmpDdate != null){
            database.ref('ewes/'+userID).child(tmpEweKey).child('ddate').set(tmpDdate);
        }
        if(tmpSdate != null){
            database.ref('ewes/'+userID).child(tmpEweKey).child('sdate').set(tmpSdate);
        }
        if(tmpSprice != null){
            database.ref('ewes/'+userID).child(tmpEweKey).child('sprice').set(tmpSprice);
        }
        if(tmpNotes != null){
            database.ref('ewes/'+userID).child(tmpEweKey).child('notes').set(tmpNotes);
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
        title: 'Add Upkeep for  This Ewe',
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
        var dob = this.props.navigation.getParam('dob', 'NO-Name');
        
        eweId.toString();
        eweName.toString();
        //breed.toString();
        var eweIdTemp = eweId;
        this.setState.eweId = eweId;
        this.setState.eweName = eweName;
        this.setState.eweKey = eweKey;
        this.setState.breed = breed;
        this.setState.dob = dob;

        return(
            <ScrollView style={{flex: 1, backgroundColor: '#ffdf80' }}>

                {this.state.loading == true ? (
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text>Loading...</Text> 
                    </View>
                ) : (
                <View style={{alignItems: 'center', justifyContent: 'center', paddingBottom: 20, paddingTop: 20, backgroundColor: '#ffdf80'}}>
                    <Text>Ewe ID: {eweId}</Text>
                    <Text>Ewe Name: {eweName}</Text>
                    <Text style={{textAlign: 'left'}}>ID/Scrappie</Text>
                    <TextInput
                                editable={true}
                                placeholder={'Ewe Id'}
                                onChangeText={(text) => this.setState({eweId: text})}
                                value={this.state.eweId}
                                style={{backgroundColor: 'white',width: 250, marginVertical:10, padding:5, borderColor: 'grey', borderWidth: 1}}
                           />
                    <Text>Farm Name</Text>
                    <TextInput
                                editable={true}
                                placeholder={'Ewe Id'}
                                onChangeText={(text) => this.setState({eweName: text})}
                                value={this.state.eweName}
                                style={{backgroundColor: 'white',width: 250, marginVertical:10, padding:5, borderColor: 'grey', borderWidth: 1}}
                           />
                    <Text>Breed</Text>
                    <TextInput
                                editable={true}
                                placeholder={'Breed'}
                                onChangeText={(text) => this.setState({breed: text})}
                                value={this.state.breed}
                                style={{backgroundColor: 'white',width: 250, marginVertical:10, padding:5, borderColor: 'grey', borderWidth: 1}}
                           />                           
                    <Text>Date of Birth</Text>
                        <DatePicker
                                style={{backgroundColor: 'white', width: 250, marginVertical:10, padding:5, borderColor: 'grey', borderWidth: 1}}
                                date={this.state.dob} //initial date from state
                                mode="date" //The enum of date, datetime and time
                                placeholder="Date of Birth"
                                format="DD-MM-YYYY"
                                minDate="01-01-2012"
                                maxDate="01-01-2022"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                value={this.state.dob}
                                customStyles={{
                                    dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                    },
                                    dateInput: {
                                    marginLeft: 36
                                    }
                                }}
                                onDateChange={(date) => {this.setState({dob: date})}}
                            />

                    <View style={{ flexDirection: 'column'}}>  
                        <View style={{ flexDirection: 'row' }}>
                        <Text style={{marginTop: 5, marginLeft: -80}}>Check if born on farm</Text>
                            <CheckBox
                            value={this.state.bof}
                            onValueChange={() => this.setState({ bof: !this.state.bof })}      
                            />
                            
                        </View>
                        </View>
                        <TextInput
                                editable={true}
                                placeholder={'Prior Farm ID'}
                                onChangeText={(text) => this.setState({pfid: text})}
                                value={this.state.pfid}
                                style={{backgroundColor: 'white',width: 250, marginVertical:10, padding:5, borderColor: 'grey', borderWidth: 1}}
                           />                           
                    <Text>Purchase Date</Text>
                        <DatePicker
                                style={{backgroundColor: 'white', width: 250, marginVertical:10, padding:5, borderColor: 'grey', borderWidth: 1}}
                                date={this.state.pdate} //initial date from state
                                mode="date" //The enum of date, datetime and time
                                placeholder="Purchase Date"
                                format="DD-MM-YYYY"
                                minDate="01-01-2012"
                                maxDate="01-01-2022"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                value={this.state.pdate}
                                customStyles={{
                                    dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                    },
                                    dateInput: {
                                    marginLeft: 36
                                    }
                                }}
                                onDateChange={(date) => {this.setState({pdate: date})}}
                            />
                    <Text>Seller Name</Text>                            
                    <TextInput
                                editable={true}
                                placeholder={'Seller Name'}
                                onChangeText={(text) => this.setState({sellername: text})}
                                value={this.state.sellername}
                                style={{backgroundColor: 'white',width: 250, marginVertical:10, padding:5, borderColor: 'grey', borderWidth: 1}}
                           />       
                    <Text>Purchase Price</Text>                                                      
                            <TextInput
                                editable={true}
                                placeholder={'Purchase Price'}
                                onChangeText={(text) => this.setState({pprice: text})}
                                keyboardType={"number-pad"}
                                value={this.state.pprice}
                                style={{backgroundColor: 'white', width: 250, marginVertical:10, padding:5, borderColor: 'grey', borderWidth: 1}}
                           />
                    <Text>Date of Death</Text>
                        <DatePicker
                                style={{backgroundColor: 'white', width: 250, marginVertical:10, padding:5, borderColor: 'grey', borderWidth: 1}}
                                date={this.state.ddate} //initial date from state
                                mode="date" //The enum of date, datetime and time
                                placeholder="Date of Death"
                                format="DD-MM-YYYY"
                                minDate="01-01-2012"
                                maxDate="01-01-2022"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                value={this.state.ddate}
                                customStyles={{
                                    dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                    },
                                    dateInput: {
                                    marginLeft: 36
                                    }
                                }}
                                onDateChange={(date) => {this.setState({ddate: date})}}
                            />
                    <Text>Date of Sale</Text>
                        <DatePicker
                                style={{backgroundColor: 'white', width: 250, marginVertical:10, padding:5, borderColor: 'grey', borderWidth: 1}}
                                date={this.state.sdate} //initial date from state
                                mode="date" //The enum of date, datetime and time
                                placeholder="Date of Birth"
                                format="DD-MM-YYYY"
                                minDate="01-01-2012"
                                maxDate="01-01-2022"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                value={this.state.sdate}
                                customStyles={{
                                    dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                    },
                                    dateInput: {
                                    marginLeft: 36
                                    }
                                }}
                                onDateChange={(date) => {this.setState({sdate: date})}}
                            />

                    <Text>Sale Price</Text>                                                      
                            <TextInput
                                editable={true}
                                placeholder={'Sale Price'}
                                onChangeText={(text) => this.setState({sprice: text})}
                                keyboardType={"number-pad"}
                                value={this.state.sprice}
                                style={{backgroundColor: 'white', width: 250, marginVertical:10, padding:5, borderColor: 'grey', borderWidth: 1}}
                           />
                            <TextInput
                                editable={true}
                                placeholder={'Notes'}
                                multiline = {true}
                                numberOfLines = {4}
                                onChangeText={(text) => this.setState({notes: text})}
                                value={this.state.notes}
                                style={{backgroundColor: 'white', width: 250, marginVertical:10, padding:5, borderColor: 'grey', borderWidth: 1}}
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
            </ScrollView>
        )
    }
}

export default medicalspecificewe;