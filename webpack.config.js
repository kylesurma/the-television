'use strict'

const { resolve } = require('path')

module.exports = {
  entry: ['babel-polyfill', './app/main'],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  mode: 'development',
  context: __dirname,
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /jsx?$/,
        include: resolve(__dirname, './app'),
        loader: 'babel-loader'
      },
      // {
      //   test: /\.s[ac]ss$/i,
      //   use: [
      //     // Creates `style` nodes from JS strings
      //     "style-loader",
      //     // Translates CSS into CommonJS
      //     "css-loader",
      //     // Compiles Sass to CSS
      //     "sass-loader",
      //   ],
      // },

      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
}
