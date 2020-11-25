/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-var-requires */
// @generated: @expo/next-adapter@2.1.0
// Learn more: https://github.com/expo/expo/blob/master/docs/pages/versions/unversioned/guides/using-nextjs.md#withexpo
const withPlugins = require('next-compose-plugins')
// const withTM = require('next-transpile-modules')(['dripsy'])
const { withExpo } = require('@expo/next-adapter')

// module.exports = withPlugins([withTM, [withExpo, { projectRoot: __dirname }]])

const path = require('path')
const fs = require('fs')
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin')

const node_modules = path.resolve(__dirname, '../..', 'node_modules')
const packages = path.resolve(__dirname, '../..', 'packages')

module.exports = withPlugins([
  withExpo({
    projectRoot: __dirname,
    webpack: (config) => {
      config.module.rules.push({
        test: /\.(js|ts|tsx)$/,
        include: /(packages|next-example)\/.+/,
        exclude: /node_modules/,
        use: 'babel-loader',
      })

      config.resolve.plugins = config.resolve.plugins.filter(
        (p) => !(p instanceof ModuleScopePlugin)
      )

      Object.assign(config.resolve.alias, {
        react: path.resolve(node_modules, 'react'),
        'react-native': path.resolve(node_modules, 'react-native-web'),
        'react-native-web': path.resolve(node_modules, 'react-native-web'),
        '@expo/vector-icons': path.resolve(node_modules, '@expo/vector-icons'),
      })

      fs.readdirSync(packages)
        .filter((name) => !name.startsWith('.'))
        .forEach((name) => {
          config.resolve.alias[
            name === 'dripsy' ? 'dripsy' : `@dripsy/${name}`
          ] = path.resolve(
            packages,
            name,
            require(`../../packages/${name}/package.json`).source
          )
        })

      return config
    },
  }),
])
