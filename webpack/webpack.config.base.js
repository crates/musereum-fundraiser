const { resolve } = require('path');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const Config = require('webpack-config').default;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = new Config().merge({
  context: resolve(__dirname, '../src'),
  entry: {
    'vendor': [
      // js
      'lodash',
      'react',
      'redux',
      'selectn',
      'reselect',
      'react-dom',
      'normalizr',
      'classnames',
      'react-redux',
      'redux-thunk',
      'react-router',
      'react-router-redux',
      'redux-combine-actions',
    ]
  },
  output: {
    path: resolve(__dirname, '../dist/'),
    publicPath: '/'
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        eslint: {
          reporter: require("eslint-friendly-formatter"),
          quiet: true,
          failOnError: false,
          failOnWarning: false,
          emitError: false,
          emitWarning: false
        },
        stylus: {
          use: [require('nib')()],
          import: ['~nib/lib/nib/index.styl']
        },
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    }),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: resolve(__dirname, '../src/assets/index.html'),
      //favicon: path.join(__dirname, 'src/assets/favicon.ico')
    }),
    /*
    new CopyWebpackPlugin([{
        from: path.join(__dirname, 'src/assets/icons'),
        to: 'icons'
    }])
    */
  ],
  resolve: {
    extensions: ['.js', '.css', '.svg'],
    modules: [
      'node_modules'
    ],
    alias: {
      'config': resolve(__dirname, '../config'),

      'src': resolve(__dirname, '../src'),

      'css': resolve(__dirname, '../src/css'),
      'img': resolve(__dirname, '../src/img'),
      'store': resolve(__dirname, '../src/js/store'),
      'utils': resolve(__dirname, '../src/js/utils'),

      'actions': resolve(__dirname, '../src/js/actions'),
      'reducers': resolve(__dirname, '../src/js/reducers'),
      'selectors': resolve(__dirname, '../src/js/selectors'),
      'constants': resolve(__dirname, '../src/js/constants'),

      'containers': resolve(__dirname, '../src/js/containers'),
      'components': resolve(__dirname, '../src/js/components'),

      'middlewares': resolve(__dirname, '../src/js/middlewares')
    }
  },
  module: {
    rules: [
      /*
      // Eslint loader
      {
        enforce: "pre",
        test: /\.jsx?$/,
        include: path.join(__dirname, 'src'),
        loader: 'eslint-loader'
      },
      */
      {
        test: /\.js$/,
        include: [resolve(__dirname,'../src')],
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.(png|jpg|gif|svg|woff|woff2|eot|ttf)$/,
        loader: 'url-loader',
        options: {
          limit: 500000
        }
      }
    ]
  },
});
