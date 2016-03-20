/**
 * Created by jpa on 18/03/2016.
 */

import React from 'react'

const styles = {
    hashtag: {
        color: 'rgba( 95, 184, 138, 1.0 )'
    },
};

export default class HashtagSpan extends React.Component {
    constructor( props ) {
        super( props );
    }

    _onClick( e ) {
        console.log( e.metaKey, e );
        if ( e.metaKey ) alert( 'popup!' )
        else window.location.href = 'http://www.google.com';
    }

    render() {
        return (
            <span { ...this.props } style={ styles.hashtag } onClick={ this._onClick.bind( this ) }>
                { this.props.children }
            </span>
        )
    }
}

