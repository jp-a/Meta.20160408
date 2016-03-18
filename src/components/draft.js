import React, { Component } from 'react'
import { Editor, EditorState, ContentState, createFromBlockArray, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
// import backdraft from 'backdraft-js'


export default class Draft extends Component {
    constructor( props, context ) {
        super( props, context );

        console.log( 'Initial content:', typeof this.props.html, this.props.html );
        const content = JSON.parse( this.props.html );

        const contentState = typeof( content ) == 'object' ? ContentState.createFromBlockArray( convertFromRaw( content ) ) : ContentState.createFromText( content );
        // console.log( contentState );

        this.state = {
            editorState: EditorState.createWithContent(
                contentState
            )
        };

        this.focus = () => {
            console.log( 'focus' );
            this.refs.editor.focus();
        };

        this.onChange = ( editorState ) => {
            this.setState( { editorState } );
        };

        this.onBlur = ( event ) => {
            const content = JSON.stringify( convertToRaw( this.state.editorState.getCurrentContent() ) );
            console.log( 'Content:', content );
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

        //     <div>
        //     <Editor
        // editorState={ this.state.editorState }
        // handleKeyCommand={ this.handleKeyCommand }
        // onChange={ this.onChange }
        // placeholder='Tell a story...'
        // ref='editor'
        // spellCheck={ true }
        //     />
        //     </div>

    }
}
