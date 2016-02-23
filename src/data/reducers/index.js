import { combineReducers } from 'redux'
import { routeReducer } from 'react-router-redux'
import user from './user'
import nodes from './nodes'
import syncState from './syncState'

export default combineReducers( Object.assign(
    {},
    { user, nodes, syncState },
    { routing: routeReducer }
) );
