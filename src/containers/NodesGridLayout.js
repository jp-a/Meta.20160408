import React, { Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import _ from 'lodash'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import ReactGridLayout from 'react-grid-layout'
var WidthProvider = require( 'react-grid-layout' ).WidthProvider;
var ResponsiveReactGridLayout = require( 'react-grid-layout' ).Responsive;
ResponsiveReactGridLayout = WidthProvider( ResponsiveReactGridLayout );

import Navigation from './Navigation'

import Paper from 'material-ui/lib/paper'

import Node from './Node'

import style from './style.styl'

require( 'react-grid-layout/css/styles.css' );

const localStyle = {
    height: '100%',
    // padding: 20,
    // display: 'inline-block',
};

class Nodes extends Component {
    constructor( props ) {
        super( props );
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

        this.state = {
            layouts: { lg: this.props.initialLayout },
            currentBreakpoint: 'lg'
        };
    }

    handleDelete( event ) {
        console.log( 'deleteNode(', id, ')' );
        // this.props.deleteNode( id );
    }

    generateDOM() {
        return _.map( this.props.nodes, function ( l, i ) {
            return (

                <span key={i} className={l.static ? 'static' : ''}>
                <Paper style={ localStyle } zDepth={1}>

                    {l.static ?
                        <span className="text"
                              title="This item is static and cannot be removed or resized.">Static - {i}</span>
                        : <span className="text">{i}</span>
                    }
                </Paper>
                </span>
            );
        } );
    }

    onBreakpointChange( breakpoint ) {
        this.setState( {
            currentBreakpoint: breakpoint
        } );
    }

    onLayoutChange( layout, layouts ) {
        this.setState( { layouts } );
    }

    onNewLayout() {
        this.setState( {
            layouts: { lg: this.generateLayout() }
        } );
    }

    generateLayout() {
        return _.map( _.range( 0, this.props.nodes.length ), function ( item, i ) {
            var y = Math.ceil( Math.random() * 4 ) + 1;
            return {
                // x: _.random( 0, 5 ) * 1 % 4,
                x: i * 1 % 4,
                y: Math.floor( i / 4 ) * y,
                w: 1,
                h: y,
                i: i.toString(),
                static: false
            };
        } );
    }

    render() {
        return <div className={ this.props.className }>
            <Navigation/>
            <div>Current Breakpoint: { this.state.currentBreakpoint }
                ( { this.props.cols[ this.state.currentBreakpoint ] } columns )
            </div>
            <button onClick={ this.onNewLayout.bind( this ) }>Generate New Layout</button>
            <ResponsiveReactGridLayout
                { ...this.props }
                layouts={ this.state.layouts }
                onBreakpointChange={ this.onBreakpointChange.bind( this ) }
                onLayoutChange={ this.onLayoutChange.bind( this ) }
                useCSSTransforms={ true }>

                {/* this.generateDOM() */}

                { this.props.nodes.map( ( node, index ) =>
                    <span key={ index } className={false ? 'static' : ''}>
                        <Node key={ node._id } index={ index } node={ node }
                            actions={ this.props.actions }/>
                    </span>
                ) }


            </ResponsiveReactGridLayout>

        </div>
    }
}

// <ReactGridLayout className="layout"
//                  cols={3} rowHeight={300} width={1200}>
//     { this.props.nodes.map( ( node, index ) =>
//         <Paper key={ node._id } style={ localStyle } zDepth={1}>
//         Hello
//         </Paper>
//     ) }
// </ReactGridLayout>

// <Node key={ node._id } index={ index } node={ node }
//       actions={ this.props.actions }/>


Nodes.defaultProps = {
    className: "layout",
    rowHeight: 60,
    cols: { lg: 4, md: 3, sm: 2, xs: 1, xxs: 1 },
    // initialLayout: generateLayout()
};


import * as actions from '../data/actions/actions'
export default connect(
    ( state ) => {
        return { nodes: state.nodes, syncState: state.syncState }
    },
    ( dispatch ) => {
        return { actions: bindActionCreators( actions, dispatch ) }
    }
)( Nodes );
