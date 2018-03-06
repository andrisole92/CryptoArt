import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import counter from './counter'
import art from './art'
import auction from "./auction";
import contract from "./contract";

export default combineReducers({
    routing: routerReducer,
    counter,
    art,
    auction,
    contract
})