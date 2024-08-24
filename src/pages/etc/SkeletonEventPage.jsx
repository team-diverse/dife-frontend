import React from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";

import { CustomTheme } from "@styles/CustomTheme";

import TopBar from "@components/common/TopBar";

const { fontCaption } = CustomTheme;

const SkeletonEventPage = () => {
	const title = "[프로그램] 2022-1학기 해외파견교환학생 설명회 홍보";
	const date = "2022.02.14 ~ 2022.02.15";

	const EventItem = ({ title, date }) => (
		<View style={styles.rectangle}>
			<View style={styles.eventTextContainer}>
				<Text style={[styles.title, { opacity: 1 }]}>{title}</Text>
				<Text style={styles.date}>{date}</Text>
			</View>
		</View>
	);

	return (
		<SafeAreaView style={styles.container}>
			<TopBar topBar="이벤트" />
			{Array.from({ length: 5 }).map((_, index) => (
				<EventItem key={index.toString()} title={title} date={date} />
			))}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: CustomTheme.bgBasic,
		alignItems: "center",
	},
	rectangle: {
		position: "relative",
		width: 326,
		height: 159,
		backgroundColor: "#E4E6EF",
		borderRadius: 20,
		marginVertical: 8,
		overflow: "hidden",
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

export default SkeletonEventPage;
