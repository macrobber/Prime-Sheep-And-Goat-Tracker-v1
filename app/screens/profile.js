import React from 'react';
import {Flatlist, StyleSheet, Text, View, Image} from 'react-native';

class profile extends React.Component{
    constructor(props) {
        super(props);
    }

    render()
    {
        return(
            <View style={{flex: 1, backgroundColor: '#ffdf80' }}>
            <View style={{height: 70, paddingTop: 30, backgroundColor: '#355e3b', borderColor: 'lightgrey', borderBottomWidth: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{color: 'white'}}>Profile Page</Text>
            </View>            
            <View>
                <Text>Here you can edit your user information - address, city, state, change password...</Text>
            </View>

            </View>
        )
    }
}

export default profile;