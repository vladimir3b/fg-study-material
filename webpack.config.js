const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");

module.exports = {
  mode: 'development',
  watch: true,
  entry: {
    style01: './project/_sources/scss/lesson01.scss',
    style02: './project/_sources/scss/lesson02.scss',
    script01: './project/_sources/ts/lesson01.ts',
    script02: './project/_sources/ts/lesson02.ts'
  },
  plugins: [
    new FixStyleOnlyEntriesPlugin({ extensions: ['scss', 'css'] }),
    new MiniCssExtractPlugin({
      filename: '../css/[name].css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['./node_modules']
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './project/public/js')
  }
};