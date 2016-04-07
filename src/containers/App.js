import React, { Component } from 'react'
import { Link } from 'react-router'

import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Navigation from './Navigation'
import NodeState from './NodeState'


const style = {
    node: {
        width: '80%',
        margin: '0 auto'
    },
};

class App extends Component {
    constructor( props ) {
        super( props );
    }

    render() {
        console.log( '[App]', window.location.pathname );
        const node = this.props.nodes.filter( ( obj ) => obj._id === 'home' )[ 0 ]

        return <div>
            <Navigation/>

            <div>
                { this.props.children }
                {/* <NodeState key={ node._id } node={ node } actions={ this.props.actions } { ...this.props } /> */}
            </div>

        </div>
    }
}

// App.contextTypes = { router: PropTypes.object };
import * as actions from '../data/actions/actions'
App = connect(
    ( state ) => {
        return { nodes: state.nodes, syncState: state.syncState }
    },
    ( dispatch ) => {
        return { actions: bindActionCreators( actions, dispatch ) }
    }
)( App );

export default App