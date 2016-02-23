import * as types from '../constants/ActionTypes'
import * as constants from '../constants/User'

export function addNode( node ) {
    return { type: types.ADD_NODE, node }
}

export function deleteNode( id ) {
    return { type: types.DELETE_NODE, id }
}

export function editNode( id, node ) {
    return { type: types.EDIT_NODE, id, node }
}

export function completeNode( id ) {
    return { type: types.COMPLETE_NODE, id }
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
