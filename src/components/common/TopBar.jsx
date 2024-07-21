import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";
import { useNavigation } from "@react-navigation/native";

import ArrowRight from "@components/common/ArrowRight";

const { fontHead20 } = CustomTheme;

const TopBar = ({ topBar = "TopBar", color, backgroundColor }) => {
	const navigation = useNavigation();

	const handleGoBack = () => {
		navigation.goBack();
	};

	return (
		<View
			style={[
				styles.rectangle,
				{ backgroundColor: backgroundColor || CustomTheme.bgBasic },
			]}
		>
			<View style={styles.container}>
				<TouchableOpacity onPress={handleGoBack}>
					<View style={styles.arrow}>
						<ArrowRight color={color} />
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
	},
});

export default TopBar;
