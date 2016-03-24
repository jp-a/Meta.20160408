import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import { Provider, connect } from 'react-redux'
import { UserAuthWrapper } from 'redux-auth-wrapper'
import { routeActions } from 'react-router-redux'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin();

import DevTools from './containers/DevTools'

import Home from './containers/Home'
import About from './containers/About'
import Meta from './containers/Meta'
import Login from './containers/Login'

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
            <Route path='/' component={ Home }/>
            <Route path='home' component={ Home }/>
            <Route path='about' component={ About }/>
            <Route path='login' component={ Login }/>
            {/*<Route path="*" component={ UserIsAuthenticated( Meta ) }/>*/}
            <Route path="*" component={ Meta }/>
            <DevTools/>
        </Router>
    </Provider>
), document.getElementById( 'root' ) );
