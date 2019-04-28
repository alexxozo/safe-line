import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import SignIn from './SignIn.js';
import Admin from './Admin.js';
import Chat from './Chat.js';
import ChatAdmin from './ChatAdmin.js';

import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";

import * as serviceWorker from './serviceWorker';

const hist = createBrowserHistory();

ReactDOM.render(
    <Router history={hist}>
        <Switch>
            <Route path="/signin" component={SignIn} />
            <Route path="/admin" component={Admin} />
            <Route path="/chat" component={Chat} />
            <Route path="/chatAdmin" component={ChatAdmin} />
            <Redirect from="/" to="/signin" />
        </Switch>
    </Router>,
    document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
