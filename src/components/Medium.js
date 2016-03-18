import React, { Component } from 'react'
import Editor from 'react-medium-editor'

require( 'medium-editor/dist/css/medium-editor.css' );
require( 'medium-editor/dist/css/themes/default.css' );


export default class Medium extends Component {
    constructor( props, context ) {
        super( props, context );
        // console.log( 'Initial content:', this.props.html );

        this.state = { text: this.props.html };
    }

    handleFocus() {
        console.log( 'onFocus' );
    }

    handleBlur() {
        console.log( 'onBlur', this.state.text );
        this.props.onEdit( this.state.text );
    }

    handleChange( text, medium ) {
        console.log( 'onChange', text );
        this.setState( { text: text } );
    }

    handleCallback( url ) {
        console.log( 'onCallback', url );
    }

    render() {
        return (
            <Editor
                tag='div'
                className='editor'
                onFocus={ this.handleFocus.bind( this ) }
                onBlur={ this.handleBlur.bind( this ) }
                text={ this.state.text }
                onChange={ this.handleChange.bind( this ) }
                options={ {
                    toolbar: { buttons: [ 'bold', 'italic', 'underline', 'anchor', 'h2', 'h3', 'quote' ] },
                    anchorPreview: {
                        hideDelay: 1,
                        previewValueSelector: 'a',
                        callback: this.handleCallback.bind( this )
                    }
                } }
            />
        )
    }
}
