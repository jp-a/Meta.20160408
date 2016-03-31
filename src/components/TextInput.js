import React, { Component, PropTypes } from 'react';

class TextInput extends Component {
    constructor( props, context ) {
        super( props, context );
        this.state = {
            text: this.props.text || ''
        };
    }

    handleBlur( _e ) {
        this.props.onEdit( _e.target.value );
    }

    handleChange( _e ) {
        this.setState( { text: _e.target.value } );
    }


    handleSubmit( _e ) {
        const text = _e.target.value.trim();
        if ( _e.which === 13 ) {
            this.props.onEdit( text );
        }
    }

    handleSave( text ) {
        this.props.onEdit( text );
    }

    render() {
        return (
            <input
                type='text'
                placeholder={ this.props.placeholder }
                // autoFocus='true'
                value={ this.state.text }
                onBlur={ this.handleBlur.bind( this ) }
                onChange={ this.handleChange.bind( this ) }
                onKeyDown={ this.handleSubmit.bind( this ) }/>

        );
    };
}

//{/*<ContentEditable onBlur={ this.handleSave.bind( this ) } html={ this.state.text } />*/}

TextInput.propTypes = {
    onEdit: PropTypes.func.isRequired,
    text: PropTypes.string,
    placeholder: PropTypes.string,
    editing: PropTypes.bool,
};

export default TextInput