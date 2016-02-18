/**
 * Created by jpa on 18/02/2016.
 */
import React, { Component } from 'react'

export default class ContentEditable extends Component {
    constructor() {
        super();
    }

    render() {
        return React.createElement(
            this.props.tagName || 'span',
            Object.assign( {}, this.props, {
                ref: ( e ) => this.htmlEl = e,
                onInput: this.emitChange.bind( this ),
                onBlur: this.emitBlur.bind( this ),
                contentEditable: !this.props.disabled,
                dangerouslySetInnerHTML: { __html: this.props.html }
            } ),
            this.props.children );
    }

    shouldComponentUpdate( nextProps ) {
        return !this.htmlEl || nextProps.html !== this.htmlEl.innerHTML ||
            this.props.disabled !== nextProps.disabled;
    }

    componentDidUpdate() {
        if ( this.htmlEl && this.props.html !== this.htmlEl.innerHTML ) {
            this.htmlEl.innerHTML = this.props.html;
        }
    }

    emitChange( evt ) {
        if ( !this.htmlEl ) return;
        var html = this.htmlEl.innerHTML;
        if ( this.props.onChange && html !== this.lastHtml ) {
            evt.target = { value: html };
            this.props.onChange( evt );
        }
        this.lastHtml = html;
    }

    emitBlur( evt ) {
        if ( !this.htmlEl ) return;
        var html = this.htmlEl.innerHTML;
        if ( this.props.onBlur ) {
            evt.target = { value: html };
            this.props.onBlur( evt );
        }
        this.lastHtml = html;
    }
}

