/**
 * Created by jpa on 18/02/2016.
 */
import React, { Component } from 'react'
import { Link } from 'react-router'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { browserHistory } from 'react-router'

import AppBar from 'material-ui/lib/app-bar'

import LeftNav from 'material-ui/lib/left-nav'
import MenuItem from 'material-ui/lib/menus/menu-item'
import FlatButton from 'material-ui/lib/flat-button'

// import Theme from '../stylesheets/Theme'
import ThemeManager from 'material-ui/lib/styles/theme-manager'
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator'

import Avatar from 'material-ui/lib/avatar'

import FloatingActionButton from 'material-ui/lib/floating-action-button'
import ContentAdd from 'material-ui/lib/svg-icons/content/add'

const style = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: 999
};
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
                caption: '...',
                url: 'https://unsplash.it/300/200?image=' + ( ( this.props.nodes.length +  i + 1 ) * 10 ),
                content: JSON.stringify( 'Hello World!' )
            } );
        }
    }

    handleToggle = () => this.setState( { open: !this.state.open } );

    handleClose = () => this.setState( { open: false } );

    handleOnMouseEnter = () => console.log( 'handleOnMouseEnter' );


    render() {
        const ACTIVE = { color: 'red' };
        var buttonStyle = {
            // backgroundColor: 'transparent',
            color: 'white',
            lineHeight: '62px'
        };
        return <div>
            <AppBar
                title='Meta'
                onLeftIconButtonTouchTap={ this.handleToggle }
                // onMouseEnter={ this.handleToggle }
                // iconElementRight={ <FlatButton onClick={ this.handleAdd.bind( this ) } label="" icon={<ContentAdd />} /> }
                // iconElementRight={
                //     <FlatButton
                //         onTouchTap={ this.handleClose }
                //         containerElement={ <Link activeStyle={ ACTIVE } to='/nodes'/> }
                //     >Nodes</FlatButton>
                //  }
            >

                { this.props.user.name &&
                    <MenuItem style={ buttonStyle }>
                        <Avatar style={ buttonStyle } src='http://api.randomuser.me/portraits/med/men/17.jpg' />
                        { this.props.user.name }
                        {' '}
                        <FlatButton style={ buttonStyle } onClick={() => this.props.actions.logout()}>Logout</FlatButton>
                    </MenuItem>
                }

                <FlatButton label="Index" style={ buttonStyle } containerElement={ <Link style={ buttonStyle } activeStyle={ ACTIVE } to='/index'/> } />
                <FlatButton label="Nodes" style={ buttonStyle } containerElement={ <Link style={ buttonStyle } activeStyle={ ACTIVE } to='/nodes'/> } />
                <FlatButton label="Home" style={ buttonStyle } containerElement={ <Link style={ buttonStyle } activeStyle={ ACTIVE } to='/home'/> } />
            </AppBar>

            <LeftNav
                open={ this.state.open }
                docked={ false }
                containerStyle={ { 'top': '64px' } }
                onRequestChange={ open => this.setState( { open } ) }
            >
                <MenuItem
                    onTouchTap={ this.handleClose }
                    containerElement={ <Link activeStyle={ ACTIVE } to='/'/> }
                >Index</MenuItem>
                <MenuItem
                    onTouchTap={ this.handleClose }
                    containerElement={ <Link activeStyle={ ACTIVE } to='/about'/> }
                >About</MenuItem>
                <MenuItem
                    onTouchTap={ this.handleClose }
                    containerElement={ <Link activeStyle={ ACTIVE } to='/login'/> }
                >Login</MenuItem>
                <MenuItem
                    onTouchTap={ this.handleClose }
                    containerElement={ <Link activeStyle={ ACTIVE } to='/grid'/> }
                >Grid Layout</MenuItem>
                <MenuItem
                    onTouchTap={ this.handleClose }
                    containerElement={ <Link activeStyle={ ACTIVE } to='/masonry'/> }
                >Masonry Layout</MenuItem>
                <MenuItem
                    onTouchTap={ this.handleClose }
                    containerElement={ <Link activeStyle={ ACTIVE } to='/flexbox'/> }
                >Flexbox Layout</MenuItem>
                <MenuItem
                    onTouchTap={ this.handleClose }
                    containerElement={ <Link activeStyle={ ACTIVE } to='/nodes'/> }
                >Nodes</MenuItem>

            </LeftNav>

            <FloatingActionButton style={ style } onClick={ this.handleAdd.bind( this ) }>
                <ContentAdd />
            </FloatingActionButton>
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


