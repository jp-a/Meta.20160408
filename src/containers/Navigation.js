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

import IconButton from 'material-ui/lib/icon-button'
import MenuIcon from 'material-ui/lib/svg-icons/navigation/menu'


import IconMenu from 'material-ui/lib/menus/icon-menu'
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert'

const style = {
    menuItem: {
        active: {
            color: 'red'
        }
    },
    iconMenu: {
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 999
    }
};


export class MenuItems extends Component {
    constructor( props ) {
        super( props );
        this.handleClose = props.handleClose;
    }

    render() {
        return <div>
            <MenuItem onTouchTap={ this.handleClose } containerElement={ <Link activeStyle={ style.menuItem.active } to='/'/> }>Index</MenuItem>
            <MenuItem onTouchTap={ this.handleClose } containerElement={ <Link activeStyle={ style.menuItem.active } to='/wiki/'/> }>Wiki</MenuItem>
            <MenuItem onTouchTap={ this.handleClose } containerElement={ <Link activeStyle={ style.menuItem.active } to='/notes/'/> }>Notes</MenuItem>
            <MenuItem onTouchTap={ this.handleClose } containerElement={ <Link activeStyle={ style.menuItem.active } to='/node/home'/> }>Node/Home</MenuItem>
            <MenuItem onTouchTap={ this.handleClose } containerElement={ <Link activeStyle={ style.menuItem.active } to='/visual'/> }>Visual</MenuItem>
            <MenuItem onTouchTap={ this.handleClose } containerElement={ <Link activeStyle={ style.menuItem.active } to='/test/error'/> }>Error</MenuItem>
        </div>
    }
}

class Navigation extends Component {
    constructor( props ) {
        super( props );
        this.state = { open: false };
    }

    handleClose = () => {
        setTimeout( this.setState( { open: false } ), 200 );
    }

    render() {

        return <div>
            <IconMenu
                style = { style.iconMenu }
                open={ this.state.open }
                closeOnItemTouchTap={ true }
                onMouseEnter={ () => this.setState( { open: true } ) }
                onTouchTap={ () => this.setState( { open: false } ) }
                onItemTouchTap={ () => this.setState( { open: false } ) }
                iconButtonElement = { <IconButton><MenuIcon /></IconButton> }
                anchorOrigin = { { horizontal: 'right', vertical: 'top' } }
                targetOrigin = { { horizontal: 'right', vertical: 'top' } }
            >
                <MenuItems handleClose={ this.handleClose.bind( this ) }/>
            </IconMenu>
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


