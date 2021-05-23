import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './screens/login/Login'
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Main component for image-viewer app
class MainApp extends Component {
    constructor() {
        super();
        this.baseUrl = "https://api.instagram.com/v1/users/self/media/recent?access_token=";
    }
    render() {
        return (
            <Router>
                <div className="main-container">
                    <Route exact path='/' render={(props) => <Login {...props} baseUrl={this.baseUrl} />} />
                </div>
            </Router>
        )
    }
}

ReactDOM.render(
    <MainApp/>,
    document.getElementById('root')
);
