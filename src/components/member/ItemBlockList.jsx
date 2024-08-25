import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { CustomTheme } from "@styles/CustomTheme";
import { formatDate } from "util/formatDate";
import { getProfileById } from "config/api";

import IconChatProfile from "@components/chat/IconChatProfile";
import IconMenu from "@components/chat/IconMenu";
import ModalKebabMenuBlock from "@components/member/ModalKebabMenuBlock";

const ItemBlockList = ({ blacklistedMemberId, date }) => {
	const navigation = useNavigation();

	const [modalVisible, setModalVisible] = useState(false);

	const [modalPosition, setModalPosition] = useState({
		top: 0,
		left: 0,
	});

	const handleIconPress = (event) => {
		setModalVisible(true);
		const { pageY } = event.nativeEvent;
		setModalPosition({
			top: Math.floor(pageY / 10) * 10,
		});
	};

	const [name, setName] = useState();
	const [imageName, setImageName] = useState(null);

	const getConnectProfile = async () => {
		try {
			const response = await getProfileById(blacklistedMemberId);
			setName(response.data.username);
			setImageName(response.data.profileImg?.originalName || null);
		} catch (error) {
			console.error(
				"디테일 프로필 조회 오류:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	useEffect(() => {
		getConnectProfile();
	}, []);

	return (
		<>
			<View style={styles.rectangle}>
				<View style={styles.containerContext}>
					<TouchableOpacity
						style={styles.iconTextContainer}
						onPress={() =>
							navigation.navigate("ConnectProfilePage", {
								memberId: blacklistedMemberId,
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
							{formatDate(date)} 차단함
						</Text>
						<TouchableOpacity
							style={styles.iconMenu}
							onPress={(event) => handleIconPress(event)}
						>
							<IconMenu />
						</TouchableOpacity>
						<ModalKebabMenuBlock
							modalVisible={modalVisible}
							setModalVisible={setModalVisible}
							blacklistedMemberId={blacklistedMemberId}
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
		width: 13,
		height: 13,
		marginRight: 16,
	},
});

export default ItemBlockList;
