module.exports = function (api) {
	api.cache(false);
	return {
		presets: ["babel-preset-expo"],
		plugins: [
			[
				"module-resolver",
				{
					root: ["."],
					alias: {
						"@components": "./src/components/",
						"@pages": "./src/pages/",
						"@assets": "./src/assets",
						"@styles": "./src/styles",
					},
				},
			],
			"react-native-reanimated/plugin",
			[
				"module:react-native-dotenv",
				{
					envName: "LOCAL_ENV",
					moduleName: "@env",
					path: ".evn.local",
					allowUndefined: false,
				},
			],
		],
	};
};
