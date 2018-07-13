import React, { Component } from 'react';

import { View, StyleSheet } from 'react-native';

import { QuoteContainer } from '../containers';
import { AppBar } from '../components';

class Feed extends Component{
    render(){
        return (

            <View style={{flex: 1}}>
                <View>
                    <AppBar navigation={this.props.navigation} />
                </View>
                <View style={{flex: 1}}>
                    <QuoteContainer qType={'Feed'} navigation={this.props.navigation}/>
                </View>
                
            </View>
        );
    }
}

export default Feed;