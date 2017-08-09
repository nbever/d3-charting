var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var typingsForCssModules = require('typings-for-css-modules-loader');
var extractSass = new ExtractTextPlugin('charting.css');
var buildDir = path.resolve(__dirname, 'build');
var appDir = path.resolve(__dirname, 'src');
var testDir = path.resolve(__dirname, 'tests');
var config = {
    entry: appDir + "/main.tsx",
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },
    output: {
        path: buildDir,
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
                include: appDir,
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
                include: testDir,
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
                include: appDir,
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
                include: appDir + "/images",
                loader: 'file-loader?name=images/[name].[ext]',
            },
        ],
    },
    devServer: {
        contentBase: buildDir,
        compress: false,
        port: 9010,
        watchContentBase: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Charting POC',
            template: appDir + "/index.html.ejs",
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            _: 'lodash',
            jQuery: 'jquery',
        }),
        extractSass,
    ],
};
module.exports = config;
//# sourceMappingURL=webpack.config.js.map