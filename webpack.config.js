const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const typingsForCssModules = require('typings-for-css-modules-loader');


const extractSass = new ExtractTextPlugin('charting.css');


const build_dir = path.resolve(__dirname, 'build');
const app_dir = path.resolve(__dirname, 'src');
const test_dir = path.resolve(__dirname, 'tests');


const config = {
  entry: `${app_dir}/main.tsx`,
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  output: {
    path: build_dir,
    filename: 'charting.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        include: app_dir,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react', 'stage-1'],
            plugins: ['transform-decorators-legacy'],
          },
        },
      },
      {
        test: /\.js$/,
        include: test_dir,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react', 'stage-1'],
            plugins: ['transform-decorators-legacy'],
          },
        },
      },
      // {
      //   test: /\.scss$/,
      //   include: app_dir,
      //   use: extractSass.extract({
      //     use: [{
      //       loader: 'css-loader',
      //     },
      //     {
      //       loader: 'sass-loader',
      //     },
      //     ],
      //     // use style-loader in development
      //     fallback: 'style-loader',
      //   }),
      // },
      {
        test: /\.scss$/,
        include: app_dir,
        use: extractSass.extract({
          use: [{
            loader: 'typings-for-css-modules-loader?module&namedExport&camelCase',
          },
          {
            loader: 'sass-loader',
          },
          ],
          // use style-loader in development
          fallback: 'style-loader',
        }),
      },
      {
        test: /\.css$/,
        include: path.join(__dirname, 'src/components'),
        use: [
          'style-loader',
          {
            loader: 'typings-for-css-modules-loader',
            options: {
              modules: true,
              namedExport: true,
              sass: true,
              camelCase: true,
            },
          },
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=fonts/[name].[ext]',
      },
      {
        test: /\.(jpg|png|svg|gif)$/,
        include: `${app_dir}/images`,
        loader: 'file-loader?name=images/[name].[ext]',
      },

    ],
  },
  devServer: {
    contentBase: build_dir,
    compress: false,
    port: 9010,
    watchContentBase: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Charting POC',
      template: `${app_dir}/index.html.ejs`,
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      _: 'lodash',
      jQuery: 'jquery',
    }),
    extractSass,
    // new UglifyJSPlugin(),
  ],
};

module.exports = config;
