import React, { Component } from "react";

import { View, Text, StyleSheet, Image, Button } from "react-native";
import TopicContainer from "../containers/TopicContainer.js";
import { AppBar } from "../components";
import { SearchBar } from "react-native-elements";

class Topics extends Component {
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
	
	render() {
		return (
			<View style={{ flex: 1 }}>
				<View>
					<AppBar navigation={this.props.navigation} />
				</View>
				<View style={{ flex: 1 }}>
					<View>
						<SearchBar
							onChangeText={text => this.onSearchTextChnage(text)}
							value={this.state.searchText}
							placeholder="ابحث عن ..."
							lightTheme
							round
						/>
					</View>
					<View>
						<TopicContainer 
							qType={"Main"} 
							filter={this.state.searchText}
							navigation={this.props.navigation} 
						/>
					</View>
				</View>
			</View>
		);
	}
}

export default Topics;
