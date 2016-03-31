import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import { Provider, connect } from 'react-redux'
import { UserAuthWrapper } from 'redux-auth-wrapper'
import { routeActions } from 'react-router-redux'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin();

import DevTools from './containers/DevTools'

import Index from './containers/Index'
import About from './containers/About'
import Login from './containers/Login'
import Grid from './containers/NodesGridLayout'
import Masonry from './containers/NodesMasonry'
import Flexbox from './containers/NodesFlexbox'
import Meta from './containers/Meta'

import configureStore from './data/configureStore'
const store = configureStore();

require( './style.gstyl' );

const UserIsAuthenticated = UserAuthWrapper( {
    authSelector: state => state.user,
    redirectAction: routeActions.replace,
    wrapperDisplayName: 'UserIsAuthenticated'
} );

const UserIsAdmin = UserAuthWrapper( {
    authSelector: state => state.user,
    redirectAction: routeActions.replace,
    failureRedirectPath: '/',
    wrapperDisplayName: 'UserIsAdmin',
    predicate: user => user.isAdmin,
    allowRedirectBack: false
} );

console.log( '[Meta] render' );
render( (
    <Provider store={ store }>
        <Router history={ browserHistory }>
            <Route path='/' component={ Index }/>
            <Route path='index' component={ Index }/>
            <Route path='about' component={ About }/>
            <Route path='login' component={ Login }/>
            <Route path='grid' component={ Grid }/>
            <Route path='masonry' component={ Masonry }/>
            <Route path='flexbox' component={ Flexbox }/>
            {/*<Route path="*" component={ UserIsAuthenticated( Meta ) }/>*/}
            <Route path="*" component={ Meta }/>
            <DevTools/>
        </Router>
    </Provider>
), document.getElementById( 'root' ) );
