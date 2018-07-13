import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import { CONSTANTS } from '../../config/constants.js'

class AppBar extends Component{
    render(){

        return (
            <View style={styles.appBar}>
                {this.backBtn()}
                <Text style={styles.appTitle}>{CONSTANTS.APP_NAME}</Text>
            </View>
        );
    }

    backBtn(){
        if (this.props.pushed==true){
            return (
                <TouchableOpacity
                    onPress={()=>this.props.navigation.goBack()} 
                    style={styles.backBtn}
                >
                    <Text style={{fontWeight:"900"}}>عودة</Text>
                </TouchableOpacity>
            )
        }

        return null;
    }
}
const styles = StyleSheet.create({
    appBar: {
        width: 100+"%", 
        height: 50, 
        backgroundColor: "rgb(240,240,240)",
        borderBottomColor: "rgb(220,220,220)",
        borderBottomWidth: StyleSheet.hairlineWidth,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        elevation: 1,
        shadowColor: 'black',
        shadowOffset: {width: 3, height: 3}
    },
    appTitle : {
        
        fontSize: 26
    },
    backBtn:{
        position: "absolute",
        left: 5
    }
})

export default AppBar;