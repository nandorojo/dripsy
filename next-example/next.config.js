/* eslint-disable @typescript-eslint/no-var-requires */
// @generated: @expo/next-adapter@2.1.0
// Learn more: https://github.com/expo/expo/blob/master/docs/pages/versions/unversioned/guides/using-nextjs.md#withexpo
const withPlugins = require('next-compose-plugins')
const withTM = require('next-transpile-modules')([])
const { withExpo } = require('@expo/next-adapter')
const path = require('path')

const nodeModules = path.join(__dirname, 'node_modules')

const pak = require('../package.json')
const root = path.resolve(__dirname, '..')
const modules = Object.keys({
  ...pak.peerDependencies,
})

module.exports = withPlugins(
  [withTM({})],
  withExpo({
    projectRoot: __dirname,
    webpack: async (config, options) => {
      config.module.rules.push({
        test: /\.(js|ts|tsx)$/,
        include: path.resolve(root, 'src'),
        use: 'babel-loader',
      })

      Object.assign(config.resolve.alias, {
        ...modules.reduce((acc, name) => {
          acc[name] = path.join(__dirname, 'node_modules', name)
          return acc
        }, {}),
        'react-native-web': path.join(nodeModules, 'react-native-web'),
      })

      return config
    },
  })
)
