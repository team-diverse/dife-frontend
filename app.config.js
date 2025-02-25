const getAppName = () => {
	if (process.env.EXPO_PUBLIC_APP_VARIANT === "staging") {
		return "Dife(Staging)";
	} else if (process.env.EXPO_PUBLIC_APP_VARIANT === "dev") {
		return "Dife(Dev)";
	} else {
		return "Dife";
	}
};

const getIOSBundleIdentifier = () => {
	if (process.env.EXPO_PUBLIC_APP_VARIANT === "staging") {
		return "com.teamdiverse.dife.staging";
	} else if (process.env.EXPO_PUBLIC_APP_VARIANT === "dev") {
		return "com.teamdiverse.dife.dev";
	} else {
		return "com.teamdiverse.dife";
	}
};

const getAndroidPackage = () => {
	if (process.env.EXPO_PUBLIC_APP_VARIANT === "staging")
		return "com.teamdiverse.dife.staging";
	if (process.env.EXPO_PUBLIC_APP_VARIANT === "dev")
		return "com.teamdiverse.dife.dev";
	return "com.teamdiverse.dife";
};

export default {
	expo: {
		name: "Dife",
		slug: "dife",
		version: "1.0.0",
		owner: "team-diverse",
		orientation: "portrait",
		icon: "src/assets/icon.png",
		userInterfaceStyle: "light",
		splash: {
			image: "src/assets/splash.png",
			resizeMode: "cover",
			backgroundColor: "#ffffff",
		},
		assetBundlePatterns: ["**/*"],
		ios: {
			supportsTablet: true,
			bundleIdentifier: getIOSBundleIdentifier(),
			infoPlist: {
				CFBundleDisplayName: getAppName(),
				UIBackgroundModes: ["fetch", "remote-notification"],
			},
		},
		android: {
			package: getAndroidPackage(),
			adaptiveIcon: {
				foregroundImage: "src/assets/adaptive-icon.png",
				backgroundColor: "#ffffff",
			},
		},
		web: {
			favicon: "src/assets/icon.png",
		},
		extra: {
			eas: {
				projectId: "7ec133fc-2004-4a77-9b59-25d22dede97b",
			},
		},
		runtimeVersion: {
			policy: "appVersion",
		},
		updates: {
			url: "https://u.expo.dev/7ec133fc-2004-4a77-9b59-25d22dede97b",
		},
		plugins: [
			"expo-secure-store",
			[
				"@sentry/react-native/expo",
				{
					url: "https://sentry.io/",
					enabled: false,
				},
			],
			"expo-localization",
		],
	},
};
