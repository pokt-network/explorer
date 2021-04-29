require('dotenv').config({
  path: `.env.${process.env.ENV}`
})

const webpack = require('webpack');
const envKeysWhitelist = require('./env-overrides');

module.exports = {
  webpack: (config, env) => {
    // custom babel-loader transform plugin for jsbi
    const loader = config
      .module
      .rules[2]
      .oneOf
      .filter(
        (rule) => rule.loader?.indexOf('babel-loader') > -1
      )
      .filter(
        (rule) => rule.options.plugins !== undefined
      )[0]

    loader
      .options
      .plugins
      .push('transform-jsbi-to-bigint')

    config.module.rules[2].oneOf.push(loader);

    // whitelistedEnv
    const whitelistedEnvsPlugin = new webpack.DefinePlugin({
      "process.env": envKeysWhitelist.reduce(
        (acc, k) => ({ [k]: JSON.stringify(process.env[k]), ...acc }),
        {}
      )
    });

    // look for for old defined env plugin and replace it with the new one
    config.plugins.forEach(
      ({ definitions }, i) => {
        if (definitions) {
          config.plugins[i] = whitelistedEnvsPlugin;
        }
      }
    )

    return config;
  }
}
