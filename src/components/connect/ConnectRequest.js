import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";
import Modal from "react-native-modal";
import CompleteIcon from "@components/common/CompleteIcon";
import ConnectRequestIcon from "@components/common/ConnectRequestIcon";

const ConnectRequest = ({ modalVisible }) => {
	const [showConnectRequest, setShowConnectRequest] = useState(true);
	const [showConnectComplete, setShowConnectComplete] = useState(false);

	useEffect(() => {
		if (modalVisible) {
			setShowConnectRequest(true);
			setShowConnectComplete(false);
		}
	}, [modalVisible]);

	return (
		<Modal isVisible={modalVisible} style={styles.modal}>
			<View style={styles.rectangle}>
				{showConnectRequest && (
					<View style={styles.connectContainer}>
						<View style={styles.completeIcon}>
							<ConnectRequestIcon />
						</View>
						<View style={styles.connectTextView}>
							<Text style={styles.connectText}>
								커넥트 요청중
							</Text>
						</View>
					</View>
				)}

				{showConnectComplete && (
					<View style={styles.connectContainer}>
						<CompleteIcon isConnect={true} />
						<View style={styles.connectTextView}>
							<Text style={styles.connectText}>
								커넥트 요청 완료!
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
