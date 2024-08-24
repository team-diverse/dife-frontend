import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { CustomTheme } from "@styles/CustomTheme";

const { fontCaption } = CustomTheme;

import IconChatProfile from "@components/chat/IconChatProfile";
import IconSend from "@components/common/IconSend";
import IconMenu from "@components/chat/IconMenu";

const ItemRequestConnectList = ({
	memberId,
	name,
	imageName,
	received = false,
}) => {
	const navigation = useNavigation();

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
						<IconChatProfile imageName={imageName} />
					</View>
					<Text style={styles.textName}>{name}</Text>
				</TouchableOpacity>
				<View style={styles.containerIcon}>
					{received ? (
						<>
							<View
								style={[
									styles.buttonAcceptRefuse,
									{ borderColor: CustomTheme.primaryMedium },
								]}
							>
								<Text
									style={[
										styles.textAcceptRefuse,
										{ color: CustomTheme.primaryMedium },
									]}
								>
									수락
								</Text>
							</View>
							<View
								style={[
									styles.buttonAcceptRefuse,
									{ borderColor: CustomTheme.warningRed },
								]}
							>
								<Text
									style={[
										styles.textAcceptRefuse,
										{ color: CustomTheme.warningRed },
									]}
								>
									거절
								</Text>
							</View>
							<View style={styles.iconMenu}>
								<IconMenu />
							</View>
						</>
					) : (
						<>
							<Text style={styles.textPending}>수락 대기중</Text>
							<TouchableOpacity>
								<View style={styles.rectangleChat}>
									<IconSend />
								</View>
							</TouchableOpacity>
							<View style={styles.iconMenu}>
								<IconMenu />
							</View>
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
	},
	containerIcon: {
		flexDirection: "row",
		alignItems: "center",
	},
	textPending: {
		...fontCaption,
		color: CustomTheme.primaryMedium,
		marginRight: 96,
	},
	buttonAcceptRefuse: {
		width: 76,
		height: 31,
		borderRadius: 12,
		borderWidth: 1,
		justifyContent: "center",
		alignItems: "center",
		marginRight: 8,
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
