import React, { Component } from 'react'
import { Editor, EditorState, ContentState, RichUtils, convertToRaw } from 'draft-js';


export default class Draft extends Component {
    constructor( props, context ) {
        super( props, context );
        console.log( 'Initial content:', this.props.html );
        this.state = {
            editorState: EditorState.createWithContent(

                // ContentState.createFromText( '...' )
                ContentState.createFromText( this.props.html )
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
            const content = convertToRaw( this.state.editorState.getCurrentContent() );
            const rawContent  = content.blocks.map( function( line ){ return line.text } ).join( "\n" );
            console.log( 'Content:', rawContent );
            this.props.onEdit( rawContent );

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
