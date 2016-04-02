import React, { Component } from 'react'
import { Link } from 'react-router'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

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