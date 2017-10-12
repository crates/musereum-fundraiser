const { resolve } = require('path');
const webpack = require('webpack');
const Config = require('webpack-config').default;
//const DashboardPlugin = require('webpack-dashboard/plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = new Config().extend('webpack/webpack.config.base').merge({

  devtool: 'source-map',

  entry: {
    main: [
      './../src/js/index'
    ],
  },

  output: {
    filename: '[name].[chunkhash].js'
  },

  plugins: [
    //new DashboardPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        join_vars: true,
        if_return: true
      },
      output: {
        comments: false
      }
    }),
    new ExtractTextPlugin({ filename: 'css/[name].[contenthash].css', allChunks: true })
  ],

  module: {
    rules: [{
      test: /\.(css|styl)$/,
      use: ['classnames-loader'].concat(
        ExtractTextPlugin.extract({
          fallback: [
            'style-loader'
          ],
          use: [
            'css-loader',
            'stylus-loader',
            'postcss-loader'
          ]
        })
      )
    }]
  },

});
