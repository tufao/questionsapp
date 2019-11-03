const webpack = require('webpack');

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        DEBUG: process.env.DEBUG
      })
    ]
  }
};
