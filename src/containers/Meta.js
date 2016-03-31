import React, { Component } from 'react'
import { Link } from 'react-router'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Navigation from './Navigation'
import Nodes from './NodesFlexbox'
import Node from './Node'

import FlatButton from 'material-ui/lib/flat-button'
import ContentAdd from 'material-ui/lib/svg-icons/content/add'

const style = {
    node: {
        width: '80%',
        margin: '0 auto'
    },
};

class Meta extends Component {
    constructor( props ) {
        super( props );
        this.state = {};
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

        <div>
            Meta{ this.props.params.splat && ( ': ' + this.props.params.splat ) }
            { !node && ( this.props.params.splat != 'nodes' ) && <FlatButton onClick={ this.handleAdd.bind( this ) } label="" icon={<ContentAdd />} /> }
        </div>

        { ( this.props.params.splat == 'nodes' ) && <Nodes/> }
        { this.state.node &&
        <Node key={ node._id } style={ style.node } index={ 0 } node={ node } actions={ this.props.actions }/> }

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