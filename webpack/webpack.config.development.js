const { resolve } = require('path')
const webpack = require('webpack');
const Config = require('webpack-config').default;
//const DashboardPlugin = require('webpack-dashboard/plugin');
const webpackBaseConfig = require('./webpack.config.base');

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
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    //new DashboardPlugin()
  ],

  module: {
    rules: [{
      test: /\.(css|styl)$/,
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
    }]
  },

  performance: { hints: false }
});
