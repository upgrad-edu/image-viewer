import ReactDOM from 'react-dom';
import Login from './screens/login/Login';
import './index.css';
import {Route, BrowserRouter as Router} from "react-router-dom";
import React from "react";
import Home from "./screens/home/Home";
import Profile from "./screens/profile/Profile";

ReactDOM.render(
    <Router>
        <Route component={Home} exact path='/home'/>
        <Route component={Login} exact path='/'/>
        <Route component={Profile} exact path='/profile'/>
    </Router>,
    document.getElementById('root')
);
