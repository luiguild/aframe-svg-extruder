const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')

const config = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    browser: './index.js'
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.min.js',
    sourceMapFilename: '[file].map'
    // libraryTarget: 'commonjs-module'
  },
  module: {
    rules: [{
      test: /\.js$/,
      include: path.resolve(__dirname, 'src'),
      use: [{
        loader: 'babel-loader',
      }]
    }]
  },
  plugins: [
    new UglifyJSPlugin({
      compress: true,
      comments: false,
      mangle: true,
      sourceMap: true
    })
  ]
}

module.exports = config
