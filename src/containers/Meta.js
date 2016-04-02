import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Navigation from './Navigation'
import Nodes from './NodesFlexbox'
import Node from './Node'

import FlatButton from 'material-ui/lib/flat-button'
import ContentAdd from 'material-ui/lib/svg-icons/content/add'

import { Link, Router, Route, IndexRoute, browserHistory } from 'react-router'
import Wiki from './Wiki'
import WikiIndex from './WikiIndex'
import WikiPage from './WikiPage'

import Notes from './Notes'

const style = {
    node: {
        width: '80%',
        margin: '0 auto'
    },
};


class Meta extends Component {
    constructor( props ) {
        super( props );
    }
    
    render() {
        const uri = /^\/?(wiki|notes)?\/?(.*?)\/?$/.exec( window.location.pathname );
        console.log( '[Meta]', this.props.params.splat, window.location.pathname, uri );

        const mode = uri[ 1 ];
        const id = uri[ 2 ];

        switch ( mode ) {
            case 'wiki':
                this.children = <Wiki id={ id } { ...this.props } />;
                break;

            case 'notes':
                this.children = <Notes id={ id } { ...this.props } />;
                break;

            default:
                throw new Error( 'Could not handle the pathname: ' + window.location.pathname )
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