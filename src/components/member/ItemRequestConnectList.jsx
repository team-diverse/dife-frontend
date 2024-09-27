import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import { CustomTheme } from "@styles/CustomTheme";
import {
	acceptedConnectByMemberId,
	rejectedConnectByConnectId,
} from "config/api";

import IconChatProfile from "@components/chat/IconChatProfile";
import IconSend from "@components/common/IconSend";
import IconMenu from "@components/chat/IconMenu";
import ModalKebabMenuConnectList from "./ModalKebabMenuConnectList";

const { fontCaption } = CustomTheme;

const ItemRequestConnectList = ({
	connectId,
	memberId,
	name,
	fileId,
	received = false,
}) => {
	const { t } = useTranslation();
	const navigation = useNavigation();

	const iconRef = useRef();

	const [modalVisible, setModalVisible] = useState(false);
	const [modalPosition, setModalPosition] = useState({
		x: 0,
		y: 0,
		width: 0,
		height: 0,
	});

	const handleIconPress = () => {
		setModalVisible(true);
		if (iconRef.current) {
			iconRef.current.measureInWindow((x, y, width, height) => {
				setModalPosition({ x, y, width, height });
			});
		}
	};

	const handleAcceptedConnect = async () => {
		try {
			await acceptedConnectByMemberId(memberId);
		} catch (error) {
			console.error(
				"커넥트 수락 오류:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	const handleRejectedConnect = async () => {
		try {
			await rejectedConnectByConnectId(connectId);
		} catch (error) {
			console.error(
				"커넥트 거절 오류:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	return (
		<View style={styles.rectangle}>
			<View style={styles.containerContext}>
				<TouchableOpacity
					style={styles.iconTextContainer}
					onPress={() =>
						navigation.navigate("ConnectProfilePage", {
							memberId: memberId,
						})
					}
				>
					<View style={styles.icon}>
						<IconChatProfile fileId={fileId} />
					</View>
					<Text
						style={styles.textName}
						numberOfLines={1}
						ellipsizeMode="tail"
					>
						{name}
					</Text>
				</TouchableOpacity>
				<View style={styles.containerIcon}>
					{received ? (
						<>
							<TouchableOpacity
								style={[
									styles.buttonAcceptRefuse,
									{ borderColor: CustomTheme.primaryMedium },
								]}
								onPress={handleAcceptedConnect}
							>
								<Text
									style={[
										styles.textAcceptRefuse,
										{ color: CustomTheme.primaryMedium },
									]}
								>
									{t("accept")}
								</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={[
									styles.buttonAcceptRefuse,
									{ borderColor: CustomTheme.warningRed },
								]}
								onPress={handleRejectedConnect}
							>
								<Text
									style={[
										styles.textAcceptRefuse,
										{ color: CustomTheme.warningRed },
									]}
								>
									{t("reject")}
								</Text>
							</TouchableOpacity>
						</>
					) : (
						<>
							<Text style={styles.textPending}>
								{t("pending")}
							</Text>
							<TouchableOpacity>
								<View style={styles.rectangleChat}>
									<IconSend />
								</View>
							</TouchableOpacity>
							<TouchableOpacity
								style={styles.iconMenu}
								onPress={handleIconPress}
							>
								<View ref={iconRef}>
									<IconMenu />
								</View>
							</TouchableOpacity>
							{modalPosition && (
								<ModalKebabMenuConnectList
									modalVisible={modalVisible}
									setModalVisible={setModalVisible}
									name={name}
									connectId={connectId}
									memberId={memberId}
									pending={true}
									position={modalPosition}
								/>
							)}
						</>
					)}
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	rectangle: {
		position: "relative",
		width: "100%",
		height: 72,
		backgroundColor: CustomTheme.bgBasic,
		flexDirection: "row",
		alignItems: "center",
	},
	containerContext: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	iconTextContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	icon: {
		marginLeft: 24,
	},
	textName: {
		marginLeft: 22,
		fontSize: 14,
		lineHeight: 17,
		fontFamily: "NotoSansCJKkr-Bold",
		maxWidth: 120,
	},
	containerIcon: {
		flexDirection: "row",
		alignItems: "center",
	},
	textPending: {
		...fontCaption,
		color: CustomTheme.primaryMedium,
		marginRight: 20,
	},
	buttonAcceptRefuse: {
		width: 57,
		height: 31,
		borderRadius: 12,
		borderWidth: 1,
		justifyContent: "center",
		alignItems: "center",
		marginRight: 14,
	},
	textAcceptRefuse: {
		...fontCaption,
	},
	rectangleChat: {
		width: 42,
		height: 42,
		borderWidth: 1,
		borderColor: "#B0D0FF",
		borderRadius: 10,
		justifyContent: "center",
		alignItems: "center",
		marginRight: 12,
	},
	iconMenu: {
		marginRight: 16,
	},
});

export default ItemRequestConnectList;
