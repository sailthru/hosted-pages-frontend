const { merge } = require('webpack-merge');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const pkg = require('../package.json');
const buildConfig = require('./webpack.build');

const port = pkg.config.dev_server_port;
const basePath = `http://localhost:${port}`;

// Extend the base config with devServer configuration
module.exports = merge(buildConfig({ basePath }), {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    devServer: {
        port: pkg.config.dev_server_port,
        hot: true,
        headers: {
            'Access-Control-Allow-Origin': 'http://my.sailthru-sb.com', // required for HMR // FIXME is this needed? HMR doesn't work
        },
        client: {
            overlay: true,
            progress: true,
        },
        allowedHosts: 'all',
    },
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.jsx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            plugins: [
                                'react-refresh/babel' // https://www.npmjs.com/package/@pmmmwh/react-refresh-webpack-plugin
                            ],
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new ReactRefreshWebpackPlugin(),
    ],
});
