import React from 'react';
import {TouchableHighlight, TouchableOpacity, Flatlist, StyleSheet, Text, View, Image, Button} from 'react-native';
import {f, auth, database } from '../../config/config.js';

class profile extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            loggedin: false
        }
    }

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


    componentDidMount = () => {
        var that = this;
        f.auth().onAuthStateChanged(function(user){
            if(user){
                //logged in
/*                that.setState({
                    loggedin: true
                })
*/                
                that.fetchUserInfo(user.uid);
            }else{
                //not logged in
                that.setState({
                    loggedin: false
                })
            }
        })
    }

    editProfile = () => {
        alert('edit profile')
    }
    render()
    {
        return(
            <View style={{flex: 1, backgroundColor: '#ffdf80' }}>
            <View style={{height: 70, paddingTop: 30, backgroundColor: '#355e3b', borderColor: 'lightgrey', borderBottomWidth: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{color: 'white'}}>Settings Page</Text>
            </View>            
            
            {this.state.loggedin == true ? (
                // logged in                
                <View style={{flex: 1, backgroundColor: '#355e3b' }}>
                <View style={{justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row', paddingVertical: 10,  backgroundColor: '#ffdf80' }}>
                    <Image source={{uri: this.state.avatar}} style={{marginLeft: 10, width: 100, height: 100, borderRadius: 50  }} ></Image>
                    <View style={{marginRight: 10}}>
                        <Text style={{fontWeight: '700'}}>Account Email:</Text>
                        <Text>{this.state.email} </Text>
                    </View>

                    


                    </View>    
                    <View style={{ alignItems: 'center', flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10,  backgroundColor: '#CCB266', borderBottomWidth: 1 }}> 
                        <Text style={{fontWeight: '700'}}>Email: </Text>
                        <Text>{this.state.email} </Text>
                    </View>
                    <View style={{ alignItems: 'center', flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10,  backgroundColor: '#ffdf80', borderBottomWidth: 1 }}> 
                        <Text style={{fontWeight: '700'}}>First Name: </Text>
                        <Text>{this.state.fname} </Text>
                    </View>
                    <View style={{ alignItems: 'center', flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10,  backgroundColor: '#CCB266', borderBottomWidth: 1 }}> 
                        <Text style={{fontWeight: '700'}}>Last Name: </Text>
                        <Text>{this.state.lname} </Text>
                    </View>
                    <View style={{ alignItems: 'center', flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10,  backgroundColor: '#ffdf80', borderBottomWidth: 1 }}> 
                        <Text style={{fontWeight: '700'}}>City: </Text>
                        <Text>{this.state.city}  </Text>
                    </View>
                    <View style={{ alignItems: 'center', flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10,  backgroundColor: '#CCB266', borderBottomWidth: 1 }}> 
                        <Text style={{fontWeight: '700'}}>State: </Text>
                        <Text>{this.state.state}  </Text>
                    </View>
                    <TouchableHighlight                     
                style ={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10,  backgroundColor: '#ffdf80' }}>
        <Button
          title="Edit Profile"
          color='#233067'
          onPress={() => this.editProfile()}
        />
</TouchableHighlight>

                    <TouchableHighlight 
                style ={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10,  backgroundColor: '#ffdf80', borderBottomWidth: 1 }}>
        <Button
          title="Log Out"
          color='#233067'
          onPress={() => auth.signOut()}
        />
</TouchableHighlight>
                
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

export default profile;