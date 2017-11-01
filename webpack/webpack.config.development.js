const { resolve } = require('path')
const webpack = require('webpack');
const Config = require('webpack-config').default;
//const DashboardPlugin = require('webpack-dashboard/plugin');
const webpackBaseConfig = require('./webpack.config.base');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = new Config().extend('webpack/webpack.config.base').merge({

  devtool: 'eval',

  entry: {
    main: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?reload=true',
      './../src/js/index'
    ],
  },

  output: {
    filename: '[name].js',
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.MUSEREUM_BASE_URL': JSON.stringify('https://tokensale.musereum.org:8443')
    }),
    //new DashboardPlugin()
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
      /*
      use: [
        'classnames-loader',
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2,
            localIdentName: '[local]---[name]---[hash:base64:5]'
          }
        },
        'stylus-loader',
        'postcss-loader'
      ]
      */
    }]
  },

  performance: { hints: false }
});
