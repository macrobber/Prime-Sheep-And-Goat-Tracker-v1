import React from 'react';
import { Alert } from 'react-native';
import {TouchableOpacity, CheckBox, ScrollView, TouchableHighlight, FlatList, StyleSheet, Text, View, TextInput, Image, Button} from 'react-native';
import {f, auth, database } from '../../config/config.js';
import DatePicker from 'react-native-datepicker';

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
                    ramKey: parentKey,
                    breed: eweObj.breed,
                    dob: eweObj.dob,
                    bof: eweObj.bof,   
                });
                that.setState({
                    refresh: false,
                    loading: false
                });               
           }
        }).catch(error => console.log(error));
    }

    saveEwe = () => {
        var tmpRamId = this.state.ramId;
        var tmpRamName = this.state.ramName;
        var tmpRamKey = this.state.ramKey;
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

        var TheUniqueKeyOfPush = f.database().ref().push().getKey();
        let userID = f.auth().currentUser.uid; // grab the current users userId


        if(tmpRamId != null){
            database.ref('rams/'+userID).child(tmpRamKey).child('ramId').set(tmpRamId);
        }
        if(tmpRamName != null){
            database.ref('rams/'+userID).child(tmpRamKey).child('ramName').set(tmpRamName);
        }
        
        if(tmpBreed != null){
            database.ref('rams/'+userID).child(tmpRamKey).child('breed').set(tmpBreed);
        }
        if(tmpDob != null){
            database.ref('rams/'+userID).child(tmpRamKey).child('dob').set(tmpDob);
        }
        if(tmpBof != null){
            database.ref('rams/'+userID).child(tmpRamKey).child('bof').set(tmpBof);
        }
        if(tmpPfid != null){
            database.ref('rams/'+userID).child(tmpRamKey).child('pfid').set(tmpPfid);
        }
        if(tmpPdate != null){
            database.ref('rams/'+userID).child(tmpRamKey).child('pdate').set(tmpPdate);
        }
        if(tmpSellername != null){
            database.ref('rams/'+userID).child(tmpRamKey).child('sellername').set(tmpSellername);
        }
        if(tmpPprice != null){
            database.ref('rams/'+userID).child(tmpRamKey).child('pprice').set(tmpPprice);
        }
        if(tmpDdate != null){
            database.ref('rams/'+userID).child(tmpRamKey).child('ddate').set(tmpDdate);
        }
        if(tmpSdate != null){
            database.ref('rams/'+userID).child(tmpRamKey).child('sdate').set(tmpSdate);
        }
        if(tmpSprice != null){
            database.ref('rams/'+userID).child(tmpRamKey).child('sprice').set(tmpSprice);
        }
        if(tmpNotes != null){
            database.ref('rams/'+userID).child(tmpRamKey).child('notes').set(tmpNotes);
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
        var breed = this.props.navigation.getParam('breed', 'NO-Name');
        var dob = this.props.navigation.getParam('dob', 'NO-Name');
        
        var ramIdTemp = ramId;
//        this.setState.eweId = eweId;
//        this.setState.eweName = eweName;
//        this.setState.eweKey = eweKey;
        this.setState.breed = breed;
        this.setState.dob = dob;
        

        
        ramId.toString();
        ramName.toString();
        var ramIdTemp = ramId;
        this.setState.ramId = ramId;
        this.setState.ramName = ramName;
        this.setState.ramKey = ramKey;

        return(
            <ScrollView style={{flex: 1, backgroundColor: '#ffdf80' }}>

                {this.state.loading == true ? (
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text>Loading...</Text> 
                    </View>
                ) : (
                <View style={{alignItems: 'center', justifyContent: 'center', paddingBottom: 20, paddingTop: 20, backgroundColor: '#ffdf80'}}>
                    <Text>Ram ID: {ramId}</Text>
                    <Text>Ram Name: {ramName}</Text>
                    <Text style={{textAlign: 'left'}}>ID/Scrappie</Text>
                    <TextInput
                                editable={true}
                                placeholder={'Ewe Id'}
                                onChangeText={(text) => this.setState({ramId: text})}
                                value={this.state.ramId}
                                style={{backgroundColor: 'white',width: 250, marginVertical:10, padding:5, borderColor: 'grey', borderWidth: 1}}
                           />
                    <Text>Farm Name</Text>
                    <TextInput
                                editable={true}
                                placeholder={'Ewe Id'}
                                onChangeText={(text) => this.setState({ramName: text})}
                                value={this.state.ramName}
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

export default editspecificram;