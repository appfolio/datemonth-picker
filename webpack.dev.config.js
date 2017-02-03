'use strict';

/**
 * Development-only webpack settings.
 */
const webpack = require('webpack');
const config = require('./webpack.config');
const Visualizer = require('webpack-visualizer-plugin');

config.devtool = 'cheap-module-eval-source-map';
config.entry.unshift('webpack-hot-middleware/client');
config.plugins = [
  new Visualizer(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('development')
    }
  })
];

module.exports = config;
