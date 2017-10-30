const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const commonConfig = require('./webpack.common.js');
const CompressionPlugin = require('compression-webpack-plugin');
const path = require('path');

//const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {
    output: {
        filename: "[name].js",
        path: path.join(__dirname, '../wwwroot'),
        publicPath: "../"
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify('production')
            }
        }),
        //new webpack.LoaderOptionsPlugin({
        //    minimize: true,
        //    debug: false,
        //    htmlLoader: {
        //        minimize: true // workaround for ng2
        //    }
        //}),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            beautify: false,
            comments: false,
            compress: {
                warnings: false,
                drop_console: true,
                screw_ie8: true
            },
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            output: {
                comments: false,
                screw_ie8: true
            },
            minimize: true,
            exclude: [/\.min\.js$/gi] // skip pre-minified libs
        }),
        new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.js$|\.css$|\.html$/,
            threshold: 0,
            minRatio: 0.8
        })
    ],
    devServer: {
        historyApiFallback: true,
        stats: 'minimal'
    }
});
