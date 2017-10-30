const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const commonConfig = require('./webpack.common.js');
const path = require('path');

module.exports = webpackMerge(commonConfig, {
    devtool: 'source-map',
    output: {
        filename: "[name].js",
        path: path.join(__dirname, '../wwwroot'),
        publicPath: "../"
    },
    plugins: [
        
    ],

    devServer: {
        historyApiFallback: true,
        stats: 'minimal'
    }
});
