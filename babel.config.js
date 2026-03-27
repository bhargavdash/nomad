module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@theme': './src/theme',
            '@components': './src/components',
            '@screens': './src/screens',
            '@navigation': './src/navigation',
            '@data': './src/data',
            '@store': './src/store',
            '@hooks': './src/hooks',
            '@utils': './src/utils',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
