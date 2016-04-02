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
    content: {
        width: '80%',
        margin: '64px auto'
    },
};

class WikiPage extends Component {
    constructor( props ) {
        super( props );
    }

    render() {
        return <div style={ style.content }>
            { this.props.children }
        </div>
    }
}


import * as actions from '../data/actions/actions'
WikiPage = connect(
    ( state ) => {
        return { nodes: state.nodes, syncState: state.syncState }
    },
    ( dispatch ) => {
        return { actions: bindActionCreators( actions, dispatch ) }
    }
)( WikiPage );

export default WikiPage