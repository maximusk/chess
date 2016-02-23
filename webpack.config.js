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
            jquery: path.join(__dirname, './bower_components/jquery/dist/jquery.js'),
            jqueryUi: path.join(__dirname, './bower_components/jquery-ui/jquery-ui.js'),
            angular: path.join(__dirname, './node_modules/angular/angular.js'),
            angularDragDrop: path.join(__dirname, './bower_components/angular-dragdrop/src/angular-dragdrop.js')
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            _: "lodash",
            jQuery: "jquery"
        })
    ],
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