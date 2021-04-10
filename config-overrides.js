module.exports = {
  webpack: (config, env) => {
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

    return config;
  }
}