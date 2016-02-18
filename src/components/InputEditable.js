/**
 * Created by jpa on 18/02/2016.
 */
import React, { Component } from 'react'

import ContentEditable from '../components/ContentEditable'

export default class InputEditable extends Component {
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
