/**
 * Created by jpa on 18/02/2016.
 */
import React, { Component } from 'react'
import { Link } from 'react-router'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import AppBar from 'material-ui/lib/app-bar'

import LeftNav from 'material-ui/lib/left-nav'
import MenuItem from 'material-ui/lib/menus/menu-item'
import FlatButton from 'material-ui/lib/flat-button'

// import Theme from '../stylesheets/Theme';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator';

// @ThemeDecorator( ThemeManager.getMuiTheme( Theme ) )
class Navigation extends Component {
    constructor( props ) {
        super( props );
        this.state = { open: false };
    }

    handleAdd() {
        for ( var i = 0; i < 1; i++ ) {
            console.log( 'addNode()' );
            this.props.actions.addNode( {
                title: JSON.stringify( 'Node ' + ( this.props.nodes.length + 1 + i ) ),
                content: JSON.stringify( 'Hello World!' )
            } );
        }
    }

    handleToggle = () => this.setState( { open: !this.state.open } );

    handleClose = () => this.setState( { open: false } );

    handleOnMouseEnter = () => console.log( 'handleOnMouseEnter' );


    render() {
        const ACTIVE = { color: 'red' };
        return <div>
            <AppBar
                title='Meta'
                onLeftIconButtonTouchTap={ this.handleToggle }
                // onMouseEnter={ this.handleToggle }
                iconElementRight={ <FlatButton onClick={ this.handleAdd.bind( this ) } label="Add" /> }
            />

            <LeftNav
                open={ this.state.open }
                docked={ false }
                containerStyle={ { 'top': '64px' } }
                onRequestChange={ open => this.setState( { open } ) }
            >
                <MenuItem
                    onTouchTap={ this.handleClose }
                    containerElement={<Link activeStyle={ ACTIVE } to='/'/>}
                >Home</MenuItem>
                <MenuItem
                    onTouchTap={ this.handleClose }
                    containerElement={<Link activeStyle={ ACTIVE } to='/about'/>}
                >About</MenuItem>
                <MenuItem
                    onTouchTap={ this.handleClose }
                    containerElement={<Link activeStyle={ ACTIVE } to='/login'/>}
                >Login</MenuItem>
                <MenuItem
                    onTouchTap={ this.handleClose }
                    containerElement={<Link activeStyle={ ACTIVE } to='/nodes'/>}
                >Nodes</MenuItem>

            </LeftNav>
        </div>

    }

    // render() {
    //     const ACTIVE = { color: 'red' };
    //     return <div>
    //         <table>
    //             <tbody>
    //             <tr>
    //                 <td><Link activeStyle={ ACTIVE } to='/'>home</Link></td>
    //                 <td><Link activeStyle={ ACTIVE } to='/about'>about</Link></td>
    //                 <td><Link activeStyle={ ACTIVE } to='/login'>login</Link></td>
    //                 <td><Link activeStyle={ ACTIVE } to='/nodes'>nodes</Link></td>
    //
    //                 { this.props.user.name && <td>
    //                     <button onClick={ this.handleAdd.bind( this ) }>+</button>
    //                 </td> }
    //
    //                 { this.props.user.name &&
    //                     <td>&nbsp;&nbsp;&nbsp;<i>{ this.props.user.name }</i>
    //                         {' '}
    //                     <button onClick={() => this.props.actions.logout()}>Logout</button>
    //                     </td>
    //                 }
    //
    //                 <td>&nbsp;&nbsp;&nbsp;<i>{ this.props.syncState.text }</i></td>
    //             </tr>
    //             </tbody>
    //         </table>
    //         {/*<DevTools/>*/}
    //     </div>
    //
    // }
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


