const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const webpackConfig = require('./webpack.config')

module.exports = webpackMerge(webpackConfig, {
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsWebpackPlugin()
  ]
})
