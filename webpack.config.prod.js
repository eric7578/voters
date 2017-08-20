const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const webpackConfig = require('./webpack.config')

module.exports = webpackMerge(webpackConfig, {
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ]
})
