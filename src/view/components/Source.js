import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SourceQuotes, Feed } from "../screens";
import { NavigationActions, createStackNavigator } from "react-navigation";

class Source extends Component {
	constructor(param) {
		super(param);
	}

	_showSourceQuotes() {
		this.props.navigation.navigate("subSource", {
			source: this.props.item.item
		});
	}

	render() {
		const data = this.props.item.item;

		return (
			<View
				style={styles.sourceRow}
				onTouchEnd={() => this._showSourceQuotes()}>
				<Text>{data.source}</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	sourceRow: {
		backgroundColor: "rgba(255,255,255,0.8)",
		flexDirection: "row",
		paddingHorizontal: 10,
		justifyContent: "center",
		alignItems: "center",
		padding: 10,
		margin: 5,
		borderWidth: 1,
		borderColor: "#ccc"
	}
});

export default Source;
