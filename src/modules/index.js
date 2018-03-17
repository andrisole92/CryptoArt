import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import counter from './counter'
import art from './art'
import app from './app'
import auction from "./auction";
import contract from "./contract";
import account from "./account";

export default combineReducers({
    counter,
    app,
    art,
    auction,
    contract,
    account,
    routing: routerReducer

})