import React from 'react';
import {Flatlist, StyleSheet, Text, View, Image, TextInput, Button} from 'react-native';

class login extends React.Component{
    constructor(props) {
        super(props);
    }
    state = { email: '', password: '', errorMessage: null }
    handleSignUp = () => {
      // TODO: Firebase stuff...
      console.log('handleSignUp')
    }

    render()
    {
        return(
            <View style={{flex: 1, backgroundColor: '#ffdf80' }}>
            <View style={{height: 70, paddingTop: 30, backgroundColor: '#355e3b', borderColor: 'lightgrey', borderBottomWidth: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{color: 'white'}}>Home Page</Text>
            </View>   
            <View style={styles.container}>
        <Text>Sign Up</Text>
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
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button title="Sign Up" onPress={this.handleSignUp} />
        <Button
          title="Already have an account? Login"
          onPress={() => this.props.navigation.navigate('Login')}
        />
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
      borderWidth: 1,
      marginTop: 8
    }
  })
export default login;