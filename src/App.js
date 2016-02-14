import React, { Component } from 'react';

class Counter extends Component {
    constructor( props ) {
        super( props );
        this.state = { counter: 0 };
        this.interval = setInterval( () => this.tick(), 1000 );
    }

    tick() {
        console.log( 'tick v' + this.props.version );
        this.setState( {
            counter: this.state.counter + this.props.increment
        } );
    }

    componentWillUnmount() {
        clearInterval( this.interval );
    }

    render() {
        // throw new Error( 'oops' );
        return (
            <h1 style={{ color: this.props.color }}>
                Counter ( version: { this.props.version }&nbsp;
                | increment: { this.props.increment } ): { this.state.counter }
            </h1>
        );
    }
}

export class App extends Component {
    render() {
        return (
            <div>
                <Counter version={ '1.0' } increment={ 1 } color={ 'grey' }/>
                <Counter version={ '2.0' } increment={ 2 } color={ 'darkgrey' }/>
            </div>
        );
    }
}