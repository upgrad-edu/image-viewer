import React from 'react';
import ReactDOM from 'react-dom';
import Header from './common/Header';
import Login from './screens/login/Login';
import './index.css';

ReactDOM.render(
    <div>
        <Header />
        <Login />
    </div>
    ,
    document.getElementById('root')
);


