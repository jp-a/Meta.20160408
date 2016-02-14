import { combineReducers } from 'redux'
import { routeReducer } from 'react-router-redux'
import nodes from './nodes'
import syncState from './syncState'

export default combineReducers( Object.assign(
    {},
    { nodes, syncState },
    { routing: routeReducer }
) );
