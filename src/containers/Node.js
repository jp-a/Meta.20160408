/**
 * Created by jpa on 18/02/2016.
 */
import React, { Component } from 'react'

import { Link } from 'react-router'
import InputEditable from '../components/InputEditable'
import Draft from '../components/Draft'
import Medium from '../components/Medium'

import MdCancel from 'react-icons/lib/md/cancel'

require( './style.styl' );

export default class Node extends Component {
    handleDelete() {
        console.log( 'deleteNode(', this.props.node._id, ')' );
        this.props.actions.deleteNode( this.props.node._id );
    }

    handleEditTitle( title ) {
        console.log( 'handleTitleEdit(', title, ')' );
        this.props.actions.editNode( this.props.node._id, { title: title } );
    }

    handleEditText( text ) {
        console.log( 'handleTextEdit(', text, ')' );
        this.props.actions.editNode( this.props.node._id, { text: text } );
    }

    render() {
        const { node, index } = this.props;

        return (
            <div className='node'>

                <div className='col'>{ ( 1001 + index ).toString().substring( 1 ) }</div>

                <div className='col'>
                    <MdCancel onClick={ this.handleDelete.bind( this ) }/>
                </div>

                <div className='col _id'><Link to={ node._id } tooltip="test">{ node._id }</Link></div>

                <div className='col _rev'><span className='value_short_rev'>{ node._rev && ( ' (' + node._rev.substr( 0, 1 ) ) + ')' }</span><span className='value_rev'>{ node._rev }</span></div>

                {/*<div className='col'><InputEditable key={ node._id + '_title' } html={ node.title }
                                    onEdit={ this.handleEditTitle.bind( this ) }/></div>*/}

                <div className='col'><Draft key={ node._rev + '_title' } html={ node.title }
                                   onEdit={ this.handleEditTitle.bind( this ) }/></div>

                {/*<td><Editor key={ node._rev } html={ node.text }/></td>*/}

                {/*<div className='col'><Draft key={ node._rev + '_text' } html={ node.text }
                                   onEdit={ this.handleEditText.bind( this ) }/></div>*/}

                <div className='col _text'><Medium key={ node._rev + '_text' } html={ node.text }
                                   onEdit={ this.handleEditText.bind( this ) }/></div>



            </div>
        )
    }
}