import React, { Component } from "react";

import { View, Text, StyleSheet, Image, Button } from "react-native";
import { AppBar } from '../components';

class Settings extends Component {
	render() {
		return (
			<View style={{ flex: 1 }}>
				<View>
					<AppBar navigation={this.props.navigation} />
				</View>
				<View style={{ flex: 1 }}>
					<Text>This is Settings</Text>
				</View>
			</View>
		);
	}
}

export default Settings;
