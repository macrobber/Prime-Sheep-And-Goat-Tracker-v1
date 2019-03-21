import React from 'react';
import {TouchableHighlight, Flatlist, StyleSheet, Text, View, Image, TextInput, Button} from 'react-native';
import {f, auth, database } from '../../config/config.js';

class login extends React.Component{
    constructor(props) {
        super(props);
    }
    state = { email: '', password: '', errorMessage: null }
    handleSignUp = () => {
      // TODO: Firebase stuff...
      const { email, password } = this.state
      f.auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => this.props.navigation.navigate('Home'))
        .catch(error => this.setState({ errorMessage: error.message }))      
      console.log('handle Sign In')
    }
    static navigationOptions = {
      title: 'Log In',
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
    render()
    {
        return(
            <View style={{flex: 1, backgroundColor: '#ffdf80' }}>
            <View style={styles.container}>
        <Text>Sign In</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          inputStyle={{marginLeft: 10}}
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
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
        onPress={this.handleSignUp} />
</TouchableHighlight>
<TouchableHighlight 
                style ={{
                    height: 40,
                    width:260,
                    borderRadius:10,                    
                    marginLeft :50,
                    marginRight:50,
                    marginTop :20
                }}>
        <Button 
        title="Not Registered?  Sign Up!" 
        color='#233067'
        onPress={() => this.props.navigation.navigate('Signup')}
        />
</TouchableHighlight>

      </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    textInput: {
      height: 40,
      width: '90%',
      borderColor: 'gray',
      backgroundColor: 'white',
      borderWidth: 1,
      paddingLeft: 6,
      marginTop: 8
    }
  })
export default login;