import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";

import IconChat24 from "@components/Icon24/IconChat24";
import IconAddFriend24 from "@components/Icon24/IconAddFriend24";
import IconHeart24 from "@components/Icon24/IconHeart24";

const { fontCaption, fontNavi } = CustomTheme;

const NotificationCard = ({
	icon,
	name = "name",
	context = "context",
	time = "time",
}) => {
	let iconSvg;
	if (icon === "chat") {
		iconSvg = <IconChat24 />;
	} else if (icon === "connect") {
		iconSvg = <IconAddFriend24 />;
	} else if (icon === "heart") {
		iconSvg = <IconHeart24 />;
	} else {
		iconSvg = <Text>icon</Text>;
	}

	return (
		<View style={styles.rectangle}>
			<View style={styles.notify}>
				<View style={styles.iconTextContainer}>
					<View style={styles.icon}>{iconSvg}</View>
					<View style={styles.textContainer}>
						<Text style={styles.context}>
							{name}
							{context}
						</Text>
					</View>
				</View>
				<Text style={styles.time}>{time}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	rectangle: {
		position: "relative",
		width: "100%",
		height: 54,
		backgroundColor: CustomTheme.bgBasic,
		flexDirection: "row",
		alignItems: "center",
		borderBottomWidth: 1,
		borderBottomColor: CustomTheme.bgList,
	},
	notify: {
		flex: 1,
		flexDirection: "row",
		alignItems: "flex-start",
		justifyContent: "space-between",
	},
	iconTextContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	icon: {
		width: 24,
		height: 24,
		marginLeft: 24,
		marginRight: 12,
	},
	textContainer: {
		flexDirection: "row",
		justifyContent: "flex-start",
		width: 205,
	},
	context: {
		...fontCaption,
	},
	time: {
		...fontNavi,
		color: CustomTheme.textDisable,
		marginRight: 28,
	},
});

export default NotificationCard;
