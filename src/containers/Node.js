/**
 * Created by jpa on 18/02/2016.
 */
import React, { Component } from 'react'

import { Link } from 'react-router'
import TextInput from '../components/TextInput'
import InputEditable from '../components/InputEditable'
import Draft from '../components/Draft'
// import Medium from '../components/Medium'
// import TokenAutocomplete from '../../node_modules/react-token-autocomplete'

import _ from 'lodash'

import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';

import MdCancel from 'react-icons/lib/md/cancel'

// import style from './style.styl'

const style = {
};

export default class Node extends Component {
    constructor( props ) {
        super( props );

        this.state = {
            zDepth: 1
        }
    }

    handleDelete() {
        console.log( 'deleteNode(', this.props.node._id, ')' );
        this.props.actions.deleteNode( this.props.node._id );
    }

    render() {
        const { node, index } = this.props;

        return (
            <div style={ this.props.style }>
                <span>&nbsp;</span>
                {/*<Card zDepth={ this.state.zDepth } onMouseEnter={ () => this.setState( { zDepth: 1 } ) } onMouseLeave={ () => this.setState( { zDepth: 1 } ) }>*/}
                <Card>
                    <CardHeader
                        // title=
                        subtitle={ <Link style={{ color: 'grey', textDecoration: 'none' } } to={ node._id }>{ node._id }</Link> }
                        // avatar={ "http://api.randomuser.me/portraits/med/men/" + index + ".jpg" }
                    >

                    </CardHeader>
                    <CardMedia
                        overlay={ <CardTitle
                            title={ <InputEditable
                                key={ node._rev + '_caption' }
                                html={ node.caption }
                                onEdit={ ( caption ) => this.props.actions.editNode( this.props.node._id, { caption: caption } ) }/> }
                            subtitle={ <InputEditable
                                key={ node._rev + '_url' }
                                html={ node.url }
                                onEdit={ ( url ) => this.props.actions.editNode( this.props.node._id, { url: url } ) }/> }
                            /> }
                    >
                        <img src={ node.url } style={ { minHeight: '95px' } }/>
                    </CardMedia>
                    <CardTitle
                        title={ <Draft
                            key={ node._rev + '_title' }
                            html={ node.title }
                            onEdit={ ( title ) => this.props.actions.editNode( this.props.node._id, { title: title } ) }
                            /> }
                        subtitle={ 'tags' }
                    />
                    <CardText>
                        <Draft
                            key={ node._rev + '_content' }
                            html={ node.content }
                            onEdit={ ( content ) => this.props.actions.editNode( this.props.node._id, { content: content } ) }/>
                    </CardText>
                    <CardActions>
                        <FlatButton secondary={ true } label="Delete" onClick={ this.handleDelete.bind( this ) }/>
                    </CardActions>
                </Card>
            </div>
       )
    }
}

// <div className={ style.node }>
//
//     <div className={ style.col }>{ ( 1001 + index ).toString().substring( 1 ) }</div>
//
//     <div className={ style.col }>
//         <MdCancel onClick={ this.handleDelete.bind( this ) }/>
//     </div>
//
//     <div className={ [ style.col, style._id ].join( ' ' ) }><Link to={ node._id } tooltip="test">{ node._id }</Link></div>
//
//     <div className={ [ style.col, style._rev ].join( ' ' ) }><span className={ style.value_short_rev }>{ node._rev && ( ' (' + node._rev.substr( 0, 1 ) ) + ')' }</span><span className={ style.value_rev }>{ node._rev }</span></div>
//
//     {/*<div className={ style.col }><InputEditable key={ node._id + '_title' } html={ node.title }
//      onEdit={ this.handleEditTitle.bind( this ) }/></div>*/}
//
//     <div className={ style.col }><Draft key={ node._rev + '_title' } html={ node.title }
//                                         onEdit={ this.handleTitleEdit.bind( this ) }/></div>
//
//     {/*<td><Editor key={ node._rev } html={ node.text }/></td>*/}
//
//     {/*<div className='col'><Draft key={ node._rev + '_text' } html={ node.text }
//      onEdit={ this.handleEditText.bind( this ) }/></div>*/}
//
//     {/*<div className={ [ style.col, style._text ].join( ' ' ) }><Medium key={ node._rev + '_text' } html={ node.text }
//      onEdit={ this.handleEditText.bind( this ) }/></div>*/}
//     <div className={ style.col }><Draft key={ node._rev + '_content' } html={ node.content }
//                                         onEdit={ this.handleContentEdit.bind( this ) }/></div>
//
// </div>
