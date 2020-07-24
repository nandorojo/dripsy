/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const createExpoWebpackConfigAsync = require('@expo/webpack-config')
const { resolver } = require('./metro.config')

const root = path.resolve(__dirname, '..')
const nodeModules = path.join(__dirname, 'node_modules')

module.exports = async function(env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv)

  config.module.rules.push({
    test: /\.(js|ts|tsx)$/,
    include: path.resolve(root, 'src'),
    use: 'babel-loader',
  })

  // We need to make sure that only one version is loaded for peerDependencies
  // So we alias them to the versions in example's node_modules
  Object.assign(config.resolve.alias, {
    ...resolver.extraNodeModules,
    'react-native-web': path.join(nodeModules, 'react-native-web'),
  })

  return config
}
