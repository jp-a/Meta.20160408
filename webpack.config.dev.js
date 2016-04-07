var path = require( 'path' );
var webpack = require( 'webpack' );

module.exports = {
    devtool: 'source-map',
    //devtool: 'eval-source-map',
    // devtool: 'eval-cheap-module-source-map',
    // devtool: 'eval-cheap-source-map',
    // devtool: 'eval',
    resolve: {
        extensions: [ '', '.js', '.css', '.gstyl', '.styl' ]
    },
    entry: [
        'eventsource-polyfill', // necessary for hot reloading with IE
        'webpack-hot-middleware/client',
        './src/index'
    ],
    output: {
        path: path.join( __dirname, 'dist' ),
        pathinfo: path.join( __dirname, 'src' ),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?/,
                loaders: [ 'babel' ],
                exclude: /node_modules/,
                include: path.join( __dirname, 'src' )
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.gstyl$/,
                loader: 'style-loader!css-loader!stylus-loader'
            },
            {
                test: /\.styl$/,
                // loader: 'style-loader!css-loader!stylus-loader'
                loaders: [
                    'style-loader',
                    'css-loader?modules&importLoaders=2&sourceMap&localIdentName=[name]__[local]___[hash:base64:5]',
                    'stylus-loader?outputStyle=expanded&sourceMap'
                ]
            },
            {
                test: /masonry|imagesloaded|fizzy\-ui\-utils|desandro\-|outlayer|get\-size|doc\-ready|eventie|eventemitter/,
                loader: 'imports?define=>false&this=>window'
            }
        ]
    }
};
