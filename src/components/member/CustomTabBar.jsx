import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";

const CustomTabBar = ({ navigationState, jumpTo }) => {
	return (
		<View
			style={{
				flexDirection: "row",
				backgroundColor: "white",
				height: 50,
				borderBottomWidth: 2,
				borderBottomColor: CustomTheme.bgList,
			}}
		>
			{navigationState.routes.map((route, i) => {
				const focused = navigationState.index === i;
				return (
					<TouchableOpacity
						key={route.key}
						style={{
							flex: 1,
							justifyContent: "center",
							alignItems: "center",
						}}
						onPress={() => jumpTo(route.key)}
					>
						{route.icon ? (
							route.icon({ focused })
						) : (
							<Text
								style={{
									fontSize: 16,
									lineHeight: 22,
									fontFamily: "NotoSansCJKkr-Bold",
									color: focused
										? CustomTheme.primaryMedium
										: CustomTheme.bgList,
								}}
							>
								{route.title}
							</Text>
						)}
						{focused && (
							<View
								style={{
									position: "absolute",
									bottom: -2,
									left: 0,
									right: 0,
									height: 2,
									backgroundColor: "#B0D0FF",
								}}
							/>
						)}
					</TouchableOpacity>
				);
			})}
		</View>
	);
};

export default CustomTabBar;
