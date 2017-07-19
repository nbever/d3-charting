const webpack = require( 'webpack' );
const path = require( 'path' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const UglifyJSPlugin = require( 'uglifyjs-webpack-plugin' );
const ExtractTextPlugin = require( "extract-text-webpack-plugin" );

const extractSass = new ExtractTextPlugin( "charting.css" );

var build_dir = path.resolve( __dirname, 'build' );
var app_dir = path.resolve( __dirname, 'src' );

var config = {
  entry: app_dir + '/main.js',
  devtool: "source-map",
  output: {
    path: build_dir,
    filename: 'charting.js'
  },
  module: {
    rules: [ {
        test: /\.js$/,
        include: app_dir,
        use: {
          loader: 'babel-loader',
          options: {
            "presets": [ "es2015", "react", "stage-1" ],
            "plugins": [ "transform-decorators-legacy" ]
          }
        }
      },
      {
        test: /\.scss$/,
        include: app_dir,
        use: extractSass.extract( {
          use: [ {
              loader: "css-loader"
            },
            {
              loader: "sass-loader"
            }
          ],
          // use style-loader in development
          fallback: "style-loader"
        } )
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      },
      {
        test: /\.(jpg|png|svg|gif)$/,
        include: app_dir + '/images',
        loader: 'file-loader?name=images/[name].[ext]'
      },
      {
      test: /tests\.js$/,
      use: 'mocha-loader',
      exclude: /node_modules/,
    }
    ]
  },
  devServer: {
    contentBase: build_dir,
    compress: true,
    port: 9010,
    watchContentBase: true
  },
  plugins: [
    new HtmlWebpackPlugin( {
      title: "Charting POC",
      template: app_dir + '/index.html.ejs'
    } ),
    new webpack.ProvidePlugin( {
      $: 'jquery',
      _: 'lodash',
      jQuery: 'jquery'
    } ),
    extractSass,
    new UglifyJSPlugin(),
  ]
}

module.exports = config;