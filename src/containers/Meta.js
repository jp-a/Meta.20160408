import React, { Component } from 'react'
import { Link } from 'react-router'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Navigation from './Navigation'
import Nodes from './NodesFlexbox'
import Node from './Node'

import FlatButton from 'material-ui/lib/flat-button'
import ContentAdd from 'material-ui/lib/svg-icons/content/add'

import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import Wiki from './Wiki'
import WikiIndex from './WikiIndex'
import WikiPage from './WikiPage'

const style = {
    node: {
        width: '80%',
        margin: '0 auto'
    },
};


class Meta extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            node: undefined
        };
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

    render() {
        const uri = /^([^/]+)\/?(.*)$/.exec( this.props.params.splat );
        console.log( '[Meta]', this.props.params.splat, uri );

        const id =  uri[ 1 ] == 'wiki' ? uri[ 2 ] : uri[ 1 ];

        if ( id ) {
            // jpa - 15/02/2016 - 19:11 // lodash refusing to work for whatever reason... reverting to native.
            // node = _where( this.props.nodes, { _id: this.props.params.splat } )[ 0 ];
            const node = this.props.nodes.filter( ( obj ) => obj._id === id )[ 0 ];
            this.state.node = node ? <Node key={ node._id } node={ node } actions={ this.props.actions }/> : undefined;


            this.children = this.state.node ?
                <WikiPage { ...this.props } children={ this.state.node } params={ { id: id } } />
                :
                <FlatButton onClick={ this.handleAdd.bind( this ) } label="" icon={<ContentAdd />} />;
        } else {
            this.children = <Nodes />
        }





        return <div>
            <Navigation/>

            <div>
                { this.children }
            </div>

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