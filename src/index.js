import React from 'react';
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import store from './store'
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import Router from "./Router";

const target = document.querySelector('#root');




render(
    <Provider store={store}>
        <Router/>
    </Provider>,
    target
);