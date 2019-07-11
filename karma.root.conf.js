/*global require*/
const path = require('path');
const webpack = require('webpack');
const { resolveApp, resolvePackage } = require(`./pathResolveHelper`);

const {
    NODE_ENV = `development`
} = process.env;

module.exports = function(config) {
    return {
        files: [
            'node_modules/babel-polyfill/dist/polyfill.min.js',
            resolvePackage('@moedelo/karma-config/test-setup.js'),
            '**/*.test.js'
        ],

        exclude: ['**/node_modules/**/*.test.js'],

        frameworks: ['mocha', 'chai', 'sinon'],

        logLevel: config.LOG_INFO, //config.LOG_DISABLE, // config.LOG_INFO
        singleRun: true,

        preprocessors: {
            '**/*.test.js': ['webpack']
        },

        reporters: ['mocha'],

        webpack: {
            mode: NODE_ENV,
            module: {
                rules: [
                    {
                        test: /\.js$/,
                        exclude: /.*node_modules((?!@moedelo).)*$/,
                        use: {
                            loader: resolvePackage(`babel-loader`),
                            query: {
                                presets: [
                                    resolvePackage(`@babel/preset-react`),
                                    [resolvePackage(`@babel/preset-env`), {
                                        modules: false,
                                        targets: {
                                            esmodules: false
                                        }
                                    }],
                                    resolvePackage(`@babel/preset-flow`)
                                ],
                                plugins: [
                                    [resolvePackage(`@babel/plugin-proposal-decorators`), { legacy: true }],
                                    [resolvePackage(`@babel/plugin-proposal-class-properties`), { loose: true }],
                                    resolvePackage(`@babel/plugin-proposal-export-default-from`),
                                    resolvePackage(`@babel/plugin-syntax-dynamic-import`),
                                    resolvePackage(`@babel/plugin-proposal-optional-chaining`)
                                ]
                            }
                        }
                    },
                    { test: /\.json$/, loader: 'json-loader' },
                    { test: /\.less$/, loader: 'null-loader' },
                    { test: /\.(jpe?g|png|gif)|(?!\.m)(?!\.i)..\.svg$/i, loader: 'null-loader' },
                    { test: /\.(mp4)$/i, loader: 'null-loader' },
                    { test: /\.hbs$/, loader: 'handlebars-loader' },
                    {
                        test: /\.m\.svg$/,
                        loader: 'svg-sprite-loader',
                        options: {
                            symbolId: '[name]__[hash]'
                        }
                    },
                    {
                        test: /\.i\.svg$/,
                        loader: 'svg-inline-loader',
                        options: {
                            classPrefix: true
                        }
                    }
                ],
            },
            resolveLoader: {
                modules: [
                    path.resolve(__dirname, `./node_modules`),
                    resolveApp(`./node_modules`)
                ],
            },
            resolve: {
                modules: [
                    path.resolve(__dirname, `./node_modules`),
                    resolveApp(`./node_modules`)
                ],
                alias: {
                    mdEnzyme: path.resolve(__dirname, './mdEnzyme.js')
                }
            },
            plugins: [
                new webpack.DefinePlugin({
                    IS_SERVER: false
                })
            ]
        },
        webpackMiddleware: {
            noInfo: true,
        },
        plugins: [
            require('karma-teamcity-reporter'),
            require('karma-webpack'),
            require('karma-mocha'),
            require('karma-chai'),
            require('karma-sinon'),
            require('karma-mocha-reporter'),
            require('karma-chrome-launcher')
        ],

        browsers: ['ChromeHeadless']
    }
};
