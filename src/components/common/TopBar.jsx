import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";
import { useNavigation } from "@react-navigation/native";

import ArrowRight from "@components/common/ArrowRight";

const { fontHead20 } = CustomTheme;

const TopBar = ({ topBar, color, backgroundColor }) => {
	const navigation = useNavigation();

	const handleGoBack = () => {
		navigation.goBack();
	};

	return (
		<View
			style={[
				styles.rectangle,
				{
					backgroundColor: backgroundColor || CustomTheme.bgBasic,
				},
			]}
		>
			<View style={styles.container}>
				<TouchableOpacity onPress={handleGoBack}>
					<View style={styles.arrow}>
						<ArrowRight color={color} />
					</View>
				</TouchableOpacity>
				<Text numberOfLines={2} style={styles.textStyle}>
					{topBar}
				</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	rectangle: {
		position: "relative",
		justifyContent: "center",
		width: "100%",
		minHeight: 48,
	},
	container: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 20,
	},
	arrow: {
		marginRight: 4,
	},
	textStyle: {
		...fontHead20,
	},
});

export default TopBar;
