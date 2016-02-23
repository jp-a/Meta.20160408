import React, { Component, PropTypes } from 'react'
import { routeActions } from 'react-router-redux'
import { connect } from 'react-redux'

import { login } from '../data/actions/actions'

function select( state ) {
    const isAuthenticated = state.user.name || false;
    const redirect = state.routing.location.query.redirect || '/';
    return {
        isAuthenticated,
        redirect
    }
}

class LoginContainer extends Component {

    componentWillMount() {
        this.ensureNotLoggedIn( this.props )
    }

    componentWillReceiveProps( nextProps ) {
        this.ensureNotLoggedIn( nextProps )
    }

    ensureNotLoggedIn( props ) {
        const { isAuthenticated, replace, redirect } = props;

        if ( isAuthenticated ) {
            replace( redirect )
        }
    };

    onClick = ( e ) => {
        e.preventDefault();
        this.props.login( {
            name: this.refs.name.value,
            isAdmin: this.refs.admin.checked
        } )
    };

    render() {
        return (
            <div>
                <h2>Enter your name</h2>
                <input type='text' ref='name' onKeyPress={ ( e ) => {
                    if ( e.key === 'Enter' ) { this.onClick( e ) }
                }}/>
                <br/>
                { 'Admin? ' }
                <input type='checkbox' ref='admin'/>
                <br/>
                <button onClick={ this.onClick }>Login</button>
            </div>
        )
    }

}

LoginContainer.propTypes = {
    login: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired
};

export default connect( select, { login, replace: routeActions.replace } )( LoginContainer )
