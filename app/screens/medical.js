import React from 'react';
import {Flatlist, StyleSheet, Text, View, Image} from 'react-native';

class medical extends React.Component{
    constructor(props) {
        super(props);
    }

    render()
    {
        return(
            <View style={{flex: 1, backgroundColor: '#ffdf80' }}>
            <View style={{height: 70, paddingTop: 30, backgroundColor: '#355e3b', borderColor: 'lightgrey', borderBottomWidth: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{color: 'white'}}>Upkeep Page</Text>
            </View>                
            <View>
                <Text>This is where Feed inputs, medical, foot trimming, etc will go...</Text>
            </View>

            </View>
        )
    }
}

export default medical;