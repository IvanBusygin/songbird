// const webpack = require('webpack');

const baseConfig = require('./base.config');
const pluginsConfig = require('./plugins.config');

const allConfig = {
  ...baseConfig,
  ...pluginsConfig,
};

module.exports = allConfig;
