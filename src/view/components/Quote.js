import React, { Component } from "react";
import {
	Alert,
	View,
	Text,
	StyleSheet,
	Image,
	Dimensions,
	TouchableOpacity,
	ImageBackground,
	CameraRoll,
	Share,
	Modal,
	TextInput,
	ScrollView
} from "react-native";

import { takeSnapshotAsync } from "expo";
import assets from "../../assets/assets";
import { CONSTANTS } from "../../config/constants";
import { getRandomColor, getCameraRollAsync } from "../../lib/functions";
import Api from "../../lib/api";

class Quote extends Component {
	constructor(param) {
		super(param);
		this.state = {
			screenWidth: Dimensions.get("window").width,
			imageWidth: 0,
			imageHeight: 0,
			backgroundImage: assets.postPhotos[this.props.postPhotoNo],
			photoSource: "",
			photoOwner: "",
			contentStyle: this.getFont(this.props.contentStyle, "content"),
			sourceStyle: this.getFont(this.props.contentStyle, "source"),
			reportModalVisibility: false,
			report: "",
			reportEmail: "",
			isLoading: false
		};
	}

	_onLayout(event) {
		const containerWidth = event.nativeEvent.layout.width;

		this.resizePhoto(containerWidth);

		this.setState({
			contentStyle: this.getFont(this.props.contentStyle, "content"),
			sourceStyle: this.getFont(this.props.contentStyle, "source")
		});
	}

	_visitSource() {
		this.props.navigation.push("subSource", { sID: this.props.item.item.sID });
	}

	_visitTopic() {
		this.props.navigation.push("subTopic", { tID: this.props.item.item.tID });
	}

	resizePhoto(w) {
		console.log(typeof this.state.backgroundImage);
		if (typeof this.state.backgroundImage != "number") {
			Image.getSize(this.state.backgroundImage.uri, (width, height) => {
				this.setState({
					imageWidth: w,
					imageHeight: w * (height / width)
				});
				console.log("remote: " + width + " , " + height);
			});
		} else {
			var { width, height } = Image.resolveAssetSource(
				this.state.backgroundImage
			);
			this.setState({
				imageWidth: w,
				imageHeight: w * (height / width)
			});
			console.log("asset: " + width + " , " + height);
		}
	}

	_changeBackgound() {
		this.loadphoto(parseInt(Math.random() * 27) + 1);
	}

	getFont(r, type) {
		var fSize = this.state ? parseInt(this.state.imageWidth / 25) : 18;

		if (type == "source") fSize = Math.round(fSize * 0.7);

		//small font
		if (r == 3) fSize = Math.round(fSize * 1.5);

		//console.log(fSize);

		return {
			fontSize: fSize,
			fontFamily: r,
			color: "white",
			textAlign: "center"
		};
	}

	componentDidMount() {
		//window.addEventListener('onLike', this.props.onLike)
		this.loadphoto(this.props.postPhotoNo);
	}

	loadphoto(pID) {
		Api.post("photo", "getData", { pID: pID })
			.then(data => {
				if (data.STATUS == "SUCCESS") {
					this.setState({
						photoSource: data.RESULT.source,
						photoOwner: data.RESULT.owner,
						backgroundImage: {
							uri: Api.ApiUrl + "/quotePhotos/" + data.RESULT.link
						}
					});
				} else {
					this.setState({
						photoOwner: "",
						photoSource: "",
						backgroundImage: assets.postPhotos[pID]
					});

					console.log("photo not found");
					console.log(data.RESULT);
				}
				this.resizePhoto(this.state.imageWidth);
			})
			.catch(err => {
				console.log(err);
			});
	}

	download = async () => {
		let permit = await getCameraRollAsync();

		if (permit == false) {
			console.log("ACCESS DENIED");
			//need further messaging system
		} else {
			let res = await takeSnapshotAsync(this._quoteExport, {
				format: "png",
				result: "file",
				quality: 0.8
			});

			let saveRes = await CameraRoll.saveToCameraRoll(res, "photo");

			Alert.alert("Quote saved", saveRes);
			// for share you will need the below line.
			//this.setState({ cameraRollUri: saveResult });
		}
	};

	share = () => {
		takeSnapshotAsync(this._quoteExport, {
			format: "png",
			result: "base64"
		})
			.then(res => {
				console.log(res);

				//			const res = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==';

				try {
					Share.share(
						{
							message: "Check quote",
							title: "Check this quote - QuoteApp"
							//url: "data:image/png;base64,"+res
						},
						{
							dialogTitle: "Share Quote"
						}
					);
				} catch (err) {
					Alert.alert(err.toString());
				}
			})
			.catch(err => {
				Alert.alert(err.toString());
			});
	};

	report = () => {
		this.setState({
			reportModalVisibility: true
		});
	};

	renderModalContent = () => {
		const quoteData = this.props.item.item;
		return (
			<ScrollView>
				<View style={styles.reportModal}>
					<Text>{CONSTANTS.REPORT_PHRASE}</Text>

					<View style={{ backgroundColor: "rgba(255,230,210,1)", padding: 10 }}>
						<Text>القول: "{quoteData.content}"</Text>
						<Text>المصدر: {quoteData.source}</Text>
					</View>

					<TextInput
						multiline={true}
						maxLength={200}
						onChangeText={report => {
							this.setState({ report });
						}}
						editable={true}
						value={this.state.report}
						placeholder={"أدخل تفاصيل البلاغ"}
						style={{ width: 90 + "%", padding: 10 }}
					/>
					<TextInput
						multiline={false}
						maxLength={100}
						onChangeText={reportEmail => {
							this.setState({ reportEmail });
						}}
						value={this.state.reportEmail}
						placeholder={"أدخل بريدك الإلكتروني - إختياري"}
						style={{ width: 90 + "%", padding: 10 }}
					/>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-evenly",
							width: 60 + "%"
						}}>
						<TouchableOpacity
							style={{ padding: 10, backgroundColor: "#006699" }}
							onPress={() => {
								this.sendReport(this.state.report, this.state.reportEmail);
								this.setState({
									reportModalVisibility: false
								});
								//this.setModalVisible(!this.state.modalVisible);
							}}>
							<Text style={{ color: "white" }}>{CONSTANTS.REPORT_TEXT}</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={{ padding: 10, backgroundColor: "#006699" }}
							onPress={() => {
								this.setState({
									reportModalVisibility: false
								});
								//this.setModalVisible(!this.state.modalVisible);
							}}>
							<Text style={{ color: "white" }}>{CONSTANTS.CANCEL_TEXT}</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		);
	};

	sendReport = async (report, reportEmail) => {
		var param = {
			report: report,
			reportEmail: reportEmail,
			qID: this.props.item.item.qID
		};
		let res = await Api.post("quote", "report", param);
		console.log(res);

		switch (res.STATUS) {
			case "ERROR":
				Alert.alert("Error sending Report:" + res.ERROR);
				break;
			case "SUCCESS":
				Alert.alert("تم التبليغ بنجاح");
				break;
			case "FAILED":
				Alert.alert("حدث خطأ في إرسال البلاغ");
				break;
		}
	};

	render() {
		const likeButtonColor = this.props.liked ? "rgb(255,0,0)" : "rgb(0,0,0)";
		const quoteData = this.props.item.item;

		var sourcePhrase = "iQuote App";
		sourcePhrase +=
			this.state.photoSource != ""
				? " - Photo by " +
				  this.state.photoSource +
				  " - " +
				  this.state.photoOwner
				: "";

		return (
			<View style={styles.quoteBox} onLayout={this._onLayout.bind(this)}>
				<View
					style={[
						styles.overlay,
						{
							opacity: this.state.isLoading ? 0.2 : 1
						}
					]}>
					<View
						collapsable={false}
						ref={view => {
							this._quoteExport = view;
						}}>
						<ImageBackground
							source={this.state.backgroundImage}
							style={{
								alignItems: "center",
								justifyContent: "center",
								height: this.state.imageHeight,
								width: this.state.imageWidth
							}}>
							<View style={styles.quoteContent}>
								<View style={{ flexDirection: "row", padding: 20 }}>
									<Text style={this.state.contentStyle}>
										"{quoteData.content}"
									</Text>
								</View>

								<Text style={this.state.sourceStyle}>{quoteData.source}</Text>
							</View>
							<Text style={styles.photoSource}>{sourcePhrase}</Text>
						</ImageBackground>
					</View>
					<View style={styles.tagBar}>
						<TouchableOpacity
							style={{ borderRadius: 10, backgroundColor: getRandomColor() }}
							onPress={() => this._visitSource()}>
							<Text style={styles.barText}>{quoteData.source}</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={{ borderRadius: 10, backgroundColor: getRandomColor() }}
							onPress={() => this._visitTopic()}>
							<Text style={styles.barText}>{quoteData.topic}</Text>
						</TouchableOpacity>
					</View>

					<View style={styles.actionBar}>
						<TouchableOpacity
							style={styles.actionBox}
							onPress={() => {
								this.setState({ isLoading: true });
								this.props.onLike();
							}}>
							<Image
								style={[styles.actionButton, { tintColor: likeButtonColor }]}
								source={assets.images.likeButton}
							/>
							<Text style={[styles.actionText, { color: likeButtonColor }]}>
								{CONSTANTS.LIKE_TEXT}
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.actionBox}
							onPress={() => this.download()}>
							<Image
								style={styles.actionButton}
								source={assets.images.downloadButton}
							/>
							<Text style={styles.actionText}>{CONSTANTS.DOWNLOAD_TEXT}</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.actionBox}
							onPress={() => this.share()}>
							<Image
								style={styles.actionButton}
								source={assets.images.sendButton}
							/>
							<Text style={styles.actionText}>{CONSTANTS.SHARE_TEXT}</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.actionBox}
							onPress={() => this.report()}>
							<Image
								style={styles.actionButton}
								source={assets.images.reportButton}
							/>
							<Text style={styles.actionText}>{CONSTANTS.REPORT_TEXT}</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.actionBox}
							onPress={() => this._changeBackgound()}>
							<Image
								style={styles.actionButton}
								source={assets.images.backgroundButton}
							/>
							<Text style={styles.actionText}>{CONSTANTS.BACKGROUND_TEXT}</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.modalContainer}>
						<Modal
							transparent={true}
							visible={this.state.reportModalVisibility}
							onRequestClose={() => {
								this.setState({ reportModalVisibility: false });
								//alert('Modal has been closed.');
							}}>
							{this.renderModalContent()}
						</Modal>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	quoteBox: {
		margin: 15,
		elevation: 2,
		shadowOpacity: 0.8,
		shadowRadius: 2,
		shadowOffset: { width: 5, height: 5 },
		shadowColor: "#000",
		backgroundColor: "rgba(255,255,255,0.5)"
	},
	tagBar: {
		flex: 1,
		width: 100 + "%",
		backgroundColor: "rgba(50,50,50,0.2)",
		flexDirection: "row",
		paddingHorizontal: 10,
		justifyContent: "space-between",
		padding: 10
	},
	barText: {
		color: "black",
		fontFamily: "2",
		padding: 2
	},
	quoteUserThumb: {
		width: 40,
		height: 40,
		borderRadius: 20,
		margin: 5
	},
	quoteContent: {
		width: 100 + "%",
		backgroundColor: "rgba(0,0,0,0.3)",
		padding: 10,
		justifyContent: "center",
		alignItems: "center"
	},
	photoSource: {
		fontSize: 4,
		color: "rgba(255,255,255,0.6)",
		position: "absolute",
		bottom: 2,
		right: 2
	},
	actionBar: {
		flex: 1,
		padding: 10,
		flexDirection: "row",
		paddingHorizontal: 10,
		justifyContent: "space-between",
		marginTop: 5,
		marginLeft: 10,
		marginRight: 10,
		marginBottom: 5,
		paddingBottom: 5
	},
	actionButton: {
		width: 20,
		height: 20
	},
	actionLikeButton: {
		width: 20,
		height: 20,
		marginLeft: 5
	},
	actionText: {
		fontSize: 12,
		fontFamily: "7",
		marginTop: 2
	},
	actionBox: {
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center"
	},
	modalContainer: {},
	reportModal: {
		flex: 0.6,
		marginTop: 20 + "%",
		marginLeft: 30,
		marginRight: 30,
		padding: 30,
		backgroundColor: "rgba(255,255,255,0.95)",
		flexDirection: "column",
		justifyContent: "space-between",
		borderRadius: 15,
		borderColor: "#505050",
		borderWidth: 1
	},
	overlay: {}
});

export default Quote;
