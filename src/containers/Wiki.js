import React, { Component } from 'react'
import { Link } from 'react-router'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import WikiPage from './WikiPage'
import Nodes from './NodesFlexbox'
import Node from './Node'

import FlatButton from 'material-ui/lib/flat-button'
import ContentAdd from 'material-ui/lib/svg-icons/content/add'

const style = {

    container: {
    },
    node: {
        width: '80%',
        margin: '0 auto'
    },
};

class Wiki extends Component {
    constructor( props ) {
        super( props );
    }

    handleAdd() {
        console.log( 'createNode()' );
        this.props.actions.addNode( {
            _id: this.props.id,
            title: JSON.stringify( this.props.id ),
            caption: '...',
            url: 'https://unsplash.it/300/200?image=' + ( ( this.props.nodes.length + 1 ) * 10 ),
            content: JSON.stringify( this.props.id )
        } );
    }

    findNode( id ) {
        return this.props.nodes.filter( ( obj ) => obj._id === id )[ 0 ];
    }

    render() {
        console.log( '[Wiki]', this.props.params.splat );
        const id = this.props.id;
        const node = this.findNode( id );
        const nodeInstance = node ? <Node key={ node._id } node={ node }
                                       actions={ this.props.actions }/> : undefined;

        if( id ) {
            this.children = node ?
                <WikiPage { ...this.props } children={ nodeInstance }
                                            params={ { id: id } }/>
                :
                <FlatButton onClick={ this.handleAdd.bind( this ) } label=""
                            icon={<ContentAdd />}/>;
        } else {
            this.children = <Nodes />
        }

        return <div style={ style.container }>
                { this.children }
        </div>
    }
}

// Meta.contextTypes = { router: PropTypes.object };
import * as actions from '../data/actions/actions'
Wiki = connect(
    ( state ) => {
        return { nodes: state.nodes, syncState: state.syncState }
    },
    ( dispatch ) => {
        return { actions: bindActionCreators( actions, dispatch ) }
    }
)( Wiki );

export default Wiki