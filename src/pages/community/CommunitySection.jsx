import React from "react";
import { useTranslation } from "react-i18next";
import CommunityStyles from "@pages/community/CommunityStyles";
import IconCommunityTitle from "@components/community/IconCommunityTitle";
import ItemCommunityPreview from "@components/community/ItemCommunityPreview";
import { View, Text, TouchableOpacity } from "react-native";
import ArrowRight from "@components/common/ArrowRight";

const CommunitySection = ({ title, postList, onMorePress }) => {
	const { t } = useTranslation();
	return (
		<View>
			<View style={CommunityStyles.containerCommunityTop}>
				<View style={CommunityStyles.containerTitle}>
					<IconCommunityTitle style={CommunityStyles.iconCommunity} />
					<Text style={CommunityStyles.textCommunityTitle}>
						{t(title)}
					</Text>
				</View>
				<TouchableOpacity
					style={CommunityStyles.containerMore}
					onPress={onMorePress}
				>
					<Text style={CommunityStyles.textCommunityMore}>
						{t("moreButton")}
					</Text>
					<ArrowRight style={CommunityStyles.iconArrow} />
				</TouchableOpacity>
			</View>
			<View style={CommunityStyles.itemCommunityPreview}>
				<ItemCommunityPreview postList={postList} />
			</View>
		</View>
	);
};

export default CommunitySection;
