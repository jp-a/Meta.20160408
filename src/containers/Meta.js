import React, { Component } from 'react'
import { Link } from 'react-router'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Navigation from './Navigation'
import Nodes from './Nodes'
import Node from './Node'

class Meta extends Component {
    constructor( props ) {
        super( props );
        this.state = {};
    }

    render() {
        console.log( '[Meta]', this.props.params.splat );

        let node = undefined;
        if ( this.props.params.splat ) {
            // jpa - 15/02/2016 - 19:11 // lodash refusing to work for whatever reason... reverting to native.
            // node = _where( this.props.nodes, { _id: this.props.params.splat } )[ 0 ];
            node = this.props.nodes.filter( ( obj ) => obj._id === this.props.params.splat )[ 0 ];
            if ( node ) this.state.node = node;
            else this.state.node = undefined;
        }

    return <div>
        <Navigation/>

        <div>Meta{ this.props.params.splat && ( ': ' + this.props.params.splat ) }</div>

        { !node && <Nodes/> }
        { this.state.node &&
        <Node key={ node._id } index={ 0 } node={ node } actions={ this.props.actions }/> }

        </div>
    }
}

// Meta.contextTypes = { router: PropTypes.object };
import * as actions from '../data/actions/actions'
Meta = connect(
    ( state ) => {
        return { nodes: state.nodes, syncState: state.syncState }
    },
    ( dispatch ) => {
        return { actions: bindActionCreators( actions, dispatch ) }
    }
)( Meta );

export default Meta