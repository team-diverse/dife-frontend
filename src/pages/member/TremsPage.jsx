import React from "react";
import { SafeAreaView } from "react-native";

import TremsStyles from "@pages/member/TremsStyles";
import { CustomTheme } from "@styles/CustomTheme";

import TopBar from "@components/common/TopBar";

const TremsPage = () => {
	return (
		<SafeAreaView style={TremsStyles.container}>
			<TopBar
				topBar="개인정보 처리방침 및 이용약관"
				color="#000"
				backgroundColor={CustomTheme.primaryBg}
			/>
		</SafeAreaView>
	);
};

export default TremsPage;
