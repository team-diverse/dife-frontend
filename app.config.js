const IS_STAGING = process.env.EXPO_PUBLIC_APP_VARIANT === "staging";

export default {
	expo: {
		name: IS_STAGING ? "Dife(Staging)" : "Dife",
		slug: "dife",
		version: "1.0.0",
		owner: "team-diverse",
		orientation: "portrait",
		icon: "src/assets/icon.png",
		userInterfaceStyle: "light",
		splash: {
			image: "src/assets/splash.png",
			resizeMode: "contain",
			backgroundColor: "#ffffff",
		},
		assetBundlePatterns: ["**/*"],
		ios: {
			supportsTablet: true,
			bundleIdentifier: IS_STAGING
				? "com.teamdiverse.dife.staging"
				: "com.teamdiverse.dife",
			config: {
				usesNonExemptEncryption: false,
			},
		},
		android: {
			adaptiveIcon: {
				foregroundImage: "src/assets/adaptive-icon.png",
				backgroundColor: "#ffffff",
			},
		},
		web: {
			favicon: "src/assets/favicon.png",
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
				},
			],
		],
	},
};
