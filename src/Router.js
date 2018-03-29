import React from 'react';
import {ConnectedRouter} from 'react-router-redux'
import {history} from './store'
import App from './App';



export default class Router extends React.PureComponent{
    render(){
        return(
            <ConnectedRouter history={history}>
                <App/>
            </ConnectedRouter>
        );
    }

}

