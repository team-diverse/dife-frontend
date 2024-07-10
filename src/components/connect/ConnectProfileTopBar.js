import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";
import { useNavigation } from "@react-navigation/native";
import Svg, { Path } from "react-native-svg";

const { fontHead20 } = CustomTheme;

const ConnectProfileTopBar = ({ topBar = "프로필 상단바", props }) => {
	const navigation = useNavigation();

	const handleGoBack = () => {
		navigation.goBack();
	};

	return (
		<View style={styles.rectangle}>
			<View style={styles.container}>
				<TouchableOpacity onPress={handleGoBack}>
					<View style={styles.arrow}>
						<Svg
							xmlns="http://www.w3.org/2000/svg"
							width={32}
							height={33}
							fill="none"
							{...props}
						>
							<Path
								stroke="#fff"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M20.666 7.167s-9.333 5.525-9.333 9.333c0 3.806 9.333 9.333 9.333 9.333"
							/>
						</Svg>
					</View>
				</TouchableOpacity>
				<View style={styles.text}>
					<Text style={styles.textStyle}>{topBar}</Text>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	rectangle: {
		position: "relative",
		justifyContent: "center",
		width: "100%",
		height: 48,
		backgroundColor: "transparent",
	},
	container: {
		position: "absolute",
		flexDirection: "row",
		alignItems: "center",
	},
	arrow: {
		marginLeft: 20,
	},
	textStyle: {
		...fontHead20,
		color: CustomTheme.bgBasic,
	},
});

export default ConnectProfileTopBar;
