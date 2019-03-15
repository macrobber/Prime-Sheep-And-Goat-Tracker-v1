import React from 'react';
import {Flatlist, StyleSheet, Text, View, Image} from 'react-native';

class login extends React.Component{
    constructor(props) {
        super(props);
    }

    render()
    {
        return(
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffdf80' }}>
                <Text>Home Page</Text>
            </View>
        )
    }
}

export default login;