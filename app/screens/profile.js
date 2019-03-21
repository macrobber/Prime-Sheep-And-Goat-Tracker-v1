import React from 'react';
import {TouchableHighlight, Flatlist, StyleSheet, Text, View, Image, Button} from 'react-native';
import {f, auth, database } from '../../config/config.js';

class profile extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            loggedin: false
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
            }else{
                //not logged in
                that.setState({
                    loggedin: false
                })
            }
        })
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
                <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#ffdf80' }}>
                <Text>Welcome $name: Feel free to edit your information here</Text>
                <Text>Email: </Text>
                <Text>$email </Text>
                <Text>Name: </Text>
                <Text>$name </Text>
                <Text>User Name: </Text>
                <Text>$username </Text>
                <Text>Avatar: </Text>
                <Text>$avatar </Text>

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