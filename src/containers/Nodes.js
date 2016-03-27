import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Paper from 'material-ui/lib/paper'

import Node from './Node'

import style from './style.styl'

const localStyle = {
    margin: 20,
    padding: 20,
    // display: 'inline-block',
};

class Nodes extends Component {
    handleDelete( event ) {
        console.log( 'deleteNode(', id, ')' );
        // this.props.deleteNode( id );
    }

    render() {
        return <div>
            <div className={ style.nodes }>
                { this.props.nodes.map( ( node, index ) =>
                    <Paper style={ localStyle } zDepth={1}>
                        <Node key={ node._id } index={ index } node={ node }
                          actions={ this.props.actions }/>
                    </Paper>
                ) }
            </div>
        </div>
    }
}

import * as actions from '../data/actions/actions'
export default connect(
    ( state ) => {
        return { nodes: state.nodes, syncState: state.syncState }
    },
    ( dispatch ) => {
        return { actions: bindActionCreators( actions, dispatch ) }
    }
)( Nodes );
