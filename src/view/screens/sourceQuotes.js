import React, { Component } from "react";

import { View, StyleSheet, Text } from "react-native";

import { QuoteContainer } from "../containers";
import { AppBar } from '../components';
import { Card } from "react-native-elements";

class SourceQuotes extends Component {
	render() {
		//alert (this.props.navigation.getParam('sID',0));
		alert (this.props.navigation.getParam("source",0).sID);
		
		return (
			<View style={{ flex: 1 }}>
				<View>
					<AppBar navigation={this.props.navigation} pushed={true} />
				</View>
				<View style={{ flex: 1 }}>
					<Card
						title={this.props.navigation.getParam("source", 0).source}
					>
						<Text>{this.props.navigation.getParam("source", 0).misc}</Text>
					</Card>
					<QuoteContainer
						qType={"Source"}
                        qSID={this.props.navigation.getParam("source", 0).sID}
                        navigation={this.props.navigation}
					/>
				</View>
			</View>
		);
	}
}

export default SourceQuotes;
