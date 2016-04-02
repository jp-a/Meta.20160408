import React, { Component } from 'react'
import { Link } from 'react-router'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Page from './NotePage'
import Nodes from './NotesList'
import Node from './Node'

import FlatButton from 'material-ui/lib/flat-button'
import ContentAdd from 'material-ui/lib/svg-icons/content/add'

const style = {
    body: {
        display: 'flex',
        minHeight: '100vh',
        flexDirection: 'column',
    },
    container: {
        display: 'flex',
        flex: 1
    },
    list: {
        flex: '0 0 16em',
        height: '100vh',
        overflowY: 'scroll'
    },
    content: {
        flex: 1
    }
};

class Notes extends Component {
    constructor( props ) {
        super( props );
    }

    handleAdd() {
        console.log( 'createNode()' );
        this.props.actions.addNode( {
            _id: this.props.params.splat,
            title: JSON.stringify( this.props.params.splat ),
            caption: '...',
            url: 'https://unsplash.it/300/200?image=' + ( ( this.props.nodes.length + 1 ) * 10 ),
            content: JSON.stringify( this.props.params.splat )
        } );
    }

    findNode( id ) {
        return this.props.nodes.filter( ( obj ) => obj._id === id )[ 0 ];
    }

    render() {
        console.log( '[Notes]', this.props.params.splat, id );
        const id = this.props.id;
        const node = this.findNode( id );
        const nodeInstance = node ? <Node key={ node._id } node={ node }
                                          actions={ this.props.actions }/> : undefined;

        if ( id ) {
            this.children = node ?
                <Page { ...this.props } children={ nodeInstance }
                                            params={ { id: id } }/>
                :
                <FlatButton onClick={ this.handleAdd.bind( this ) } label=""
                            icon={<ContentAdd />}/>;
        }

        return <div style={ style.body }>
            <div style={ style.container }>
                <div style={ style.list }>
                    <Nodes />
                </div>
                <div style={ style.content }>
                    { this.children }
                </div>
            </div>
        </div>
    }
}

// Meta.contextTypes = { router: PropTypes.object };
import * as actions from '../data/actions/actions'
Notes = connect(
    ( state ) => {
        return { nodes: state.nodes, syncState: state.syncState }
    },
    ( dispatch ) => {
        return { actions: bindActionCreators( actions, dispatch ) }
    }
)( Notes );

export default Notes