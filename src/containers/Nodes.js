import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Node from './Node'

class Nodes extends Component {
    handleDelete( event ) {
        console.log( 'deleteNode(', id, ')' );
        // this.props.deleteNode( id );
    }

    render() {
        return <div>
            <table>
                <tbody>
                { this.props.nodes.map( ( node, index ) =>
                    <Node key={ node._id } index={ index } node={ node }
                          actions={ this.props.actions }/>
                ) }
                </tbody>
            </table>
        </div>
    }
}

import * as NodesActions from '../data/actions/nodes';
Nodes = connect(
    ( state ) => {
        return { nodes: state.nodes, syncState: state.syncState }
    },
    ( dispatch ) => {
        return { actions: bindActionCreators( NodesActions, dispatch ) }
    }
)( Nodes );

export default Nodes