import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Svg, { Path } from "react-native-svg";

import { CustomTheme } from "@styles/CustomTheme";

import IconHeart24 from "@components/Icon24/IconHeart24";
import IconKebabMenu from "@components/community/IconKebabMenu";
import ModalKebabMenuProfile from "@components/connect/ModalKebabMenuProfile";

const { fontHead20 } = CustomTheme;

const ConnectProfileTopBar = (props) => {
	const { topBar, active, onPressHeart, memberId, groupId, ...restProps } =
		props;

	const navigation = useNavigation();

	const [modalVisible, setModalVisible] = useState(false);
	const [iconPosition, setIconPosition] = useState({ x: 0, y: 0 });

	const handleGoBack = () => {
		navigation.goBack();
	};

	const handleKebabMenu = () => {
		setModalVisible(true);
	};

	const handleKebabMenuLayout = (event) => {
		const { x, y, width, height } = event.nativeEvent.layout;
		setIconPosition({ x, y, width, height });
	};

	const modalPosition = {
		top: iconPosition.height,
		width: iconPosition.width,
	};

	return (
		<View style={styles.rectangle}>
			<View style={styles.container}>
				<TouchableOpacity onPress={handleGoBack}>
					<Svg
						style={styles.iconArrow}
						xmlns="http://www.w3.org/2000/svg"
						width={32}
						height={33}
						fill="none"
						{...restProps}
					>
						<Path
							stroke="#fff"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M20.666 7.167s-9.333 5.525-9.333 9.333c0 3.806 9.333 9.333 9.333 9.333"
						/>
					</Svg>
				</TouchableOpacity>
				<Text style={styles.textTopBar}>{topBar}</Text>
			</View>

			<View style={styles.containerIcon}>
				<IconHeart24
					style={styles.iconHeart}
					active={active}
					onPress={onPressHeart}
				/>
				<TouchableOpacity
					onPress={handleKebabMenu}
					onLayout={handleKebabMenuLayout}
				>
					<IconKebabMenu />
				</TouchableOpacity>
				<ModalKebabMenuProfile
					modalVisible={modalVisible}
					setModalVisible={setModalVisible}
					memberId={memberId}
					groupId={groupId}
					position={modalPosition}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	rectangle: {
		width: "100%",
		height: 48,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: "transparent",
	},
	container: {
		flexDirection: "row",
		alignItems: "center",
		marginLeft: 18,
	},
	iconArrow: {
		marginRight: 4,
	},
	containerIcon: {
		flexDirection: "row",
		alignItems: "center",
		marginRight: 16,
	},
	iconHeart: {
		marginRight: 14,
	},
	textTopBar: {
		...fontHead20,
		color: CustomTheme.bgBasic,
	},
});

export default ConnectProfileTopBar;
