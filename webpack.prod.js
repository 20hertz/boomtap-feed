const {merge} = require('webpack-merge');
const glob = require('glob');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const common = require('./webpack.common.js');

const PATHS = {
    src: path.join(__dirname, 'src')
}

function collectSafelist() {
    return {
        standard: ['swiper-pagination-bullet'],
        greedy: [/^swiper-/]
    }
}

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.s?[ac]ss$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                url: false, sourceMap: true,
                                plugins: [
                                    ['autoprefixer'],
                                    ['cssnano', {
                                        preset: 'default'
                                    }]
                                ],
                                minimize: true,
                            },
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            publicPath: 'img/',
                            outputPath: 'img/',
                            esModule: false
                        },
                    },

                ],
            },
            {
                test: /\.(ttf|eot|woff|woff2|svg)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        publicPath: 'fonts/',
                        outputPath: 'fonts/',
                        esModule: false
                    },
                },
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.[contenthash].css',
        }),
        new PurgecssPlugin({
            paths: glob.sync(`${PATHS.src}/**/*`, {nodir: true}),
            safelist: collectSafelist
        }),
    ]
});