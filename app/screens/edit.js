import React from 'react';
import {Flatlist, StyleSheet, Text, View, Image} from 'react-native';

class edit extends React.Component{

    constructor(props) {
        super(props);
    }

    render()
    {
        return(
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Edit Page</Text>
            </View>
        )
    }

}

export default edit;