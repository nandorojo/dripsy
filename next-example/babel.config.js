// @generated: @expo/next-adapter@2.1.0
// Learn more: https://github.com/expo/expo/blob/master/docs/pages/versions/unversioned/guides/using-nextjs.md#shared-steps

module.exports = {
  presets: ['@expo/next-adapter/babel'],
  env: {
    development: {
      plugins: [
        [
          'styled-components',
          { ssr: true, displayName: true, preprocess: false },
        ],
      ],
      presets: ['@expo/next-adapter/babel'],
    },
    production: {
      plugins: [
        [
          'styled-components',
          { ssr: true, displayName: true, preprocess: false },
        ],
      ],
      presets: ['@expo/next-adapter/babel'],
    },
  },
  plugins: [
    ['styled-components', { ssr: true, displayName: true, preprocess: false }],
  ],
};
