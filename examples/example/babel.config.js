/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
  }
}
