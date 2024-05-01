module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            "@components": "./src/components/",
            "@pages": "./src/pages/",
            "@assets": "./src/assets",
            "@styles": "./src/styles",
          },
        },
      ],
    ],
  };
};
