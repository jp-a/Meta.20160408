import React, { Component } from 'react'
import { Editor, EditorState, ContentState, CompositeDecorator, RichUtils, createFromBlockArray, convertToRaw, convertFromRaw } from 'draft-js';

import HandleSpan from './HandleSpan'
import HashtagSpan from './HashtagSpan'


/**
 * Super simple decorators for handles and hashtags, for demonstration
 * purposes only. Don't reuse these regexes.
 */
const HANDLE_REGEX = /\@[\w]+/g; //(^|\s)@(\w+)
const HASHTAG_REGEX = /\#[\w\u0590-\u05ff]+/g;

function handleStrategy( contentBlock, callback ) {
    findWithRegex( HANDLE_REGEX, contentBlock, callback );
}

function hashtagStrategy( contentBlock, callback ) {
    findWithRegex( HASHTAG_REGEX, contentBlock, callback );
}

function findWithRegex( regex, contentBlock, callback ) {
    const text = contentBlock.getText();
    let matchArr, start;
    while ( (matchArr = regex.exec( text )) !== null ) {
        start = matchArr.index;
        callback( start, start + matchArr[ 0 ].length );
    }
}

export default class Draft extends Component {
    constructor( props, context ) {
        super( props, context );

        const compositeDecorator = new CompositeDecorator([
            {
                strategy: handleStrategy,
                component: HandleSpan
            },
            {
                strategy: hashtagStrategy,
                component: HashtagSpan
            },
        ]);
        
        // console.log( 'Initial content:', typeof this.props.html, this.props.html );
        const content = JSON.parse( this.props.html );

        const contentState = typeof( content ) == 'object' ? ContentState.createFromBlockArray( convertFromRaw( content ) ) : ContentState.createFromText( content );

        this.state = {
            editorState: EditorState.createWithContent(
                contentState,
                compositeDecorator
            )
        };

        
        this.focus = () => {
            // console.log( 'focus' );
            this.refs.editor.focus();
        };

        this.onChange = ( editorState ) => {
            this.setState( { editorState } );
        };

        this.onBlur = ( event ) => {
            const content = JSON.stringify( convertToRaw( this.state.editorState.getCurrentContent() ) );
            // console.log( 'Content:', content );
            this.props.onEdit( content );

        };

        this.logState = () => console.log( this.state.editorState.toJS() );

        this.handleKeyCommand = ( command ) => this._handleKeyCommand( command );
        this.toggleBlockType = ( type ) => this._toggleBlockType( type );
        this.toggleInlineStyle = ( style ) => this._toggleInlineStyle( style );

    }

    _handleKeyCommand( command ) {
        const { editorState } = this.state;
        const newState = RichUtils.handleKeyCommand( editorState, command );
        if ( newState ) {
            this.onChange( newState );
            return true;
        }
        return false;
    }

    _toggleBlockType( blockType ) {
        this.onChange(
            RichUtils.toggleBlockType(
                this.state.editorState,
                blockType
            )
        );
    }

    _toggleInlineStyle( inlineStyle ) {
        this.onChange(
            RichUtils.toggleInlineStyle(
                this.state.editorState,
                inlineStyle
            )
        );
    }

    render() {
        return (
            <div onClick={ this.focus }>
                <Editor
                    ref='editor'
                    editorState={ this.state.editorState }
                    onChange={ this.onChange }
                    onBlur={ this.onBlur.bind( this ) }
                    handleKeyCommand={ this.handleKeyCommand }
                    suppressContentEditableWarning={ true } // warning, react code modified to silence this bloody warning
                    spellCheck={ true }
                />
            </div>

        )
    }
}
