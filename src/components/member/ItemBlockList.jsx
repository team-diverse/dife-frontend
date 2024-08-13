import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";
import { useNavigation } from "@react-navigation/native";

import IconChatProfile from "@components/chat/IconChatProfile";
import IconMenu from "@components/chat/IconMenu";
import ModalKebabMenuBlock from "@components/member/ModalKebabMenuBlock";

const ItemBlockList = ({ memberId, name, imageName }) => {
	const navigation = useNavigation();

	let blockDate = "05/11";
	const [modalVisible, setModalVisible] = useState(false);

	const handleModal = () => {
		setModalVisible(true);
	};

	const modalPosition = {
		top: 200,
		width: 20,
	};

	return (
		<>
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
					<View style={styles.iconTextContainer}>
						<Text style={styles.textBlockDate}>
							{blockDate} 차단함
						</Text>
						<TouchableOpacity
							style={styles.iconMenu}
							onPress={handleModal}
						>
							<IconMenu />
						</TouchableOpacity>
						<ModalKebabMenuBlock
							modalVisible={modalVisible}
							setModalVisible={setModalVisible}
							memberId={memberId}
							position={modalPosition}
						/>
					</View>
				</View>
			</View>
		</>
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
	textBlockDate: {
		fontSize: 11,
		lineHeight: 14,
		fontFamily: "NotoSansCJKkr-Regular",
		color: CustomTheme.warningRed,
		marginRight: 12,
	},
	iconMenu: {
		marginRight: 16,
	},
});

export default ItemBlockList;
