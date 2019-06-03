import React from 'react';
import {TouchableOpacity, TouchableHighlight, Flatlist, StyleSheet, Text, View, Image, Button} from 'react-native';
import {f, auth, database } from '../../config/config.js';

class medical extends React.Component{
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
    static navigationOptions = {
        title: 'Add Upkeep Entry',
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
            <View style={{flex: 1, backgroundColor: '#ffdf80' }}>

            {this.state.loggedin == true ? (
                // logged in                
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffdf80' }}>
                    <Text>Add Upkeep / Medical Information for Ewes and Rams</Text>
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
                        title="Ewe Upkeep"
                        color='#233067'
                        onPress={() => this.props.navigation.navigate('MedicalEwe')}                    
                        />
                    </TouchableHighlight>
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
                        title="Ram Upkeep"
                        color='#233067'
                        onPress={() => this.props.navigation.navigate('MedicalRam')}                    
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

export default medical;