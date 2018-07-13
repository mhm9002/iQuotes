import { Font } from "expo";
import React, { Component } from "react";
import QuoteApp from "./src/QuoteApp.js";
import { Text, AsyncStorage } from "react-native";
import assets from "./src/assets/assets.js";

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = { loading: true };

		//AsyncStorage.removeItem("Likes");
	}

	componentDidMount() {
		Font.loadAsync(assets.fonts);
		this.setState({ loading: false });
	}

	render() {
		if (this.state.loading) {
			return <Text>Loading...</Text>;
		}
		return <QuoteApp />;
	}
}
