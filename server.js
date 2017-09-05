const { resolve } = require('path');
const webpack = require('webpack');
const express = require('express');
const DashboardPlugin = require('webpack-dashboard/plugin');

const config = require('./webpack/webpack.config.development.js');

const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 8600;

const app = express();

const compiler = webpack(config);
/*
compiler.apply(
  new DashboardPlugin()
);
*/

const hot = require('webpack-hot-middleware')(compiler);
const dev = require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  // It suppress error shown in console, so it has to be set to false.
  quiet: false,
  // It suppress everything except error, so it has to be set to false as well
  // to see success build.
  noInfo: false,
  stats: {
    // Config for minimal console.log mess.
    assets: false,
    colors: true,
    version: false,
    hash: false,
    timings: false,
    chunks: false,
    chunkModules: false
  },
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
});

app.use(dev);
app.use(hot);

app.get('*', function (req, res, next) {
  const filename = resolve(compiler.outputPath, 'index.html');
  compiler.outputFileSystem.readFile(filename, function(err, result) {
    if (err) {
      return next(err);
    }
    res.set('content-type','text/html');
    res.send(result);
    res.end();
  });
});

app.listen(PORT, HOST, err => {
  if (err) {
    return console.error(err);
  }

  console.log(`Listening at http://${HOST}:${PORT}/`);
});