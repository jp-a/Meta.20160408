/**
 * Created by jpa on 18/02/2016.
 */
import React, { Component } from 'react'

import { Link } from 'react-router'
import InputEditable from '../components/InputEditable'

export default class Node extends Component {
    handleDelete() {
        console.log( 'deleteNode(', this.props.node._id, ')' );
        this.props.actions.deleteNode( this.props.node._id );
    }

    handleEditTitle( title ) {
        console.log( 'handleEdit(', title, ')' );
        this.props.actions.editNode( this.props.node._id, { title: title } );
    }

    handleEditText( text ) {
        console.log( 'handleEdit(', text, ')' );
        this.props.actions.editNode( this.props.node._id, { text: text } );
    }

    render() {
        const { node, index } = this.props;

        return (
            <tr>
                <td>{ ( 1001 + index ).toString().substring( 1 ) }</td>
                <td>
                    <button onClick={ this.handleDelete.bind( this ) }> x</button>
                </td>
                <td><Link to={ node._id }>{ node._id }</Link></td>
                <td>{ node._rev }</td>
                <td><InputEditable key={ node._id + '_title' } value={ node.title }
                                   onEdit={ this.handleEditTitle.bind( this ) }/></td>
                <td><InputEditable key={ node._id + '_text' } value={ node.text }
                                   onEdit={ this.handleEditText.bind( this ) }/></td>
                {/*<td><Editor key={ node._rev } html={ node.text }/></td>*/}
            </tr>
        )
    }
}