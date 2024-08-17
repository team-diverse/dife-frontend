import React from "react";
import { SafeAreaView, View, FlatList } from "react-native";
import ConnectLikeUserStyles from "@pages/connect/ConnectLikeUserStyles.js";
import ConnectStyles from "./ConnectStyles";
import ConnectCard from "@components/connect/ConnectCard.js";

const LikeUserGroup = () => {
	const connectData = [
		{
			id: "1",
			profile: require("@assets/images/test_img/test_connectProfile.jpeg"),
			name: "Amy",
			country: "France",
			age: "23",
			major: "Industrial Design",
			introduction:
				"adipiscing varius eu sit nulla, luctus tincidunt ex at ullamcorper cursus odio laoreet placerat.",
			tags: ["enfp", "Sports", "Drawing"],
			headcount: 23,
		},
	];

	return (
		<SafeAreaView style={ConnectLikeUserStyles.container}>
			<View style={[ConnectStyles.cardContainer, { marginTop: 14 }]}>
				<View style={ConnectStyles.flatlist}>
					<FlatList
						contentContainerStyle={ConnectStyles.flatlistContent}
						data={connectData}
						renderItem={({ item }) => (
							<View style={ConnectStyles.cardContainer}>
								<ConnectCard
									{...item}
									isLiked={true}
									groupName={item.name}
									tag={item.tags}
								/>
							</View>
						)}
						keyExtractor={(item) => item.id}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default LikeUserGroup;
