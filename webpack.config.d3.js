var path = require( 'path' );
var webpack = require( 'webpack' );

module.exports = {
    devtool: 'source-map',

    // devtool: 'eval-source-map',
    // devtool: 'eval-cheap-module-source-map',
    // devtool: 'eval-cheap-source-map',
    // devtool: 'eval',
    resolve: {
        extensions: [ '', '.js' ]
    },
    entry: [
        'eventsource-polyfill', // necessary for hot reloading with IE
        'webpack-hot-middleware/client',
        './src/d3'
    ],
    output: {
        path: path.join( __dirname, 'dist' ),
        pathinfo: path.join( __dirname, 'src' ),
        filename: 'd3Bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        // new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?/,
                loaders: [ 'babel' ],
                exclude: /node_modules/,
                include: path.join( __dirname, 'src' )
            }
        ]
    }
};
