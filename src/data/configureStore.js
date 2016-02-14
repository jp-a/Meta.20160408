import * as types from './constants/ActionTypes';
import PouchMiddleware from './middleware/pouch-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import PouchDB from 'pouchdb';
import PouchSync from 'pouch-websocket-sync';

import { Router, Route, browserHistory } from 'react-router'
import { syncHistory, routeReducer } from 'react-router-redux'

import DevTools from '../containers/DevTools';

window.PouchDB = PouchDB;

const syncEvents = [ 'change', 'paused', 'active', 'denied', 'complete', 'error' ];
const clientEvents = [ 'connect', 'disconnect', 'reconnect' ];

let initialState = {
    nodes: [],
    syncState: {
        text: 'unknown'
    }
};


export default function configureStore() {

    const db = new PouchDB( 'nodes' );

    const syncClient = PouchSync.createClient();

    const sync = syncClient.sync( db, {
        remoteName: 'nodes-server'
    } );

    syncClient.connect( 'ws://localhost:3010' ).on( 'error', function ( err ) {
        console.log( err );
    } );

    syncEvents.forEach( function ( event ) {
        sync.on( event, function () {
            store.dispatch( { type: types.SET_SYNC_STATE, text: event } );
        } )
    } );

    clientEvents.forEach( function ( event ) {
        syncClient.on( event, function () {
            store.dispatch( { type: types.SET_SYNC_STATE, text: event } );
        } )
    } );

    const pouchMiddleware = PouchMiddleware( {
        path: '/nodes',
        db,
        actions: {
            insert: doc => { store.dispatch( { type: types.INSERT_NODE, node: doc } ) },
            update: doc => { store.dispatch( { type: types.UPDATE_NODE, node: doc } ) },
            remove: doc => { store.dispatch( { type: types.DELETE_NODE, id: doc._id } ) },
        }
    } );

    const reduxRouterMiddleware = syncHistory( browserHistory );

    const enhancer = compose (
        applyMiddleware( pouchMiddleware, reduxRouterMiddleware )
        // , DevTools.instrument()
        , window.devToolsExtension ? window.devToolsExtension() : f => f
    );

    const store = window.store = createStore( rootReducer, initialState, enhancer );

    // Required for replaying actions from devtools to work
    reduxRouterMiddleware.listenForReplays( store );

    if ( module.hot ) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept( './reducers', () => store.replaceReducer( require( './reducers' ) ) )
    }

    return store
}
