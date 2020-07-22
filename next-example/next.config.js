// @generated: @expo/next-adapter@2.1.0
// Learn more: https://github.com/expo/expo/blob/master/docs/pages/versions/unversioned/guides/using-nextjs.md#withexpo
const withPlugins = require('next-compose-plugins')
const withTM = require('next-transpile-modules')([
  'dripsy',
  // 'styled-components',
  // 'styled-components/native',
])

const { withExpo } = require('@expo/next-adapter')

module.exports = withPlugins(
  [withTM],
  withExpo({
    projectRoot: __dirname,
  })
)
