import React from 'react';
import { Alert } from 'react-native';
import {TouchableOpacity, TouchableHighlight, CheckBox, Flatlist, StyleSheet, Text, ScrollView, View, TextInput, Image, Button} from 'react-native';
import {f, auth, database } from '../../config/config.js';
import DatePicker from 'react-native-datepicker';


class newewe extends React.Component{
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
        title: 'Add New Ewe',
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

      saveMom = () => {
        var eweId = this.state.eweid;
        var userID = this.state.userId;
        var eweName = this.state.ewename;
        var breed = this.state.breed;
        var dob = this.state.dob;
        var bof = this.state.bof;
        var pfid = this.state.pfid;
        var pdate = this.state.pdate;
        var sellername = this.state.sellername;
        var pprice = parseFloat(this.state.pprice);
        var ddate = this.state.ddate;
        var sdate = this.state.sdate;
        var sprice = parseFloat(this.state.sprice);
        var notes = this.state.notes;
        //database.ref('ewes').child(this.state.userId).push({eweId, eweName});

        const ref = database.ref('ewes').child(userID).push();
        const key = ref.key;

        if(eweId != null){

            //database.ref('ewes').child(userID).push({eweId, eweName, breed, dob, bof, pfid, pdate, sellername, pprice, ddate, sdate, sprice, notes});
            //database.ref('ewes/'+userID).child(userID).child('eweId').set(eweId);
            ref.child('eweId').set(eweId);
            console.log('inside new - ref key is ', key);
        }
        if(eweName != null){
            ref.child('eweName').set(eweName);
        }
        if(breed != null){
             ref.child('breed').set(breed);
        }

        if(dob != null){
            //database.ref('ewes/'+userID).child(userID).push('dob');
            ref.child('dob').set(dob);
        }
        if(bof != null){
            ref.child('bof').set(bof);        }
        if(pfid != null){
            ref.child('pfid').set(pfid);        }
        if(pdate != null){
            ref.child('pdate').set(pdate);        }
        if(sellername != null){
            ref.child('sellername').set(sellername);        }
        if(pprice != null){
            ref.child('pprice').set(pprice);        }
        if(ddate != null){
            ref.child('ddate').set(ddate);        }
        if(sdate != null){
            ref.child('sdate').set(sdate);        }
        if(sprice != null){
            ref.child('sprice').set(sprice);        }
        if(notes != null){
            ref.child('notes').set(notes);        }    
        

  // DB connection below works      
  //      database.ref('ewes').child(userID).push({eweId, eweName, breed, dob, bof, pfid, pdate, sellername, pprice, ddate, sdate, sprice, notes});
        
        Alert.alert(
            'New Ewe Added!',
            'Click Add New Ewe to add another one',
            [
              {text: 'Return to Home Page', onPress: () => this.props.navigation.navigate('Home')},              
              {text: 'Add New Ewe', onPress: () => this.props.navigation.navigate('NewEwe')},
            ],
            { cancelable: false }
          )
        this.props.navigation.navigate('EntryHome')
      }
    
    render()
    {
        return(
            <ScrollView style={{flex: 1,  backgroundColor: '#ffdf80' }}>
            {this.state.loggedin == true ? (
                // logged in                
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffdf80' }}>
                <Text style={{marginTop: 30}}>Enter as much information as you can about your Ewe</Text>
                <Text style={{ borderBottomColor: 'black', borderBottomWidth: 1,}}>Ewe ID is required, all other fields optional.</Text>                
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
                            <TextInput
                                editable={true}
                                placeholder={'Breed'}
                                onChangeText={(text) => this.setState({breed: text})}
                                
                                style={{backgroundColor: 'white', width: 250, marginVertical:10, padding:5, borderColor: 'grey', borderWidth: 1}}
                           />
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
                                
                                style={{backgroundColor: 'white', width: 250, marginVertical:10, padding:5, borderColor: 'grey', borderWidth: 1}}
                           />
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

                            <TextInput
                                editable={true}
                                placeholder={'Seller Name'}
                                onChangeText={(text) => this.setState({sellername: text})}
                                
                                style={{backgroundColor: 'white', width: 250, marginVertical:10, padding:5, borderColor: 'grey', borderWidth: 1}}
                           />
                            <TextInput
                                editable={true}
                                placeholder={'Purchase Price'}
                                onChangeText={(text) => this.setState({pprice: text})}
                                keyboardType={"number-pad"}
                                
                                style={{backgroundColor: 'white', width: 250, marginVertical:10, padding:5, borderColor: 'grey', borderWidth: 1}}
                           />
                        <DatePicker
                                style={{backgroundColor: 'white', width: 250, marginVertical:10, padding:5, borderColor: 'grey', borderWidth: 1}}
                                date={this.state.ddate} //initial date from state
                                mode="date" //The enum of date, datetime and time
                                placeholder="Died Date"
                                format="DD-MM-YYYY"
                                minDate="01-01-2012"
                                maxDate="01-01-2022"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
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
                        <DatePicker
                                style={{backgroundColor: 'white', width: 250, marginVertical:10, padding:5, borderColor: 'grey', borderWidth: 1}}
                                date={this.state.sdate} //initial date from state
                                mode="date" //The enum of date, datetime and time
                                placeholder="Sold Date"
                                format="DD-MM-YYYY"
                                minDate="01-01-2012"
                                maxDate="01-01-2022"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
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
                            <TextInput
                                editable={true}
                                placeholder={'Sold Price'}
                                onChangeText={(text) => this.setState({sprice: text})}
                                keyboardType={"number-pad"}
                                
                                style={{backgroundColor: 'white', width: 250, marginVertical:10, padding:5, borderColor: 'grey', borderWidth: 1}}
                           />
                            <TextInput
                                editable={true}
                                placeholder={'Notes'}
                                multiline = {true}
                                numberOfLines = {4}
                                onChangeText={(text) => this.setState({notes: text})}
                                
                                style={{backgroundColor: 'white', width: 250, marginVertical:10, padding:5, borderColor: 'grey', borderWidth: 1}}
                           />

                        <View style={{ flexDirection: 'row', paddingBottom: 100 }}>
                        <View style={{padding: 10}}>
                        <TouchableOpacity style={{backgroundColor: '#5e3558', padding: 10, marginTop: 10}}
                                                    onPress={ () => this.saveMom()}>
                                                        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>Save Changes</Text>
                                                    </TouchableOpacity>                            
                        </View>
                        <View style={{padding: 10}}>
                        <TouchableOpacity style={{backgroundColor: '#b8352a', padding: 10, marginTop: 10}}
                                                    onPress={ () => this.props.navigation.navigate('EntryHome')}>
                                                        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>Cancel Changes</Text>
                                                    </TouchableOpacity>                            
                        </View>
                        </View>
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
            </ScrollView>
        )
    }
}

export default newewe;