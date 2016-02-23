var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: [
        'babel-polyfill',
        './src/main'
    ],
    output: {
        publicPath: '/',
        filename: 'main.js'
    },
    devtool: 'source-map',
    devServer: {
        contentBase: "./src",
        port: "7777"
    },
    resolve: {
        alias: {
            angular: path.join(__dirname, './node_modules/angular/angular.js')
        }
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: path.join(__dirname, 'src'),
                exclude: /node_modules|bower_components/,
                loader: 'babel-loader',
                query: {
                    presets: ["es2015"]
                }
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            }, // use ! to chain loaders
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    },
    debug: true
};