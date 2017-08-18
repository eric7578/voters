const webpack = require('webpack')
const path = require('path')
const webpackDevMiddleware = require('webpack-dev-middleware')

const devConfigPath = path.resolve(process.cwd(), './webpack.config.dev.js')
const webpackConfig = require(devConfigPath)
const compiler = webpack(webpackConfig)

module.exports = app => {
  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    // for friendly output
    quiet: true
  }))
}
