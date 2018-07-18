import { AsyncStorage } from "react-native";
import { Permissions, Notifications } from "expo";

function getRandomColor() {
	var h = Math.floor(Math.random() * 360);
	var s = Math.floor(Math.random() * 50) + 30;
	var l = Math.floor(Math.random() * 20) + 60;

	var color =
		"hsl(" + h.toString() + ", " + s.toString() + "%, " + l.toString() + "%)";

	return color;
}

getStoredData = async key => {
	try {
		//await AsyncStorage.clear();
		return AsyncStorage.getItem(key).then(res => {
			return res;
		});
	} catch (error) {
		console.log("Error: ", error);
		//alert(error);
		return null;
	}
};

setStoredData = async (key, data) => {
	try {
		await AsyncStorage.setItem(key, data);
		//console.log(ret);
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
};

getCameraRollAsync = async () => {
	const { Permissions } = Expo;
	const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
	if (status === "granted") {
		return true;
	} else {
		return false; //throw new Error('Location permission not granted');
	}
};

requestNotificationPermission = async () => {
	let { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);

	if (status !== "granted") {
		await Permissions.askAsync(Permissions.NOTIFICATIONS);

		let { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
		if (status !== "granted") {
			return false;
		}
	}

	return true;
};

sendNotification = async (msg, icon) => {
	let permit = await requestNotificationPermission();
	if (permit == true) {
		const localnotification = {
			title: "iQuotes App",
			body: msg,
			android: {
				sound: true,
				icon: icon
			},
			ios: {
				sound: true
			}
		};

		await Notifications.presentLocalNotificationAsync(localnotification);
	}
};

setNotification = async setting => {};

module.exports = {
	getRandomColor,
	getStoredData,
	setStoredData,
	getCameraRollAsync,
	sendNotification,
	setNotification
};
