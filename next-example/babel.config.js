/* eslint-disable @typescript-eslint/no-var-requires */
// @generated: @expo/next-adapter@2.1.0
// Learn more: https://github.com/expo/expo/blob/master/docs/pages/versions/unversioned/guides/using-nextjs.md#shared-steps
const path = require('path')
const pak = require('../package.json')

module.exports = {
  presets: ['@expo/next-adapter/babel'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          // For development, we want to alias the library to the source
          [pak.name]: path.join(__dirname, '..', pak.source),
        },
      },
    ],
  ],
}
