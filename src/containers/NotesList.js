import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Node from './Node'

const columns = 1;
const width = '280px';
const style = {
    container: {
        width: '92%',
        margin: '64px auto',
        MozColumnCount: columns,
        WebkitColumnCount: columns,
        columnCount: columns,
        // MozColumnWidth: width,
        // WebkitColumnWidth: width,
        // columnWidth: width,
        MozColumnGap: '1em',
        WebkitColumnGap: '1em',
        columnGap: '1em',
    },
    node: {
        width: '100%',
        display: 'inline-block',
        WebkitColumnBreakInside: 'avoid',   /* Chrome, Safari */
        pageBreakInside: 'avoid',           /* Theoretically FF 20+ */
        breakInside: 'avoid-column',        /* IE 11 */
        marginBottom: '0.1em'
    },
};

class Nodes extends Component {
    handleDelete( event ) {
        console.log( 'deleteNode(', id, ')' );
        // this.props.deleteNode( id );
    }

    render() {
        return(
            <div>
                <div style={ style.container }>
                    { this.props.nodes.map( ( node, index ) =>
                        <Node key={ node._id } style={ style.node } index={ index } node={ node } actions={ this.props.actions }/>
                    ) }
                </div>
            </div>
        )
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
