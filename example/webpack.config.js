/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const createExpoWebpackConfigAsync = require('@expo/webpack-config')

const root = path.resolve(__dirname, '..')
const nodeModules = path.resolve(__dirname, 'node_modules')

module.exports = async function(env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv)

  config.module.rules.push({
    test: /\.(js|ts|tsx)$/,
    include: path.resolve('../src'),
    use: 'babel-loader',
  })

  Object.assign(config.resolve.alias, {
    react: path.join(nodeModules, 'react'),
    'react-native-web': path.join(nodeModules, 'react-native-web'),
    // dripsy: path.join(root, require('../package.json').source),
  })

  return config
}
