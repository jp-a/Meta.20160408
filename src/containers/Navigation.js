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
                title: JSON.stringify( 'Node ' + ( this.props.nodes.length + 1 + i ) ),
                content: JSON.stringify( 'Hello World!' )
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
                    <td><Link activeStyle={ ACTIVE } to='/login'>login</Link></td>
                    <td><Link activeStyle={ ACTIVE } to='/nodes'>nodes</Link></td>

                    { this.props.user.name && <td>
                        <button onClick={ this.handleAdd.bind( this ) }>+</button>
                    </td> }

                    { this.props.user.name &&
                        <td>&nbsp;&nbsp;&nbsp;<i>{ this.props.user.name }</i>
                            {' '}
                        <button onClick={() => this.props.actions.logout()}>Logout</button>
                        </td>
                    }

                    <td>&nbsp;&nbsp;&nbsp;<i>{ this.props.syncState.text }</i></td>
                </tr>
                </tbody>
            </table>
            {/*<DevTools/>*/}
        </div>

    }
}

import * as actions from '../data/actions/actions'
export default connect(
    ( state ) => {
        return { user: state.user, nodes: state.nodes, syncState: state.syncState }
    },
    ( dispatch ) => {
        return { actions: bindActionCreators( actions, dispatch ) }
    }
)( Navigation );


