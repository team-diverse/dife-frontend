import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";
import Modal from "react-native-modal";
import CompleteIcon from "@components/common/CompleteIcon";
import ConnectRequestIcon from "@components/common/ConnectRequestIcon";

const ConnectRequest = ({
	modalVisible,
	setModalVisible,
	textLoading = "커넥트 요청중",
	textComplete = "커넥트 요청 완료!",
}) => {
	const [showConnectRequest, setShowConnectRequest] = useState(true);
	const [showConnectComplete, setShowConnectComplete] = useState(false);

	useEffect(() => {
		let timeoutRequest, timeoutComplete;

		if (modalVisible) {
			setShowConnectRequest(true);
			setShowConnectComplete(false);

			timeoutRequest = setTimeout(() => {
				setShowConnectRequest(false);
				setShowConnectComplete(true);
			}, 2500);

			timeoutComplete = setTimeout(() => {
				setModalVisible(false);
			}, 4500);
		}

		return () => {
			clearTimeout(timeoutRequest);
			clearTimeout(timeoutComplete);
		};
	}, [modalVisible]);

	const handleBackdropPress = () => {
		if (!showConnectRequest) {
			setModalVisible(false);
		}
	};

	return (
		<Modal
			isVisible={modalVisible}
			style={styles.modal}
			onBackdropPress={handleBackdropPress}
		>
			<View style={styles.rectangle}>
				{showConnectRequest && (
					<View style={styles.connectContainer}>
						<View style={styles.completeIcon}>
							<ConnectRequestIcon />
						</View>
						<View style={styles.connectTextView}>
							<Text style={styles.connectText}>
								{textLoading}
							</Text>
						</View>
					</View>
				)}

				{showConnectComplete && (
					<View style={styles.connectContainer}>
						<CompleteIcon isConnect={true} />
						<View style={styles.connectTextView}>
							<Text style={styles.connectText}>
								{textComplete}
							</Text>
						</View>
					</View>
				)}
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modal: {
		justifyContent: "center",
		alignItems: "center",
	},
	rectangle: {
		width: 260,
		height: 360,
		backgroundColor: CustomTheme.bgBasic,
		borderRadius: 20,
		position: "relative",
	},
	connectContainer: {
		alignItems: "center",
		marginTop: 114,
		width: "100%",
	},
	completeIcon: {
		width: 80,
		height: 80,
		justifyContent: "center",
		alignItems: "center",
	},
	connectTextView: {
		marginTop: 44,
	},
	connectText: {
		fontSize: 16,
		lineHeight: 24,
		fontFamily: "NotoSansCJKkr-Bold",
	},
});

export default ConnectRequest;
