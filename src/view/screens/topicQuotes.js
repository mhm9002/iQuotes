import React, { Component } from "react";

import { View, StyleSheet } from "react-native";

import { QuoteContainer } from "../containers";
import { AppBar } from '../components';

class TopicQuotes extends Component {
	render() {
		//alert (this.props.navigation.getParam('sID',0));
		return (
			<View style={{ flex: 1 }}>
				<View>
					<AppBar navigation={this.props.navigation} pushed={true} />
				</View>
				<View style={{ flex: 1 }}>
					<QuoteContainer
						qType={"Topic"}
                        qTID={this.props.navigation.getParam("tID", 0)}
                        navigation={this.props.navigation}
					/>
				</View>
			</View>
		);
	}
}

export default TopicQuotes;
