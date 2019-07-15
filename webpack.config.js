const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");

const NUMBER_OF_PAGES = require('./config.json').numberOfPages;

function twoDigits(number) {
  return (number <= 9)? `0${number}` : `${number}`;
}

function generateEntries() {
  const obj = {}
  for (let i = 1; i <= NUMBER_OF_PAGES; i++) {
    obj[`style0${i}`] = `./project/_sources/scss/lesson${twoDigits(i)}.scss`;
    obj[`script0${i}`] = `./project/_sources/ts/lesson${twoDigits(i)}.ts`;
  }
  return obj;
}

module.exports = {
  mode: 'development',
  watch: true,
  entry: {
    ...generateEntries(),
    'fonts': './project/_sources/scss/fonst.scss'
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