import React from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Linking,
	Platform,
} from "react-native";
import { Image } from "expo-image";
import { CustomTheme } from "@styles/CustomTheme";

const { fontCaption } = CustomTheme;

const EventCard = ({ title, date, eventImg = null, url = null }) => {
	const handleEventLinking = async () => {
		try {
			await Linking.openURL(url);
		} catch (error) {
			console.error(
				"이벤트 페이지 url 열기 오류:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	return (
		<TouchableOpacity style={styles.rectangle} onPress={handleEventLinking}>
			<Image source={eventImg} style={styles.image} />
			<View style={styles.eventTextContainer}>
				<Text style={[styles.title, { opacity: 1 }]}>{title}</Text>
				<Text style={styles.date}>{date}</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	rectangle: {
		width: 326,
		height: 159,
		backgroundColor: CustomTheme.textDisable,
		borderRadius: 20,
		marginVertical: 8,
		overflow: "hidden",
		...Platform.select({
			android: {
				elevation: 3,
			},
		}),
	},
	image: {
		width: "100%",
		height: "100%",
	},
	eventTextContainer: {
		position: "absolute",
		width: "100%",
		backgroundColor: CustomTheme.bgBasic,
		paddingLeft: 10,
		paddingTop: 8,
		paddingBottom: 11,
		borderBottomLeftRadius: 19,
		borderBottomRightRadius: 19,
		opacity: 0.9,
		bottom: 0,
	},
	title: {
		fontSize: 12,
		lineHeight: 16,
		fontFamily: "NotoSansCJKkr-Bold",
	},
	date: {
		...fontCaption,
	},
});

export default EventCard;
