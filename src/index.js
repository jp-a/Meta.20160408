import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router'
import { Provider, connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Counters from './containers/Counters'
import DevTools from './containers/DevTools'

import TextInput from './components/TextInput'

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

import * as NodesActions from './data/actions/nodes';
Navigation = connect(
    ( state ) => {
        return { nodes: state.nodes, syncState: state.syncState }
    },
    ( dispatch ) => {
        return { actions: bindActionCreators( NodesActions, dispatch ) }
    }
)( Navigation );


class Input extends Component {
    constructor( props, context ) {
        super( props, context );
        this.state = {
            value: this.props.value || ''
        };
    }

    handleChange( _e ) {
        console.log( 'Input.handleChange(', _e.target.value, ')' );
        this.setState( { value: _e.target.value } );
    }

    handleBlur( _e ) {
        console.log( 'Input.handleBlur(', _e.target.value, ')' );
        if ( this.props.value != _e.target.value ) {
            this.setState( { value: _e.target.value } );
            this.props.onEdit( _e.target.value );
        }
    }

    render() {
        if ( this.state.value != this.props.value ) {
            console.log( 'Input', this.state.value, '|', this.props.value );
            this.setState( { value: this.props.value } );
        }
        return <span><input
            type='text'
            autoFocus='false'
            value={ this.state.value }
            onChange={ this.handleChange.bind( this ) }
            onBlur={ this.handleBlur.bind( this ) }
        /></span>
    }
}

class ContentEditable extends Component {
    constructor( ) {
        super();
    }

    render() {
        return React.createElement(
            this.props.tagName || 'span',
            Object.assign( {}, this.props, {
                ref: ( e ) => this.htmlEl = e,
                onInput: this.emitChange.bind( this ),
                onBlur: this.emitBlur.bind( this ),
                contentEditable: !this.props.disabled,
                dangerouslySetInnerHTML: { __html: this.props.html }
            } ),
            this.props.children );
    }

    shouldComponentUpdate( nextProps ) {
        return !this.htmlEl || nextProps.html !== this.htmlEl.innerHTML ||
            this.props.disabled !== nextProps.disabled;
    }

    componentDidUpdate() {
        if ( this.htmlEl && this.props.html !== this.htmlEl.innerHTML ) {
            this.htmlEl.innerHTML = this.props.html;
        }
    }

    emitChange( evt ) {
        if ( !this.htmlEl ) return;
        var html = this.htmlEl.innerHTML;
        if ( this.props.onChange && html !== this.lastHtml ) {
            evt.target = { value: html };
            this.props.onChange( evt );
        }
        this.lastHtml = html;
    }

    emitBlur( evt ) {
        if ( !this.htmlEl ) return;
        var html = this.htmlEl.innerHTML;
        if ( this.props.onBlur ) {
            evt.target = { value: html };
            this.props.onBlur( evt );
        }
        this.lastHtml = html;
    }
}

class InputEditable extends Component {
    constructor( props, context ) {
        super( props, context );
        this.state = {
            html: this.props.html || ''
        };
    }

    handleChange( _e ) {
        console.log( 'InputEditable.handleChange(', _e.target.value, ')' );
        this.setState( { html: _e.target.value } );
    }

    handleBlur( _e ) {
        console.log( 'InputEditable.handleBlur(', _e.target.value, ')' );
        if ( this.state.html != this.props.html ) {
            // this.setState( { html: _e.target.value } );
            this.props.onEdit( this.state.html );
        }
    }

    render() {
        return <ContentEditable
            html={ this.state.html }
            disabled={ false }
            onChange={ this.handleChange.bind( this ) }
            onBlur={ this.handleBlur.bind( this ) }
        />
    }
}


class Node extends Component {
    handleDelete() {
        console.log( 'deleteNode(', this.props.node._id, ')' );
        this.props.actions.deleteNode( this.props.node._id );
    }

    handleEdit( text ) {
        console.log( 'handleEdit(', text, ')' );
        this.props.actions.editNode( this.props.node._id, text );
    }

    render() {
        const { node, index } = this.props;

        return (
            <tr>
                <td>{ ( 1001 + index ).toString().substring( 1 ) }</td>
                <td><button onClick={ this.handleDelete.bind( this ) }> x</button></td>
                <td><Link to={ node._id }>{ node._id }</Link></td>
                <td>{ node._rev }</td>
                <td><InputEditable key={ node._rev } value={ node.text } html={ node.text }
                                onEdit={ this.handleEdit.bind( this ) }/></td>
            </tr>
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
            <table><tbody>
                { this.props.nodes.map( ( node, index ) =>
                    <Node key={ node._id } index={ index } node={ node }
                          actions={ this.props.actions }/>
                ) }
            </tbody></table>
        </div>
    }
}
Nodes = connect(
    ( state ) => {
        return { nodes: state.nodes, syncState: state.syncState }
    },
    ( dispatch ) => {
        return { actions: bindActionCreators( NodesActions, dispatch ) }
    }
)( Nodes );


class Meta extends Component {
    constructor( props ) {
        super( props );
        this.state = {};
    }

    render() {
        console.log( '[Meta]', this.props.params.splat );

        let node = undefined;
        if ( this.props.params.splat ) {
            // jpa - 15/02/2016 - 19:11 // lodash refusing to work for whatever reason... reverting to native.
            // node = _where( this.props.nodes, { _id: this.props.params.splat } )[ 0 ];
            node = this.props.nodes.filter( ( obj ) => obj._id === this.props.params.splat )[ 0 ];
            if ( node ) this.state.node = node;
            else this.state.node = undefined;
        }


        return <div>
            <Navigation/>
            <div>Meta{ this.props.params.splat && ( ': ' + this.props.params.splat ) }</div>
            { !node && <Nodes/> }
            { node &&
            <Node key={ node._id } index={ 0 } node={ node } actions={ this.props.actions }/> }

        </div>
    }
}
// Meta.contextTypes = { router: PropTypes.object };
Meta = connect(
    ( state ) => {
        return { nodes: state.nodes, syncState: state.syncState }
    },
    ( dispatch ) => {
        return { actions: bindActionCreators( NodesActions, dispatch ) }
    }
)( Meta );

console.log( '[Meta] render' );
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
