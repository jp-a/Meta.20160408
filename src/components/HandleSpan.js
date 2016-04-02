/**
 * Created by jpa on 18/03/2016.
 */

import React from 'react'
import { browserHistory } from 'react-router'

const styles = {
    handle: {
        color: 'rgba( 98, 177, 254, 1.0 )',
        direction: 'ltr',
        unicodeBidi: 'bidi-override',
        cursor: 'pointer'
    }
};

export default class HandleSpan extends React.Component {
    constructor( props, context ) {
        super( props, context );

        this.context = context;
    }

    _onClick( e ) {
        const text = this.props.children[ 0 ].props.text.substring( 1 );
        console.log( e.metaKey, e, text );
        if ( e.metaKey ) alert( 'popup!' )
        else browserHistory.push( text );
        // else window.location.href = 'http://www.google.com';
    }

    render() {
        return (
            <span { ...this.props } style={ styles.handle } onClick={ this._onClick.bind( this ) }>
                { this.props.children }

            </span>
        )
    }
}

