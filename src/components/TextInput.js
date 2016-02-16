import React, { Component, PropTypes } from 'react';


class ContentEditable extends Component {
    render() {
        return (
            <span ref={ ( c ) => this._input = c }
                  onInput={ this.handleInput.bind( this ) }
                  onBlur={ this.handleChange.bind( this ) }
                  contentEditable='true'
                  dangerouslySetInnerHTML={ { __html: this.props.html } }>
        	</span>
        );
    }

    shouldComponentUpdate( nextProps ) {
        return nextProps.html !== this._input.innerHTML;
    }

    handleInput() {
    }

    handleChange() {
        var html = this._input.innerHTML;
        if ( this.props.onChange && html !== this.lastHtml ) {
            this.props.onChange( {
                target: {
                    value: html
                }
            } );
        }
        this.lastHtml = html;
        this.props.onBlur( html );
    }
}

class TextInput extends Component {
    constructor( props, context ) {
        super( props, context );
        this.state = {
            text: this.props.text || ''
        };
    }

    handleSubmit( _e ) {
        const text = _e.target.value.trim();
        if ( _e.which === 13 ) {
            this.props.onSave( text );
        }
    }

    handleChange( _e ) {
        this.setState( { text: _e.target.value } );
    }

    handleBlur( _e ) {
        this.props.onSave( _e.target.value );
    }

    handleSave( text ) {
        this.props.onSave( text );
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
    onSave: PropTypes.func.isRequired,
    text: PropTypes.string,
    placeholder: PropTypes.string,
    editing: PropTypes.bool,
};

export default TextInput;