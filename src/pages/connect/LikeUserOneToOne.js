import React from "react";
import { SafeAreaView, View, FlatList } from "react-native";
import ConnectLikeUserStyles from "@pages/connect/ConnectLikeUserStyles.js";
import ConnectStyles from "./ConnectStyles";
import ConnectCard from "@components/connect/ConnectCard.js";

const LikeUserOneToOne = () => {
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
                                <ConnectCard {...item} tag={item.tags} />
                            </View>
                        )}
                        keyExtractor={(item) => item.id}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default LikeUserOneToOne;
