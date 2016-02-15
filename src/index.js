import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router'
import { Provider, connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Counters from './containers/Counters'
import DevTools from './containers/DevTools'

import configureStore from './data/configureStore'
const store = configureStore();

class Home extends Component {
    render() {
        return <div>
                <Navigation/>
                <span>Home</span>
            </div>
    }
}

class About extends Component {
    render() {
        return <div>
                <Navigation/>
                <span>About</span>
            <Counters/>
            </div>
    }
}

class Navigation extends Component {
    handleAdd() {
        for ( var i = 0; i < 1; i++ ) {
            console.log( 'addNode()' );
            this.props.actions.addNode( 'Node ' + ( this.props.nodes.length + 1 + i ) );
        }
    }

    render() {
        const ACTIVE = { color: 'red' };
        return <div>
            <table><tbody><tr>
                <td><Link activeStyle={ ACTIVE } to='/'>home</Link></td>
                <td><Link activeStyle={ ACTIVE } to='/about'>about</Link></td>
                <td><Link activeStyle={ ACTIVE } to='/nodes'>nodes</Link></td>
                <td><Link activeStyle={ ACTIVE } to='/h5oevlhaor'>/h5oevlhaor</Link></td>
                <td><Link activeStyle={ ACTIVE } to='/6eleo03sor'>/6eleo03sor</Link></td>

                <td><button onClick={ this.handleAdd.bind( this ) }>+</button></td>

                <td>&nbsp;&nbsp;&nbsp;<i>{ this.props.syncState.text }</i></td>
            </tr></tbody></table>
            {/*<DevTools/>*/}
        </div>

    }
}

import * as NodesActions from './data/actions/nodes';
Navigation = connect(
    ( state ) => { return { nodes: state.nodes, syncState: state.syncState } },
    ( dispatch ) => { return { actions: bindActionCreators( NodesActions, dispatch ) } }
)( Navigation );


class Node extends Component {
    handleDelete() {
        console.log( 'deleteNode(', this.props.node._id, ')' );
        this.props.actions.deleteNode( this.props.node._id );
    }

    render() {
        const { node, index } = this.props;

        return (
            <li>
                <span>{ ( 1001 + index ).toString().substring( 1 ) }</span>
                <span> <button onClick={ this.handleDelete.bind( this ) }> x</button></span>
                <span> | <Link to={ node._id }>{ node._id }</Link></span>
                <span> | { node._rev }</span>
                <span> | { node.text.toString().substring( 0, 20 ) }</span>

            </li>
        )
    }
}

class Nodes extends Component {
    handleDelete( event ) {
        console.log( 'deleteNode(', id, ')' );
        // this.props.deleteNode( id );
    }

    render() {
        return <div>
            <ul>
            { this.props.nodes.map( ( node, index ) =>
                <Node key={ node._id } index={ index } node={ node } actions={ this.props.actions }/>
            ) }
            </ul>
        </div>
    }
}
Nodes = connect(
    ( state ) => { return { nodes: state.nodes, syncState: state.syncState } },
    ( dispatch ) => { return { actions: bindActionCreators( NodesActions, dispatch ) } }
)( Nodes );


class Meta extends Component {
    constructor( props ) {
        super( props );
        this.state = {};
    }

    render() {
        console.log( '[Meta]', this.props.params.splat );

        let node = undefined;
        if( this.props.params.splat ) {
            // jpa - 15/02/2016 - 19:11 // lodash refusing to work for whatever reason... reverting to native.
            // node = _where( this.props.nodes, { _id: this.props.params.splat } )[ 0 ];
            node = this.props.nodes.filter( ( obj ) => obj._id === this.props.params.splat )[ 0 ];
            if ( node ) this.state.node = node;
        }


        return <div>
            <Navigation/>
            <div>Meta{ this.props.params.splat && ( ': ' + this.props.params.splat ) }</div>
            { !node && <Nodes/> }
            { node && <Node key={ node._id } index={ 0 } node={ node } actions={ this.props.actions }/> }

        </div>
    }
}
// Meta.contextTypes = { router: PropTypes.object };
Meta = connect(
    ( state ) => { return { nodes: state.nodes, syncState: state.syncState } },
    ( dispatch ) => { return { actions: bindActionCreators( NodesActions, dispatch ) } }
)( Meta );

render( (
    <Provider store={ store }>
        <Router history={ browserHistory }>
            <Route path="/" component={ Home }/>
            <Route path="about" component={ About }/>
            <Route path="home" component={ Home }/>
            <Route path="*" component={ Meta }/>
            <DevTools/>
        </Router>
    </Provider>
), document.getElementById( 'root' ) );
