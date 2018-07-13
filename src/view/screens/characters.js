import React, { Component } from 'react';

import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { SearchBar } from 'react-native-elements';
import SourceContainer from '../containers/SourceContainer.js';
import { AppBar } from '../components';

class Characters extends Component{
    constructor(props){
        super(props);
        this.state = {
            searchText: ""
        }
    }

    onSearchTextChnage(text){
        this.setState({
            searchText: text
        });
    }

    render(){
        return (
            <View style={{flex: 1, flexDirection: "column"}}>
                <View>
                    <AppBar navigation={this.props.navigation} />
                </View>
                <View style={{flex: 1}}>
                    <View>
                        <SearchBar 
                            onChangeText={(text)=>this.onSearchTextChnage(text)}
                            value={this.state.searchText}
                            placeholder="ابحث عن ..." 
                            lightTheme round />
                    </View>
                    <View>
                        <SourceContainer 
                            qType={"Main"} 
                            filter={this.state.searchText}
                            navigation={this.props.navigation} />
                    </View>
                </View>
                
            </View>
        );
    }
}

export default Characters;