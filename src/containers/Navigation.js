/**
 * Created by jpa on 18/02/2016.
 */
import React, { Component } from 'react'
import { Link } from 'react-router'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class Navigation extends Component {
    handleAdd() {
        for ( var i = 0; i < 1; i++ ) {
            console.log( 'addNode()' );
            this.props.actions.addNode( {
                title: 'Node ' + ( this.props.nodes.length + 1 + i ),
                text: 'Hello World!'
            } );
        }
    }

    render() {
        const ACTIVE = { color: 'red' };
        return <div>
            <table>
                <tbody>
                <tr>
                    <td><Link activeStyle={ ACTIVE } to='/'>home</Link></td>
                    <td><Link activeStyle={ ACTIVE } to='/about'>about</Link></td>
                    <td><Link activeStyle={ ACTIVE } to='/nodes'>nodes</Link></td>
                    <td><Link activeStyle={ ACTIVE } to='/h5oevlhaor'>/h5oevlhaor</Link></td>
                    <td><Link activeStyle={ ACTIVE } to='/6eleo03sor'>/6eleo03sor</Link></td>

                    <td>
                        <button onClick={ this.handleAdd.bind( this ) }>+</button>
                    </td>

                    <td>&nbsp;&nbsp;&nbsp;<i>{ this.props.syncState.text }</i></td>
                </tr>
                </tbody>
            </table>
            {/*<DevTools/>*/}
        </div>

    }
}

import * as NodesActions from '../data/actions/nodes'
Navigation = connect(
    ( state ) => {
        return { nodes: state.nodes, syncState: state.syncState }
    },
    ( dispatch ) => {
        return { actions: bindActionCreators( NodesActions, dispatch ) }
    }
)( Navigation );

export default Navigation