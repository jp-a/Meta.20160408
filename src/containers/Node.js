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

    handleEdit( text ) {
        console.log( 'handleEdit(', text, ')' );
        this.props.actions.editNode( this.props.node._id, text );
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
                <td><InputEditable key={ node._rev } value={ node.text } html={ node.text }
                                   onEdit={ this.handleEdit.bind( this ) }/></td>
                {/*<td><Editor key={ node._rev } html={ node.text }/></td>*/}
            </tr>
        )
    }
}