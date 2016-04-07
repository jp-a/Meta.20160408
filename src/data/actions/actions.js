import * as types from '../constants/ActionTypes'
import * as constants from '../constants/User'

export function addNode( node ) {
    return { type: types.ADD_NODE, node }
}

export function deleteNode( _id ) {
    return { type: types.DELETE_NODE, _id }
}

export function editNode( _id, node ) {
    return { type: types.EDIT_NODE, _id, node }
}

export function completeNode( _id ) {
    return { type: types.COMPLETE_NODE, _id }
}

export function completeAll() {
    return { type: types.COMPLETE_ALL }
}

export function clearCompleted() {
    return { type: types.CLEAR_COMPLETED }
}

export function login( data ) {
    return {
        type: constants.USER_LOGGED_IN,
        payload: data
    }
}

export function logout() {
    return {
        type: constants.USER_LOGGED_OUT
    }
}
