/*global require*/
const path = require('path');

module.exports = function(config) {
    return {
        files: [
            'node_modules/babel-polyfill/dist/polyfill.min.js',
            'node_modules/@moedelo/karma-config/test-setup.js',
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
            module: {
                rules: [
                    {
                        test: /\.js$/,
                        loader: 'babel-loader',
                        exclude: /node_modules(?!\/@moedelo)/,
                        query: {
                            presets: [
                                'react',
                                ["es2015", { "modules": false }],
                                'stage-0',
                                'airbnb'
                            ],
                            plugins: ["transform-decorators-legacy", "transform-class-properties"]
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
            resolve: {
                alias: {
                    mdEnzyme: path.resolve(__dirname, './mdEnzyme.js')
                }
            }
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
