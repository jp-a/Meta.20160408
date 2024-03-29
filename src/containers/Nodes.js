import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Masonry from 'react-masonry-component'

import Node from './Node'

import style from './style.styl'

const localStyle = {
    margin: '20px',
    // padding: '20',
    // display: 'inline-block',
};

class Nodes extends Component {
    handleDelete( event ) {
        console.log( 'deleteNode(', id, ')' );
        // this.props.deleteNode( id );
    }

    render() {
        return(
            <Masonry
                className={ '' }
                elementType={ 'div' }
                options={ { transitionDuration: 100 } }
                disableImagesLoaded={ false }
                >
                { this.props.nodes.map( ( node, index ) =>
                    <Node key={ node._id } index={ index } node={ node } actions={ this.props.actions }/>
                ) }
            </Masonry>
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
