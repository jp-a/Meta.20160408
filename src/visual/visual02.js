import React, { Component } from 'react'
import d3 from 'd3'

const style = {
    body: {
        margin: '1em'
    },
    rect: {
        fill: 'none',
        border: '1px',
        stroke: 'grey',
        pointerEvents: 'all'
    }
};

const defaultProps = {
    page: {
        details: true
    },
    size: {
        width: '640',
        height: '480'
    },
    parallax: {
        active: false,
        ratio: 0
    },
    nodes: {
        total: 10
    },
    cursor: {
      r: 16
    },
    node: {
        r: 10,
        text: false,
        ratioVx: 0,
        ratioVy: 0
    },
    connections: {
        distance: 120
    }
};

export default class Visual extends Component {
    constructor( props ) {
        super( props );

        console.log( 'Visual 02' );

        this.state = {
            nodes: [],
            refs: [],
            connections: [],
            links: undefined,
            mouse: { x: props.size.width / 2, dx: 0, y: props.size.height / 2, dy: 0 },
            moves: [],
            props: props
        };

        // NODES
        this.state.nodes = d3.range( props.nodes.total + 1 ).map( function ( i ) {
            return {
                id: i,
                r: props.node.r,
                x: Math.round( ( props.size.width - props.node.r ) * Math.random() ),
                y: Math.round( ( props.size.height - props.node.r ) * Math.random() ),
                vx: props.node.ratioVx * Math.random() * ( Math.random() < 0.5 ? -1 : 1 ),
                vy: props.node.ratioVy * Math.random() * ( Math.random() < 0.5 ? -1 : 1 )
            };
        } );

        // CURSOR NODE
        this.state.nodes[ 0 ].r = this.state.props.cursor.r;
        this.state.nodes[ 0 ].x = this.state.props.size.width / 2;
        this.state.nodes[ 0 ].y = this.state.props.size.height / 2;
        this.state.nodes[ 0 ].vx = 0;
        this.state.nodes[ 0 ].vy = 0;
    }

    // CALCULATE CONNECTIONS
    connections() {
        this.state.connections = [];
        // this.state.links = [];
        d3.range( this.state.props.nodes.total * 1 ).map( ( isource ) => {
                var node = this.state.nodes[ isource ];

                //   add connections to any nearby nodes
                this.state.nodes.forEach( ( target, itarget ) => {
                    var x = target.x - node.x,
                        y = target.y - node.y;

                    if ( isource != itarget && Math.sqrt( x * x + y * y ) < this.state.props.connections.distance ) {
                        // var existing = this.state.connections.filter( function ( d, i ) {
                        //     return ( d.source == itarget && d.target == isource )
                        // } )[ 0 ];
                        //
                        // if ( existing === undefined ) {
                        //     this.state.connections.push( { source: isource, target: itarget } )
                        // };
                        this.state.connections.push( { source: isource, target: itarget } )
                    }
                } );
            }
        );

        //console.log( 'connections:', this.state.connections );

        return this;
    }

    // TRACK MOUSE MOVEMEMENTS
    mousemove() {
        const point = d3.mouse( this._svg );
        //console.log( 'mousemove:', point );

        // this.state.cursor.attr( 'transform', 'translate(' + d3.mouse( this._svg ) + ')' );
        this.state.nodes[ 0 ].x = point[ 0 ] - this.state.mouse.dx -1;
        this.state.nodes[ 0 ].y = point[ 1 ] - this.state.mouse.dy -1;

        this.setState(
            { mouse: {
                x: point[ 0 ],
                dx: this.state.mouse.x * this.state.props.parallax.ratio,
                y: point[ 1 ],
                dy: this.state.mouse.y * this.state.props.parallax.ratio
            } }
        );
    }

    // COMPONENT LIFECYCLE
    componentDidMount() {
        //console.log( 'componentDidMount: _svg', this._svg );

        d3.select( this._svg ).on( 'mousemove', this.mousemove.bind( this ) );

        this.draw().connections().redraw();

        d3.timer( this.step.bind( this ) );
    }

    componentDidUpdate() {
        //console.log( 'componentDidUpdate: _svg', this._svg );
    }

    componentWillUnmount() {
        //console.log( 'componentWillUnmount: _svg', this._svg );
    }

    // TICKS
    step() {
        const classRef = this;
        const deltaX = this.state.mouse.dx;
        const deltaY = this.state.mouse.dy;

        this.state.nodes.map( ( node, i ) => {
            // console.log( 'step', node, i );
            var d = node;

            if ( ( d.x + this.state.mouse.dx + this.state.props.node.r ) >= this.state.props.size.width && d.vx > 0 ) d.vx *= -1;
            if ( ( d.y + this.state.mouse.dy + this.state.props.node.r ) >= this.state.props.size.height && d.vy > 0 ) d.vy *= -1;

            if ( ( d.x + this.state.mouse.dx - this.state.props.node.r ) <= 0 && d.vx < 0 ) d.vx *= -1;
            if ( ( d.y + this.state.mouse.dx - this.state.props.node.r ) <= 0 && d.vy < 0 ) d.vy *= -1;

            d.x += d.vx;
            d.y += d.vy;

            classRef.state.links && classRef.state.links.each( function ( l, li ) {
                if ( l.source == d.id ) {
                    d3.select( this ).attr( 'x1', d.x + deltaX ).attr( 'y1', d.y + deltaY );
                } else if ( l.target == d.id ) {
                    d3.select( this ).attr( 'x2', d.x + deltaX ).attr( 'y2', d.y + deltaY );
                }
            } );
        } );

        this.state.refs.attr( 'transform', function( d ){ return 'translate( ' + ( d.x + deltaX ) + ',' + ( d.y + deltaY ) + ')' } );

        this.connections().redraw();
    };

    draw(){
        const fill = d3.scale.category10();
        const svg = d3.select( this._svg );

        // DRAG
        const parent = this;
        const drag = d3.behavior.drag()
            .on( 'drag', function ( d, i ) {
                d.x += d3.event.dx;
                d.y += d3.event.dy;
                d3.select( this ).attr( 'transform', function( d ){ return 'translate( ' + d.x + ',' + d.y + ')' } );
                //console.log( 'drag:', parent, this, parent.state.links[ 0 ] );
                parent.state.links && parent.state.links.each( function ( l, li ) {
                    console.debug( 'links.each', d.id, JSON.stringify( l ), li );
                    if ( l.source == d.id ) {
                        d3.select( this ).attr( 'x1', d.x ).attr( 'y1', d.y );
                    } else if ( l.target == d.id ) {
                        d3.select( this ).attr( 'x2', d.x ).attr( 'y2', d.y );
                    }
                } );
            } );

        // const cursor = svg.append( 'circle' )
        //     .attr( 'r', 30 )
        //     .attr( 'transform', 'translate( ' + this.state.props.size.width / 2 + ', ' + this.state.props.size.height / 2  + ' )' )
        //     .attr( 'class', 'cursor' )
        //     .style( {
        //         fill: 'none',
        //         stroke: 'brown',
        //         pointerEvents: 'none'
        //     } );

        const nodesSelection = svg.selectAll( 'g' ).data( this.state.nodes );

        const nodesEnter = nodesSelection.enter()
            .insert( 'g' )
            .attr( 'transform', function( d ){ return 'translate( ' + d.x + ',' + d.y + ')' } )
            .attr( 'cursor', 'pointer' )
            .call( drag );

        nodesEnter
            .append( 'circle' )
            .attr( 'class', 'node' )
            .attr( 'r', ( d ) => { return d.r } )
            .attr( 'cursor', 'pointer' )
            .style( 'fill', function ( d ) {
                return fill( d.id );
            } );

        this.state.props.node.test && nodesEnter
            .append( 'svg:text' )
            .text( function( d ) { return d.id; } )
            .attr( 'dx', - this.state.props.node.r / 2 )
            .attr( 'dy', this.state.props.node.r / 2 )
            .attr( 'cursor', 'pointer' )
            .attr( 'fill', 'white' );

        console.log( nodesSelection );

        d3.select( nodesSelection[ 0 ][ 0 ] ).select( 'circle' ).style(
            {
                pointerEvents: 'none',
                fill: 'none',
                stroke: 'brown',
            }
        );
        
        this.setState( {
            refs: nodesSelection,
            // cursor: cursor,
        } );


        
        return this;
    }

    redraw(){
        //console.log( 'redraw, connections:', this.state.connections );
        const fill = d3.scale.category10();
        const svg = d3.select( this._svg );

        // LINKS
        const nodes = this.state.nodes;
        // this.state.links && this.state.links.each().remove();

        svg.selectAll( '.link' )
            .data( this.state.connections )
            .exit().remove();

        //console.log( 'redraw, before:', svg.selectAll( '.link' ) );

        const links = svg.selectAll( '.link' ).data( this.state.connections );

        links
            .enter()
            .append( 'line' )
            .attr( 'class', 'link' )
            .attr( 'x1', function ( l ) {
                var sourceNode = nodes.filter( function ( d, i ) {
                    return i == l.source
                } )[ 0 ];
                d3.select( this ).attr( 'y1', sourceNode.y );
                return sourceNode.x
            } )
            .attr( 'x2', function ( l ) {
                var targetNode = nodes.filter( function ( d, i ) {
                    return i == l.target
                } )[ 0 ];
                d3.select( this ).attr( 'y2', targetNode.y );
                return targetNode.x
            } )
            .style(
            {
                pointerEvents: 'none',
                fill: 'none',
                stroke: '#aaa',
                strokeWidth: '.5px'
            }
        );


        //console.debug( 'links:', links );
        this.setState( {
            links: links
        } );

        return this;
    }

    refresh() {
        //console.log( 'refresh' );
        this.connections().redraw();
    }

    render() {
        return <div style={ style.body }>
            <h2>Visual v3</h2>
            <button onClick={ this.refresh.bind( this ) }>refresh</button><br/>
            <svg ref={ ( c ) => this._svg = c } width={ this.state.props.size.width }
                 height={ this.state.props.size.height }>
                <rect width={ this.state.props.size.width } height={ this.state.props.size.height }
                      style={ style.rect }/>
            </svg>
            
            { this.state.props.page.details && <div id='details'>
                <h3>Mouse:</h3>
                <ul>
                    <li>x: { this.state.mouse.x }</li>
                    <li>dx: { this.state.mouse.dx }</li>
                    <li>y: { this.state.mouse.y }</li>
                    <li>dy: { this.state.mouse.dy }</li>


                </ul>


                <h3>Nodes ( { this.state.nodes.length } ):</h3>
                <ol start="0">
                    { this.state.nodes.map( ( node, index ) => {
                        return <li key={ 'node_' + index }>{ JSON.stringify( node ) }</li>
                        }
                    ) }
                </ol>

                <h3>Refs ( { this.state.refs.length } ):</h3>
                <ol start="0">
                    { this.state.refs.map( ( base, index ) => {
                            JSON.stringify( base );
                            return <span key={ 'baseref_' + index }>
                            <li>...</li>
                            <ol start="0">
                            { base.map( ( ref, index ) => {
                                    return <li key={ 'ref_' + index }>{ JSON.stringify( ref ) }</li>
                                }
                            ) }
                        </ol></span>
                        }
                    ) }
                </ol>

                <h3>Connections ( { this.state.connections.length } ):</h3>
                <ol start="0">
                    { this.state.connections.map( ( con, index ) => {
                        return <li key={ 'con_' + index }>{ JSON.stringify( con ) }</li>
                        }
                    ) }
                </ol>

                <h3>Links ( { this.state.links && this.state.links.length } ):</h3>
                <ol start="0">
                    { this.state.links && this.state.links.map( ( base, index ) => {
                        JSON.stringify( base );
                        return <span key={ 'base_' + index }>
                            <li key={ 'base_' + index }>...</li>
                            <ol start="0">
                            { base.map( ( link, index ) => {
                                    return <li key={ 'link_' + index }>{ JSON.stringify( link ) }</li>
                                }
                            ) }
                        </ol></span>
                        }
                    ) }
                </ol>
            </div> }
        </div>
    }
}

Visual.defaultProps = defaultProps;
