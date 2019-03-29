import React from 'react';
import {TouchableHighlight, Flatlist, StyleSheet, Text, View, Image, TextInput, Button} from 'react-native';
import {f, auth, database } from '../../config/config.js';

class signup extends React.Component{
    constructor(props) {
        super(props);
    }
    state = { email: '', password: '', fname: '', lname: '', city: '', state: '', errorMessage: null }

    createUserObj = (userObj, email, fname, lname, city, state) => {

      console.log(userObj, email, userObj.uid);
      var uObj = {
        fname: fname,
        lname: lname,
        city: city,
        state: state,
        avatar: 'http://www.gravatar.com/avatar',
        email: email
      };
      database.ref('users').child(userObj.uid).set(uObj);      
    }

    handleSignUp = async() => {

    var email = this.state.email;
    var pass = this.state.password;
    var fname = this.state.fname;
    var lname = this.state.lname;
    var city = this.state.city;
    var state = this.state.state;

    if(email !='' && pass !=''){
      try{
        let user = await auth.createUserWithEmailAndPassword(email, pass)
        .then((userObj) => this.createUserObj(userObj.user, email, fname, lname, city, state))
        .catch((error) => alert(error));
      }catch(error){
        console.log(error);
        alert(error);
      }
    }else{
      alert('email or password is empty...');
    }
      console.log('Handle Sing Up')
    }
    static navigationOptions = {
        title: 'Sign Up',
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
        <TextInput
          placeholder="First Name (optional)"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={fname => this.setState({ fname })}
          value={this.state.fname}
        />
        <TextInput
          placeholder="Last Name (optional)"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={lname => this.setState({ lname })}
          value={this.state.lname}
        />
        <TextInput
          placeholder="City (optional)"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={city => this.setState({ city })}
          value={this.state.city}
        />
        <TextInput
          placeholder="State (optional)"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={state => this.setState({ state })}
          value={this.state.state}
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
        title="Sign Up" 
        color='#233067'
        onPress={this.handleSignUp} />
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


  export default signup;