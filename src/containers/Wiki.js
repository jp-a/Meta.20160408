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

class Wiki extends Component {
    constructor( props ) {
        super( props );
    }

    render() {
        console.log( '[Wiki]', this.props.params.splat );

        return <div>
            <span>Wiki</span>

            <content>
                { this.props.children }
            </content>

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