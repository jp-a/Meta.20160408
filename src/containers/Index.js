import React, { Component } from 'react'
import { Link } from 'react-router'

import Paper from 'material-ui/lib/paper'
import Menu from 'material-ui/lib/menus/menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import { MenuItems } from './Navigation';

const style = {
    paper: {
        width: '224px',
        margin: '200px auto'
    },
    menu: {

    }
};

export default class Index extends Component {
    render() {
        const ACTIVE = { color: 'red' };

        return <div style={ { textAlign: 'center' } }>

            <Paper style={ style.paper } zDepth={ 1 }>
                <Menu style={ style.menu }>
                    <MenuItems />
                </Menu>
            </Paper>

        </div>
    }
}

