import React, { Component } from "react";
import { Modal, Text, TouchableHighlight, View, TextInput } from "react-native";
import { CONSTANTS } from "../../config/constants";

class ReportModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			visibility: this.props.visibility,
			report: ""
		};
	}

    /*
	componentDidMount() {
		this.setState({
			visibility: this.props.visibility
		});
	}
*/
	render() {
		return (
			<Modal
				style={{
					position: "absolute",
                    top: 50,
                    bottom: 50,
                    right: 50,
                    left: 50,
					backgroundColor: "transparent",
					alignItems: "center",
					justifyContent: "center"
				}}
				animationType="slide"
				transparent={true}
				isVisible={this.state.visibility}
				onRequestClose={() => {
					//alert('Modal has been closed.');
				}}>
				<View
					style={{
						marginTop: 22,
						padding: 22,
						justifyContent: "center",
						alignItems: "center"
					}}>
					<Text>{CONSTANTS.REPORT_PHRASE}</Text>
					<Text>{this.props.qID}</Text>
					<Text>{this.props.qContent}</Text>
					<Text>{this.props.qSource}</Text>
					<TextInput
						onChangeText={report => {
							this.setState({ report });
						}}
						value={this.state.report}
					/>
					<TouchableHighlight
						onPress={() => {
							this.setState({
								visibility: false
							});
							//this.setModalVisible(!this.state.modalVisible);
						}}>
						<Text>{CONSTANTS.REPORT_TEXT}</Text>
					</TouchableHighlight>
				</View>
			</Modal>
		);
	}
}

export default ReportModal;
