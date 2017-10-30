const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    entry: {
        polyfills: './src/polyfills.ts',
        vendor: './src/vendor.ts',
        app: './src/main.ts'
    },
    
    resolve: {
        extensions: ['.ts', '.js']
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            // specify your tsconfig.json file
                            configFileName: "./tsconfig.json"
                        }
                    },
                    'angular2-template-loader'
                ]
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file-loader?name=assets/[name].[ext]'
            },
            //{
            //    test: /\.(css|scss)$/,
            //    exclude: [/\main\.scss$/],
            //    use: ['raw-loader', {
            //        loader: 'sass-loader',
            //        options: {
            //            sourceMap: true,
            //        }
            //    }]
            //},
            {
                test: /\.(scss)$/,
                //loaders: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: "to-string-loader"
                        },
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: false,
                                minimize: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: false,
                                minimize: true
                            }
                        }
                    ]
                //})
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            filename: "../Views/Shared/_LayoutTemplate.cshtml",
            template: "Views/Shared/_Layout.cshtml",
        }),
        new CleanWebpackPlugin(
            [
                'wwwroot/*'
            ],
            {
                root: path.join(__dirname, '../')
            }
        ),
        new ExtractTextPlugin({ "filename": "style.css", "allChunks": true }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),
        //new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery' }),
        new webpack.ContextReplacementPlugin(/\@angular\b.*\b(bundles|linker)/, path.join(__dirname, './src')), // Workaround for https://github.com/angular/angular/issues/11580
        new webpack.ContextReplacementPlugin(/angular(\\|\/)core(\\|\/)@angular/, path.join(__dirname, './src')), // Workaround for https://github.com/angular/angular/issues/14898
        new webpack.IgnorePlugin(/^vertx$/) // Workaround for https://github.com/stefanpenner/es6-promise/issues/100
    ]
};
