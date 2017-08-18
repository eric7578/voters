const webpack = require('webpack')
const path = require('path')

const entryPath = path.resolve(__dirname, 'web/src/main.jsx')
const jsDir = path.resolve(__dirname, './static/js')

module.exports = {
  entry: [
    'babel-polyfill',
    entryPath
  ],
  output: {
    path: jsDir,
    filename: 'bundle.js',
    publicPath: '/js/'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: [
          'node_modules'
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]
}
