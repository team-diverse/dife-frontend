import React, { useEffect, useState, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import { CustomTheme } from "@styles/CustomTheme";
import { formatDate } from "util/formatDate";
import { getProfileById } from "config/api";

import IconChatProfile from "@components/chat/IconChatProfile";
import IconMenu from "@components/chat/IconMenu";
import ModalKebabMenuBlock from "@components/member/ModalKebabMenuBlock";

const ItemBlockList = ({ blacklistedMemberId, date }) => {
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

	const [name, setName] = useState();
	const [fileId, setFileId] = useState(null);

	const getConnectProfile = async () => {
		try {
			const response = await getProfileById(blacklistedMemberId);
			setName(response.data.username);
			setFileId(response.data.profileImg?.id || null);
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
							<IconChatProfile fileId={fileId} />
						</View>
						<Text style={styles.textName}>{name}</Text>
					</TouchableOpacity>
					<View style={styles.iconTextContainer}>
						<Text style={styles.textBlockDate}>
							{formatDate(date)} {t("blocked")}
						</Text>
						<TouchableOpacity
							style={styles.iconMenu}
							onPress={handleIconPress}
						>
							<View ref={iconRef}>
								<IconMenu />
							</View>
						</TouchableOpacity>
						{modalPosition && (
							<ModalKebabMenuBlock
								modalVisible={modalVisible}
								setModalVisible={setModalVisible}
								blacklistedMemberId={blacklistedMemberId}
								position={modalPosition}
							/>
						)}
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
