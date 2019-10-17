const webpack = require('webpack');
const path = require('path');
const config = require(`${__dirname}/build.config.js`);

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, 'src', 'index.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: "company/dist/",
        filename: 'main.js'
    },
    mode: process.env.NODE_ENV || 'development',
    resolve: {
        modules: [path.resolve(__dirname, 'src'), 'node_modules']
    },
    devServer: {
        contentBase: path.join(__dirname, 'src')
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader']
        },
            {
                test: /\.(css|scss)$/,
                use: [{
                    loader: 'style-loader',
                }, {
                    loader: 'css-loader',
                }, {
                    loader: 'postcss-loader',
                    options: {
                        plugins: function() {
                            return [
                                require('autoprefixer')
                            ];
                        }
                    }
                }, {
                    loader: 'resolve-url-loader'
                },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }]
            }, {
                test: /\.(pdf|png|jpe?g)$/i,
                use: ['file-loader', {loader: 'image-webpack-loader'}]
            }
        ]
    },
    devServer: {
        contentBase: __dirname + '/src',
        overlay: true,
        historyApiFallback: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.html')
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        new MomentLocalesPlugin({
            localesToKeep: ['ru']
        }),
        new webpack.ProvidePlugin({
            'moment': 'moment',
            'jQuery': 'jquery',
            '$': 'jquery',
            'window.$': 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default']
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, config.folders.source_root, config.folders.resources, config.folders.images),
                to: path.resolve(__dirname, config.folders.output, config.folders.resources, config.folders.images)
            }
        ]),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, config.folders.source_root, config.folders.resources),
                to: path.resolve(__dirname, config.folders.output, config.folders.resources)
            }
        ])
    ]
};
