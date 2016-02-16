var path = require( 'path' );
var express = require( 'express' );
var webpack = require( 'webpack' );
var config = require( './webpack.config.dev' );

var app = express();
var compiler = webpack( config );

app.use( require( 'webpack-dev-middleware' )( compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
} ) );

app.use( require( 'webpack-hot-middleware' )( compiler ) );

app.get( '*', function ( req, res ) {
    res.sendFile( path.join( __dirname, 'index.html' ) );
} );

app.listen( 3000, 'localhost', function ( err ) {
    if ( err ) {
        console.error( err );
        return;
    }

    console.info( '[Meta|Server ] http://%s:%s', 'localhost', 3000 );
} );


// https://github.com/pgte/pouch-websocket-sync

const http = require( 'http' );
const PouchDB = require( 'pouchdb' );
const PouchSync = require( 'pouch-websocket-sync' );

const server = http.createServer();
const wss = PouchSync.createServer( server, onRequest );

wss.on( 'error', function ( err ) {
    console.error( err.stack );
} );

const db = new PouchDB( 'var/nodes-server' );

server.listen( 3010, function () {
    // console.info( '[Meta|PouchDB] ws://' + server.address().address + ':' + server.address().port );
} );

function onRequest( credentials, dbName, callback ) {
    if ( dbName == 'nodes-server' ) {
        callback( null, db );
    } else {
        callback( new Error( 'database not allowed' ) );
    }
}
