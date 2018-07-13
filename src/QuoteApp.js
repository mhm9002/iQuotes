import React, { Component } from "react";
import {
	createSwitchNavigator,
	createBottomTabNavigator,
	createStackNavigator
} from "react-navigation";
import { Provider } from "react-redux";
import store from "./store.js";
import { Constants } from "expo";

//screens
import {
	Feed,
	Search,
	Characters,
	Topics,
	Settings,
    SourceQuotes,
    TopicQuotes
} from "./view/screens";

import { AppBar } from "./view/components";
import { View, Image, Text } from "react-native";
import assets from "./assets/assets.js";
import { CONSTANTS } from "./config/constants.js";

//config navigation
const TabNav = createBottomTabNavigator({
	quotePage: Feed,
	searchPage: Search,
	characterPage: Characters,
	topicPage: Topics,
	settingPage: Settings
}, {
	navigationOptions: ({ navigation }) => ({
		tabBarIcon: ({ focused, tintColor }) => {
			const { routeName } = navigation.state;
			let icon = assets.images[routeName];
			
			// You can return any component that you like here! We usually use an
			// icon component from react-native-vector-icons
			return <Image source={icon} style={{width:25, height:25, tintColor:tintColor}} />
		},
		tabBarOptions: {
			activeTintColor: 'tomato',
			inactiveTintColor: 'gray',
		},
		tabBarLabel: CONSTANTS[navigation.state.routeName]
			
		
	}
	)}
);

const StackNav1 = createStackNavigator(
	{
		main: TabNav,
        subSource: SourceQuotes,
        subTopic: TopicQuotes
	},
	{
		headerMode: "none",
		navigationOptions: {
			headerVisible: false
		}
	}
);

//main class
class QuoteApp extends Component {
	render() {
		return (
			<Provider store={store}>
				<View style={{flex: 1, paddingTop:Constants.statusBarHeight}}>
					<StackNav1 />
				</View>
			</Provider>
		);
	}
}

export default QuoteApp;
