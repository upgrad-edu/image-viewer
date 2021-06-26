import React from 'react';
import ReactDOM from 'react-dom';
import Header from './common/Header';
import Login from './screens/login/Login';
import './index.css';

ReactDOM.render(
    <div className="login-card-container">
        <div className="login-card-header">
            <Header />
        </div>        
        <div className="login-card">
            <Login />
        </div>

    </div>
    ,
    document.getElementById('root')
);


