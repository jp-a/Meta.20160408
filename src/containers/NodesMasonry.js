import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Masonry from 'react-masonry-component'

import Navigation from './Navigation'
import Node from './Node'

const style = {
    container: {
    },
    node: {
        width: '300px',
        margin: '1em'
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
            <Navigation/>
            <Masonry
                className={ '' }
                elementType={ 'div' }
                options={ { transitionDuration: 100 } }
                disableImagesLoaded={ false }
                >
                { this.props.nodes.map( ( node, index ) =>
                    <Node key={ node._id } style={ style.node } index={ index } node={ node } actions={ this.props.actions }/>
                ) }
            </Masonry>
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
