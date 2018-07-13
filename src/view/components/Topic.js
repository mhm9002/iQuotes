import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Topic extends Component{
    constructor(param){
        super(param);
    }
    
    _showTopicQuotes(){
        this.props.navigation.navigate('subTopic',{tID:this.props.item.item.tID});
    }

    render(){
        const data = this.props.item.item;
        
        return (
            <View style={styles.topicRow} onTouchEnd={()=>this._showTopicQuotes()}>         
                <View >
                    <Text>{data.topic}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    topicRow: {
        height:50,
        backgroundColor: "rgba(255,255,255,0.8)",
        flexDirection: "row",
        paddingHorizontal: 10,
        justifyContent: "center",
        alignItems: "center",
        paddingRight: 10,
        margin: 10,
        borderWidth: 1,
        borderColor: '#ccc'
    }
})

export default Topic;