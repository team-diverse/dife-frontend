import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";
import { useNavigation } from "@react-navigation/native";

import IconModifyProfileCancel from "@components/member/IconModifyProfileCancel";
import IconModifyProfileCheck from "@components/member/IconModifyProfileCheck";

const { fontHead20 } = CustomTheme;

const ModifyProfileTopBar = ({ topBar = "TopBar" }) => {
	const navigation = useNavigation();

	const handleGoBack = () => {
		navigation.goBack();
	};

	return (
		<View style={styles.rectangle}>
			<View style={styles.container}>
				<View style={styles.containerCancelText}>
					<TouchableOpacity onPress={handleGoBack}>
						<View style={styles.arrow}>
							<IconModifyProfileCancel />
						</View>
					</TouchableOpacity>
					<View style={styles.text}>
						<Text style={styles.textStyle}>{topBar}</Text>
					</View>
				</View>
				<View style={styles.check}>
					<IconModifyProfileCheck />
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
		backgroundColor: CustomTheme.bgBasic,
	},
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	containerCancelText: {
		flexDirection: "row",
		alignItems: "center",
	},
	arrow: {
		marginLeft: 20,
		marginRight: 9,
	},
	check: {
		marginRight: 28,
	},
	textStyle: {
		...fontHead20,
	},
});

export default ModifyProfileTopBar;
