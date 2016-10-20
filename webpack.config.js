const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        once: './once.js',
        flame: './flame.js'
    },
    output: {
        path: path.join(__dirname, 'compiled'),
        filename: '[name].js'
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: 'style!css'}
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ]
};
