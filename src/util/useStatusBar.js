import { useIsFocused } from "@react-navigation/native";
import { useEffect } from "react";
import { Platform, StatusBar } from "react-native";

export const useStatusBar = ({ color, barStyle }) => {
	const isFocused = useIsFocused();

	useEffect(() => {
		if (!isFocused || Platform.OS !== "android") return;
		StatusBar.setBackgroundColor(color);
		StatusBar.setBarStyle(barStyle);
	}, [isFocused, color, barStyle]);
};
